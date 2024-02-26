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
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

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


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Websocket Demo</title>
           <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    </head>
    <body>
    <div class="container mt-3">
        <h1>FastAPI WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" class="form-control" id="messageText" autocomplete="off"/>
            <button class="btn btn-outline-primary mt-2">Send</button>
        </form>
        <ul id='messages' class="mt-5">
        </ul>
        
    </div>
    
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

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


class OptionResponse(BaseModel):
    id: int
    option_text: str
    question_id: int
    is_correct: bool


class CreateOptionRequest(BaseModel):
    option_text: str
    is_correct: bool

class SalleResponse(BaseModel):
    id: int
    title: str
    is_open: bool
    is_quiz_active: bool
    quiz_id: int


class CreateSalleRequest(BaseModel):
    title: str
    is_open: bool
    is_quiz_active: bool
    quiz_id: int


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
    questions = db.query(models.Question).filter(
        models.Question.quiz_id == quizId).all()
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


@app.get("/question/{questionId}/options", status_code=status.HTTP_200_OK, tags=["Options"])
async def readOptions(db: dbDependency, questionId: int):
    options = db.query(models.Option).filter(
        models.Option.question_id == questionId).all()
    return options


@app.post('/question/{questionId}/options', response_model=OptionResponse, status_code=status.HTTP_201_CREATED, tags=["Options"])
async def createOptions(option: CreateOptionRequest, db: dbDependency, questionId: int):
    option_data = option.dict()
    option_data['question_id'] = questionId
    dbOption = models.Option(**option_data)
    db.add(dbOption)
    db.commit()
    db.refresh(dbOption)
    return dbOption


@app.get("/salle/", status_code=status.HTTP_200_OK, tags=["Salles"])
async def readSalle(db: dbDependency):
    salles = db.query(models.Salle).all()
    return salles


@app.post("/salle/", response_model=SalleResponse, status_code=status.HTTP_201_CREATED, tags=["Salles"])
async def createSalle(salle: CreateSalleRequest, db: dbDependency):
    dbSalle = models.Salle(**salle.dict())
    db.add(dbSalle)
    db.commit()
    db.refresh(dbSalle)
    return dbSalle

@app.get("/quizs/{quizId}/salle/", status_code=status.HTTP_200_OK, tags=["Salles"])
async def readSalleQuiz(db: dbDependency, quizId: int):
    salles = db.query(models.Salle).filter(
        models.Salle.quiz_id == quizId, models.Salle.is_open == True).all()
    return salles


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} has left the chat")
