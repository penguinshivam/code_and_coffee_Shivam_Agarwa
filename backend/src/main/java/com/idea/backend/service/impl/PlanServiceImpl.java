package com.idea.backend.service.impl;

import com.idea.backend.service.PlanService;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class PlanServiceImpl implements PlanService {

    // External API endpoint and token (consider moving these to configuration)
    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String AUTH_TOKEN = "Bearer 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";

    @Override
    public String generatePlan(String domain, String briefIdeaDescription, String keyFocusAreas, String targetAudienceUsers) {
        // Build the prompt using provided parameters
        String prompt = "I want to generate a comprehensive and feasible implementation plan for an idea. Here's what I need: " +
                "Domain: " + domain + ", " +
                "Brief Idea Description: " + briefIdeaDescription + ", " +
                "Key Focus Areas: " + keyFocusAreas + ", " +
                "Target Audience/Users: " + targetAudienceUsers;

        // Prepare the request payload
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.3-70b-specdec");

        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(message);
        requestBody.put("messages", messages);

        // Set HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", AUTH_TOKEN);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List choices = (List) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map choice = (Map) choices.get(0);
                Map messageObj = (Map) choice.get("message");

                // Wrap the content in a basic HTML template (or return as-is)
                return (String) messageObj.get("content");
            }
        }
        return null;
    }
}
