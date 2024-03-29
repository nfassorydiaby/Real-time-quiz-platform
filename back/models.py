from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from database import Base

import uuid
from sqlalchemy.dialects.postgresql import UUID


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(Text)

class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(100), index=True)
    description = Column(String(255))
    creator_id = Column(Integer)

class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question_text = Column(String(255), index=True)
    quiz_id = Column(Integer)

class Option(Base):
    __tablename__ = "option"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    option_text = Column(String(255), index=True)
    question_id = Column(Integer)
    is_correct = Column(Boolean, default=False)

class Salle(Base):
    __tablename__ = "salle"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), index=True)
    is_open = Column(Integer)
    is_quiz_active = Column(Boolean, default=False)
    quiz_id = Column(Integer)





