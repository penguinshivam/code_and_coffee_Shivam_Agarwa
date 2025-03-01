package com.idea.backend.service;

public interface PlanService {
    /**
     * Generates an implementation plan based on the given parameters.
     *
     * @param domain the domain of the idea
     * @param briefIdeaDescription a brief description of the idea
     * @param keyFocusAreas key focus areas for the plan
     * @param targetAudienceUsers target audience/users for the plan
     * @return the generated plan content as HTML
     */
    String generatePlan(String domain, String briefIdeaDescription, String keyFocusAreas, String targetAudienceUsers);
}
