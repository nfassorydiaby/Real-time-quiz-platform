# Real Time Quiz Platform

This repository contains the code for a Real Time Platform.

## Running the Backend Application

Back runs on http://localhost:8000/

To launch the backend application, use the following command:
```bash
docker compose build --no-cache
docker compose up -d
```

Run again these two commands for the backend application:
```bash
docker compose build
docker compose up -d --no-cache
```


## Running the test

To launch the backend test :
```bash
docker exec -it learning-cards-application-app pytest -s test_app.py
```

## Setup the frontend Instructions 

Back runs on http://localhost:3000/

**In /front folder :**

1. **Install Dependencies:**
```bash
npm install 

```

2. **Launch the Frontend::**
```bash
npm start 

```

## Running the Frontend test

To launch the fronted test :
```bash
npm test  
```
