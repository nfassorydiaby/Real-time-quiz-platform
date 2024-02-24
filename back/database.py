from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

URL_DATABASE = "mysql+pymysql://user:password@db:3306/database"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=create_engine(URL_DATABASE))

Base = declarative_base()
