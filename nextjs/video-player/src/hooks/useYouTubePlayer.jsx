"use client";
import { useCallback, useEffect, useRef, useState } from "react";

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

const useYouTubePlayer = (
    videoId,
    elementId,
    startTime = 200,
    interval = 5000
) => {
    const playerElementId = elementId || "video-player";
    const playerRef = useRef(null);
    const [playerState, setPlayerState] = useState({
        isReady: false,
        currentTime: 0,
        videoData: {
            title: "",
        },
        videoStateLabel: "",
        videoStateValue: -10,
    });
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
                    start: startTime,
                },
                events: {
                    onReady: handleOnReady,
                    onStateChange: handleOnStateChange,
                },
            };
            playerRef.current = new window.YT.Player(
                playerElementId,
                videoOptions
            );
        };
    }, [videoId]);

    useEffect(() => {
        const intervalId = setInterval(() => {            
            handleOnStateChange();
        }, interval);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleOnReady = useCallback((event) => {
        setPlayerState((prevState) => ({ ...prevState, isReady: true }));
        handleOnStateChange();
    }, []);

    const handleOnStateChange = useCallback(() => {
        const YTPlayerStateObj = window.YT.PlayerState;
        const playerInfo = playerRef.current.playerInfo;
        const videoData = playerRef.current.getVideoData();
        const currentTime = playerRef.current.getCurrentTime();
        const videoStateValue = playerInfo.playerState;
        const videoStateLabel = getKeyByValue(
            YTPlayerStateObj,
            videoStateValue
        );

        setPlayerState((prevState) => ({
            ...prevState,
            videoData: { title: videoData.title },
            currentTime: currentTime,
            videoStateLabel: videoStateLabel,
            videoStateValue: videoStateValue,
        }));
    }, []);

    return playerState;
};

export default useYouTubePlayer;
