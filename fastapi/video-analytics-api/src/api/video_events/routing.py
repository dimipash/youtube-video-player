from typing import List
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Request, Depends
from sqlalchemy import func
from sqlmodel import Session, select
from timescaledb.hyperfunctions import time_bucket
from timescaledb.utils import get_utc_now
from api.db.session import get_session
from api.watch_sessions.models import WatchSession
from .models import (
    YouTubePlayerState,
    YouTubeWatchEvent,
    YouTubeWatchEventResponseModel,
    VideoStat,
)


router = APIRouter()


@router.post("/", response_model=YouTubeWatchEventResponseModel)  # /api/video-events/
def create_video_event(
    request: Request,
    payload: YouTubePlayerState,
    db_session: Session = Depends(get_session),
):
    headers = request.headers
    watch_session_id = headers.get("x-session-id")
    print(watch_session_id)
    referer = headers.get("referer")
    data = payload.model_dump()
    # data["referer"] = referer
    obj = YouTubeWatchEvent(**data)
    obj.referer = referer
    if watch_session_id:
        watch_sesion_query = select(WatchSession).where(
            WatchSession.watch_session_id == watch_session_id
        )
        watch_session_obj = db_session.exec(watch_sesion_query).first()
        if watch_session_obj:
            obj.watch_session_id = watch_session_id
            watch_session_obj.last_active = get_utc_now()
            db_session.add(watch_session_obj)

    db_session.add(obj)
    db_session.commit()
    db_session.refresh(obj)
    print(obj)
    # print(data, referer)
    return obj


@router.get("/{video_id}", response_model=List[VideoStat])
def get_video_stats(video_id: str, db_session: Session = Depends(get_session)):
    bucket = time_bucket("30 minutes", YouTubeWatchEvent.time)
    start = datetime.now(timezone.utc) - timedelta(hours=25)
    end = datetime.now(timezone.utc) - timedelta(seconds=1)
    query = (
        select(
            bucket,
            YouTubeWatchEvent.video_id,
            func.count().label("total_events"),
            func.max(YouTubeWatchEvent.current_time).label("max_viewership"),
            func.avg(YouTubeWatchEvent.current_time).label("avg_viewership"),
            func.count(func.distinct(YouTubeWatchEvent.watch_session_id)).label("unique_views")
        )
        .where(
            YouTubeWatchEvent.time > start,
            YouTubeWatchEvent.time <= end,
            YouTubeWatchEvent.video_id == video_id,
        )
        .group_by(bucket)
        .order_by(bucket)
    )
    results = db_session.exec(query).fetchall()
    results = [
        VideoStat(
            time=x[0],
            video_id=x[1],
            total_events=x[2],
            max_viewership=x[3],
            avg_viewership=x[4],
            unique_views=x[5],
        )
        for x in results
    ]
    return results
