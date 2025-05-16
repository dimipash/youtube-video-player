from fastapi import APIRouter, Request, Depends
from sqlmodel import Session
from pi.db.session import get_session
from .models import YouTubePlayerState


router = APIRouter()


@router.post("/")  # /api/video-events/
def create_video_event(
        request: Request,
        payload: YouTubePlayerState,
        db_session: Session = Depends(get_session)
        ):
    headers = request.headers
    referer = headers.get("referer")
    data = payload.model_dump()
    print(data, referer)
    return data
