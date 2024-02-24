# Utilisez l'image de base Python
FROM python:3.10

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier requirements.txt dans le conteneur
COPY requirements.txt .

# Installez les dépendances Python
RUN pip install -r requirements.txt

# Copiez le contenu de l'application dans le conteneur
COPY ./back/ .

CMD ["sh", "-c", "ls -la && uvicorn main:app --host 0.0.0.0 --port 8000 --reload "]

#lunsh test 
#docker run -p 8000:8000 -v $(pwd)/back:/app  -it
