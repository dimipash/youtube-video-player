import sqlmodel
import timescaledb
from timescaledb import create_engine
from sqlmodel import SQLModel, Session
from decouple import config


DATABASE_URL = config("DATABASE_URL")

engine = create_engine(DATABASE_URL, timezone="UTC+3")


def init_db():
    # create database times
    print("creating db")
    SQLModel.metadata.create_all(engine)
    timescaledb.metadata.create_all(engine)


def get_session():
    # use within routes or api endpoints
    with Session(engine) as session:
        yield session
