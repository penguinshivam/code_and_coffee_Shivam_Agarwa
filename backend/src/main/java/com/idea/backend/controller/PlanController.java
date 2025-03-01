package com.idea.backend.controller;

import com.idea.backend.service.PlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/plan")

public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    /**
     * Example endpoint:
     * GET /api/plan?Domain=Marketing&BriefIdeaDescription=Social+media+campaign&KeyFocusAreas=Cost-efficiency+and+high+engagement&TargetAudienceUsers=Young+adults+aged+18-30
     */
    @GetMapping
    public ResponseEntity<String> generatePlan(@RequestParam("Domain") String domain,
                                               @RequestParam("BriefIdeaDescription") String briefIdeaDescription,
                                               @RequestParam("KeyFocusAreas") String keyFocusAreas,
                                               @RequestParam("TargetAudienceUsers") String targetAudienceUsers) {
        String result = planService.generatePlan(domain, briefIdeaDescription, keyFocusAreas, targetAudienceUsers);
        if (result != null) {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.TEXT_HTML);
            return new ResponseEntity<>(result, responseHeaders, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to generate plan from external API");
        }
    }
}
