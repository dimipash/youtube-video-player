from pydantic import BaseModel
from fastapi import APIRouter, Request

router = APIRouter()


class YouTubeVideoData(BaseModel):
    title: str


class YouTubePlayerState(BaseModel):
    isReady: bool
    video_id: str
    videoData: YouTubeVideoData
    currentTime: float | int
    videoStateLabel: str
    videoStateValue: float | int


@router.post("/")  # /api/video-events/
def create_video_event(request: Request, payload: YouTubePlayerState):
    headers = request.headers
    referer = headers.get("referer")    
    data = payload.model_dump()
    print(data, referer)
    return data
