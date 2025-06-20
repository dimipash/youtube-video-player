"use client";
import useYouTubePlayer from "../../hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import useWatchSession from "../../hooks/useWatchSession";
import MetricsTable from "./metricsTable";


const FASTAPI_ENDPOINT = "http://localhost:8000/api/video-events/";

export default function WatchPage() {
    const searchParams = useSearchParams();
    const { v: video_id, t: startTime } = Object.fromEntries(searchParams);
    const session_id = useWatchSession(video_id);
    console.log("session id is", session_id);
    const playerElementId = "youtube-player";
    const playerState = useYouTubePlayer(
        video_id,
        playerElementId,
        startTime,
        1500
    );

    const url = `https://www.youtube.com/embed/${video_id}`;

    const updateBackend = useCallback(
        async (currentPlayerState) => {
            const headers = {
                "Content-Type": "application/json",
                "X-Session-ID": session_id,
            };
            console.log(video_id, currentPlayerState);

            try {
                const response = await fetch(FASTAPI_ENDPOINT, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        ...currentPlayerState,
                        video_id: video_id,
                    }),
                });
                if (!response.ok) {
                    console.log(await response.text());
                    console.log("Error adding data the backend");
                } else {
                    const responseData = await response.json();
                    console.log("db data is", responseData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        [video_id, session_id]
    );

    useEffect(() => {
        if (!playerState.isReady) return;
        if (playerState.videoStateLabel === "CUED") return;
        updateBackend(playerState);
    }, [playerState]);

    return (
        <>
            <div className="w-[50vw] mx-auto h-full px-5">
                <div id="video-container" className="relative w-full">
                    <div className="relative w-full pt-[56.25%] bg-black">
                        <div
                            id={playerElementId}
                            className="absolute top-0 left-0 w-full h-full"
                        ></div>
                    </div>
                </div>

                <h1 className="text-xl">Watch {playerState.video_title}</h1>

                <MetricsTable videoId={video_id} />
            </div>
        </>
    );
}
