package com.idea.backend.service.impl;

import com.idea.backend.model.Idea;
import com.idea.backend.repository.IdeaRepository;
import com.idea.backend.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IdeaServiceImpl implements IdeaService {

    private final IdeaRepository ideaRepository;

    @Autowired
    public IdeaServiceImpl(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    @Override
    public Idea createIdea(Idea idea) {
        return ideaRepository.save(idea);
    }

    @Override
    public List<Idea> getAllIdeas() {
        List<Idea> ideas = ideaRepository.findAll();
        // Ensure tags is never null
        ideas.forEach(idea -> {
            if (idea.getTags() == null) {
                idea.setTags(new ArrayList<>());
            }
        });
        return ideas;
    }

    @Override
    public Optional<Idea> getIdeaById(String id) {
        return ideaRepository.findById(id);
    }

    @Override
    public Idea updateIdea(String id, Idea idea) {
        Optional<Idea> optionalIdea = ideaRepository.findById(id);
        if (optionalIdea.isPresent()) {
            Idea existingIdea = optionalIdea.get();
            existingIdea.setTitle(idea.getTitle());
            existingIdea.setDescription(idea.getDescription());
            return ideaRepository.save(existingIdea);
        }
        return null; // Alternatively, throw a custom exception if not found
    }

    @Override
    public void deleteIdea(String id) {
        ideaRepository.deleteById(id);
    }
}
