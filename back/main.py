from multiprocessing import AuthenticationError
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi import status
from fastapi.params import Depends
from typing import List, Annotated
from uuid import UUID as UUID4
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
import auth
from pydantic import BaseModel


# import auth

# Implementation of database
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session


app = FastAPI(
    title="Real Time Quiz Plateform",
    description="This API aim to provide feature to manage a graphical interface for Real Time Quiz Plateform.")
app.include_router(auth.router)
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(auth.router)
# create the database
models.Base.metadata.create_all(bind=engine)

validBody = {
    "isValid": True
}
# getting the database


def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


dbDependency = Annotated[Session, Depends(getDb)]

class QuizResponse(BaseModel):
    id: int
    title: str
    description: str
    creator_id: int

class CreateQuizRequest(BaseModel):
    title: str
    description: str
    creator_id: int

class QuestionResponse(BaseModel):
    id: int
    question_text: str
    quiz_id: int

class CreateQuestionRequest(BaseModel):
    question_text: str

@app.get("/quizs/", status_code=status.HTTP_200_OK, tags=["Quizs"])
async def readQuiz(db: dbDependency):
    quizs = db.query(models.Quiz).all()
    return quizs


@app.post("/quizs/", response_model=QuizResponse, status_code=status.HTTP_201_CREATED, tags=["Quizs"])
async def createQuiz(quiz: CreateQuizRequest, db: dbDependency):
    dbQuiz = models.Quiz(**quiz.dict())
    db.add(dbQuiz)
    db.commit()
    db.refresh(dbQuiz)
    return dbQuiz


@app.get("/quizs/{quizId}/question/", status_code=status.HTTP_200_OK, tags=["Questions"])
async def readQuestions(db: dbDependency, quizId: int):
    questions = db.query(models.Question).filter(models.Question.quiz_id == quizId).all()
    return questions

@app.post('/quizs/{quizId}/question/', response_model=QuestionResponse, status_code=status.HTTP_201_CREATED, tags=["Questions"])
async def createQuestion(question: CreateQuestionRequest, db: dbDependency, quizId: int):
    question_data = question.dict()
    question_data['quiz_id'] = quizId 
    dbQuestion = models.Question(**question_data)
    db.add(dbQuestion)
    db.commit()
    db.refresh(dbQuestion)
    return dbQuestion
