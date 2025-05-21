# YouTube Video Player (Next.js)

This project is a YouTube video player built with Next.js. It allows users to input a YouTube video URL and watch the video directly within the application.

## Features

*   **Play YouTube Videos**: Enter a YouTube video URL to play the video.
*   **Responsive Design**: The player should adapt to different screen sizes (Work in Progress).
*   **Custom Player Controls**: (Planned)
*   **Playlist Support**: (Planned)

## Technologies Used

*   **Next.js (v15.3.1)**: React framework for server-side rendering and static site generation.
*   **React (v19.0.0)**: JavaScript library for building user interfaces.
*   **Tailwind CSS (v4)**: A utility-first CSS framework.

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd nextjs/video-player
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

1.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
.
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── watch/          # Watch page
│   │   │   └── page.js     # Logic for the watch page
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/         # Reusable React components
│   │   └── YouTubeURLForm.jsx # Component for YouTube URL input
│   ├── hooks/              # Custom React hooks
│   │   ├── useWatchSession.jsx # Manages state for the current watching session
│   │   └── useYouTubePlayer.jsx # Hook for YouTube player logic and control
│   └── lib/                # Utility functions
│       └── extractYouTubeInfo.js # Function to extract video ID from URL
├── .gitignore
├── next.config.mjs         # Next.js configuration
├── package.json
└── README.md
```

## Future Enhancements

*   Improved error handling for invalid YouTube URLs.
*   Customizable player appearance.
*   Saving video history.
*   User authentication and personalized playlists.
