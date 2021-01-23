package com.orbitallcorp.hack21.cards.controllers;

import com.orbitallcorp.hack21.cards.domains.Card;
import com.orbitallcorp.hack21.cards.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/cards")
public class CardController {
    @Autowired
    private CardService cardService;

    @PostMapping
    public ResponseEntity<Card> save(@RequestBody Card card) {
        Card savedCard = cardService.save((card));
        return new ResponseEntity(savedCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Card>> findAll() {
        List<Card> cards = cardService.findAll();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> findById(@PathVariable(value = "id") Long id){
        Card idCard = cardService.findById(id);
        return ResponseEntity.ok().body(idCard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Card> update(@PathVariable(value="id") Long id, @RequestBody Card card) {
        Card cardUpdate = cardService.update(id, card);
        return ResponseEntity.ok(cardUpdate);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteCard(@PathVariable(value = "id") Long id){
        Map<String, Boolean> delCard = cardService.deleteCard(id);
        return delCard;
    }
}