package com.orbitallcorp.hack21.cards.services;

import com.orbitallcorp.hack21.cards.domains.Card;
import com.orbitallcorp.hack21.cards.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.HashMap;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;

    public Card save(Card card) {
        return cardRepository.save((card));
    }

    public List<Card> findAll() {
        List<Card> cards = new ArrayList<Card>();
        for (Card card : (List<Card>) cardRepository.findAll()) {
            cards.add(card);
        }

        return cards;
    }

    public Card findById(Long id){
        Card idCard = new Card();

        for (Card card : (List<Card>) cardRepository.findAll()) {
            if(card.getId() == id){
                idCard = card;
            }
        }

        return idCard;
    }

    public Card update(Long id, Card card){
        Card newCard = findById(id);
        newCard.setCardNumber(card.getCardNumber());
        final Card updatedCard = cardRepository.save(newCard);
        return newCard;
    }

    public Map<String, Boolean> deleteCard(Long id){
        Card card = findById(id);
        cardRepository.delete(card);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deletado", Boolean.TRUE);
        return response;
    }
}