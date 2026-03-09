package com.plotnet.service;

import com.plotnet.model.Plot;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.repository.PlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PlotService {

    @Autowired
    private PlotRepository plotRepository;

    public List<Plot> getAll(String location, Integer minArea, Integer maxArea,
                             Long minPrice, Long maxPrice) {
        boolean hasFilter = (location != null && !location.isBlank())
                || minArea != null || maxArea != null
                || minPrice != null || maxPrice != null;

        if (hasFilter) {
            return plotRepository.findAvailableWithFilters(
                (location != null && !location.isBlank()) ? location : null,
                minArea, maxArea, minPrice, maxPrice
            );
        }
        return plotRepository.findAll();
    }

    public Plot getById(Long id) {
        return plotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plot not found"));
    }

    public Plot create(Map<String, Object> body) {
        Plot plot = new Plot();
        applyFields(plot, body);
        return plotRepository.save(plot);
    }

    public Plot update(Long id, Map<String, Object> body) {
        Plot plot = getById(id);
        applyFields(plot, body);
        return plotRepository.save(plot);
    }

    public void delete(Long id) {
        plotRepository.deleteById(id);
    }

    private void applyFields(Plot plot, Map<String, Object> body) {
        if (body.containsKey("title"))
            plot.setTitle((String) body.get("title"));
        if (body.containsKey("location"))
            plot.setLocation((String) body.get("location"));
        if (body.containsKey("area"))
            plot.setArea(((Number) body.get("area")).intValue());
        if (body.containsKey("price"))
            plot.setPrice(((Number) body.get("price")).longValue());
        if (body.containsKey("description"))
            plot.setDescription((String) body.get("description"));
        if (body.containsKey("imageUrl"))
            plot.setImageUrl((String) body.get("imageUrl"));
        if (body.containsKey("status") && body.get("status") != null)
            plot.setStatus(PlotStatus.valueOf((String) body.get("status")));
    }
}
