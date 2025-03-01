package com.idea.backend.service;

import com.idea.backend.model.Idea;

import java.util.List;
import java.util.Optional;

public interface IdeaService {

    Idea createIdea(Idea idea);
    List<Idea> getAllIdeas();
    Optional<Idea> getIdeaById(String id);
    Idea updateIdea(String id, Idea idea);
    void deleteIdea(String id);
}
