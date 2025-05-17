import sqlmodel
import timescaledb
from sqlmodel import SQLModel, Session
from decouple import config


DATABASE_URL = config("DATABASE_URL")

engine = sqlmodel.create_engine(DATABASE_URL)


def init_db():
    # create database times
    print("creating db")
    SQLModel.metadata.create_all(engine)
    


def get_session():
    # use within routes or api endpoints
    with Session(engine) as session:
        yield session
