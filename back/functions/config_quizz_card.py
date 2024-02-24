from typing import List, Dict
from card_data import card_data  # Import card_data
from card_quizz import list_card_by_frequency
from category import Category

def getCurrentCards() -> List[Dict]:
        quizzCards = []
        for cardInfoFrequency in list_card_by_frequency:
            if cardInfoFrequency["day"] == 0:
                card_id = cardInfoFrequency["id"]
                for card in card_data:
                    if card["id"] == card_id:
                        quizzCards.append(card)
                        break  # Stop searching once the card is found
            else : 
                cardInfoFrequency["remainingDays"] = cardInfoFrequency["remainingDays"] - 1
        return quizzCards

def frequencyCategory(category) -> int:
    return {
        Category.FIRST: 0,
        Category.SECOND: 1,
        Category.THIRD: 2,
        Category.FOURTH: 3,
        Category.FIFTH: 4,
        Category.SIXTH: 5,
        Category.SEVENTH: 6,
        Category.DONE: 7,
        # Add more cases as needed
    }.get(category, -1)

def setCurrentCards(cardId, category):
        remainingDays = frequencyCategory(category)
        for i, cardInfoFrequency in list_card_by_frequency:
            if cardInfoFrequency["id"] == cardId:
                if remainingDays == 7:
                    cardInfoFrequency["remainingDays"] = remainingDays
                else:
                    list_card_by_frequency.pop(i)
                break  # Stop searching once the card is found