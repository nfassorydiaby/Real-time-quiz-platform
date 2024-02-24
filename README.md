# Learning Cards Application

This repository contains the code for a learning cards application.

## Setup the backend Instructions 

Back runs on http://localhost:8000/

**In /back folder :**

1. **Create a Virtual Environment:**
```bash
python3 -m venv env
```

2. **Activate Your Environment:**
```bash
source env/bin/activate
```

3. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

## Running the Backend Application

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
