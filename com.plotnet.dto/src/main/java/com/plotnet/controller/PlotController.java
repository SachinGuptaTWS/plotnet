package com.plotnet.controller;

import com.plotnet.model.Plot;
import com.plotnet.service.PlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PlotController {

    @Autowired
    private PlotService plotService;

    // ── Public ──────────────────────────────────────────────────────────────

    @GetMapping("/api/plots")
    public ResponseEntity<List<Plot>> getAll(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer minArea,
            @RequestParam(required = false) Integer maxArea,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice) {
        return ResponseEntity.ok(plotService.getAll(location, minArea, maxArea, minPrice, maxPrice));
    }

    @GetMapping("/api/plots/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(plotService.getById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ── Admin CRUD ───────────────────────────────────────────────────────────

    @PostMapping("/api/admin/plots")
    public ResponseEntity<Plot> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(plotService.create(body));
    }

    @PutMapping("/api/admin/plots/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Map<String, Object> body) {
        try {
            return ResponseEntity.ok(plotService.update(id, body));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/admin/plots/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        plotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
