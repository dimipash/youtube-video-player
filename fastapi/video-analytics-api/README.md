# Video Analytics API

This is a FastAPI application for collecting and analyzing video watch session and event data.

## Database

This project uses a Neon Postgres database.

## Setup

1. Clone the repository.
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create a `.env` file based on `.env.sample` and configure your database connection string.
4. Run the application:
   ```bash
   uvicorn src.main:app --reload
   ```

## Features

- Video statistics aggregations: The API provides endpoints to retrieve aggregated statistics for video watch sessions and events.
