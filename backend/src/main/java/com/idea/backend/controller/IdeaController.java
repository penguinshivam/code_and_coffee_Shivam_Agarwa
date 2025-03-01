package com.idea.backend.controller;


import com.idea.backend.model.Idea;
import com.idea.backend.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/ideas")
public class IdeaController {

    private final IdeaService ideaService;

    @Autowired
    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @PostMapping
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        Idea createdIdea = ideaService.createIdea(idea);
        return ResponseEntity.ok(createdIdea);
    }

    @GetMapping
    public ResponseEntity<List<Idea>> getAllIdeas() {
        List<Idea> ideas = ideaService.getAllIdeas();
        return ResponseEntity.ok(ideas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable String id) {
        return ideaService.getIdeaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable String id, @RequestBody Idea idea) {
        Idea updatedIdea = ideaService.updateIdea(id, idea);
        if (updatedIdea != null) {
            return ResponseEntity.ok(updatedIdea);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdea(@PathVariable String id) {
        ideaService.deleteIdea(id);
        return ResponseEntity.noContent().build();
    }
}

