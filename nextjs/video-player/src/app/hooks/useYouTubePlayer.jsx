"use client";
import { useEffect } from "react";

const useYouTubePlayer = (videoId, elementId) => {
    const playerElementId = elementId || "video-player"
    useEffect(() => {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            console.log("YouTube is ready to roll!");
            const videoOptions = {
                height: "360",
                width: "640",
                videoId: videoId,
                playerVars: {
                    playsinline: 1,
                },
                events: {
                    onReady: (event) => {
                        console.log("On Ready", event);
                    },
                    onStateChange: (event) => {
                        console.log("On State Change", event);
                    },
                },
            };
            new window.YT.Player(playerElementId, videoOptions);
        };
    }, []);

    return "";
};

export default useYouTubePlayer;
