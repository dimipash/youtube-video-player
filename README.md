# YouTube Video Player with Analytics

This project is a full-stack application featuring a YouTube video player with integrated analytics tracking. It consists of a FastAPI backend for data collection and analysis and a Next.js frontend for video playback and analytics visualization.

## Components

1.  **Backend**: Located in `fastapi/video-analytics-api`. A FastAPI application handling API endpoints for collecting video watch session and event data, and providing aggregated statistics. Uses a Neon Postgres database.
2.  **Frontend**: Located in `nextjs/video-player`. A Next.js application providing the user interface. Allows users to play YouTube videos by URL and view analytics data.

## Features

*   Play YouTube videos by URL.
*   Track video watch sessions and events.
*   View aggregated video statistics (total events, max/avg viewership, unique views).
*   Responsive design (WIP).

## Setup and Running

To set up and run the project, follow the instructions in the individual README files for each component:

*   **Backend Setup**: Refer to `fastapi/video-analytics-api/README.md`
*   **Frontend Setup**: Refer to `nextjs/video-player/README.md`

Ensure both the backend and frontend are running for full functionality.
