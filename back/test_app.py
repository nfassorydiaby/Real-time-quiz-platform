from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_cards():
    response = client.get("/cards/")
    assert response.status_code == 200, "Le code de statut de la réponse n'est pas 200."
    assert isinstance(
        response.json(), list), "La réponse JSON n'est pas un tableau (liste)."
    print("Test OK: Lecture des cartes réussie.")


def test_create_card():
    card_data = {
        "question": "string",
        "answer": "string",
        "tag": "string"
    }
    response = client.post("/cards/", json=card_data)
    assert response.status_code == 201, "Le code de statut de la réponse n'est pas 201."
    assert response.json()[
        "category"] == "FIRST", "La catégorie de la carte ne correspond pas."
    assert response.json()[
        "question"] == "string", "La question de la carte ne correspond pas."
    assert response.json()[
        "answer"] == "string", "La réponse de la carte ne correspond pas."
    assert response.json()[
        "tag"] == "string", "Le tag de la carte ne correspond pas."
    print("Test OK: Création de carte réussie.")


def test_get_quiz_cards():
    response = client.get("/cards/quizz/")
    assert response.status_code == 201, "Le code de statut de la réponse n'est pas 201."
    assert isinstance(
        response.json(), list), "La réponse JSON n'est pas un tableau (liste)."
    print("Test OK: Obtention des cartes de quiz réussie.")


def test_check_reponse():
    # Création d'une nouvelle carte
    card_data = {
        "question": "string",
        "answer": "string",
        "tag": "string"
    }
    response = client.post("/cards/", json=card_data)
    assert response.status_code == 201, "Le code de statut de la réponse n'est pas 201."

    print("id card created", response.json())

    card_id = response.json()["id"]
    response = client.patch(
        f"/cards/{card_id}/answer/", json={"isValid": True})

    # Vérification que la requête PATCH a abouti
    assert response.status_code == 204, "Le code de statut de la réponse n'est pas 204."
    print("Test OK: Vérification de la réponse réussie.")
