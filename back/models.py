from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from database import Base
from sqlalchemy.orm import relationship



class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(50))
    role = Column(String(20))

class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(100), index=True)
    description = Column(String(255))
    creator_id = Column(Integer, ForeignKey('user.id'))
    # La ligne suivante a été retirée car elle référençait quiz_id dans la même table, ce qui semble être une erreur.
    # Si vous aviez l'intention de créer une relation récursive ou hiérarchique, veuillez préciser davantage.
    creator = relationship("User", back_populates="quizzes")

class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question_text = Column(String(255), index=True)
    quiz_id = Column(Integer, ForeignKey('quiz.id'))
    quiz = relationship("Quiz", back_populates="questions")

class Option(Base):
    __tablename__ = "option"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    option_text = Column(String(255), index=True)
    question_id = Column(Integer, ForeignKey('question.id'))
    is_correct = Column(Boolean, default=False)
    question = relationship("Question", back_populates="options")

# Pour compléter les relations, ajoutez les déclarations manquantes dans chaque classe
User.quizzes = relationship("Quiz", back_populates="creator", cascade="all, delete-orphan")
Quiz.questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")
Question.options = relationship("Option", back_populates="question", cascade="all, delete-orphan")