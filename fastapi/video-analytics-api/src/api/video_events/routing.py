from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()


class YouTubeVideoData(BaseModel):
    title: str


class YouTubePlayerState(BaseModel):
    isReady: bool
    videoData: YouTubeVideoData
    currentTime: int
    videoStateLabel: str
    videoStateValue: int


@router.post("/")  # /api/video-events/
def create_video_event(payload: YouTubePlayerState):
    data = payload.model_dump()
    print(payload)
    return payload
