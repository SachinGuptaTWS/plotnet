package com.plotnet.service;

import com.plotnet.model.Plot;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.repository.PlotRepository;
import com.plotnet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PlotService {

    @Autowired
    private PlotRepository plotRepository;

    @Autowired
    private UserRepository userRepository;

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
        validatePlotRisk(plot, null);
        return plotRepository.save(plot);
    }

    public Plot update(Long id, Map<String, Object> body) {
        Plot plot = getById(id);
        applyFields(plot, body);
        validatePlotRisk(plot, id);
        return plotRepository.save(plot);
    }

    public void delete(Long id) {
        plotRepository.deleteById(id);
    }

    /**
     * Blocks duplicate listings (same title + location + area) and RERA conflicts
     * (another plot or a registered user account already uses this RERA).
     */
    private void validatePlotRisk(Plot plot, Long excludePlotId) {
        String title = plot.getTitle() != null ? plot.getTitle().trim() : "";
        String location = plot.getLocation() != null ? plot.getLocation().trim() : "";
        Integer area = plot.getArea();

        if (!title.isEmpty() && !location.isEmpty() && area != null) {
            boolean dup;
            if (excludePlotId == null) {
                dup = plotRepository.existsByTitleIgnoreCaseAndLocationIgnoreCaseAndArea(title, location, area);
            } else {
                dup = plotRepository.existsByTitleIgnoreCaseAndLocationIgnoreCaseAndAreaAndIdNot(
                        title, location, area, excludePlotId);
            }
            if (dup) {
                throw new RuntimeException(
                        "A property with these details already exists. Change title, location, or area.");
            }
        }

        String rera = plot.getReraNumber();
        if (rera == null || rera.isBlank()) {
            return;
        }
        String reraNorm = rera.trim();

        boolean reraDupPlot = excludePlotId == null
                ? plotRepository.existsByReraNumberIgnoreCase(reraNorm)
                : plotRepository.existsByReraNumberIgnoreCaseAndIdNot(reraNorm, excludePlotId);
        if (reraDupPlot) {
            throw new RuntimeException("This RERA number is already registered to another property.");
        }

        if (userRepository.existsByReraNumberIgnoreCase(reraNorm)) {
            throw new RuntimeException(
                    "This RERA number is already assigned to a registered user account.");
        }
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
        if (body.containsKey("reraNumber")) {
            Object raw = body.get("reraNumber");
            if (raw == null) {
                plot.setReraNumber(null);
            } else {
                String s = String.valueOf(raw).trim();
                plot.setReraNumber(s.isEmpty() ? null : s);
            }
        }
        if (body.containsKey("status") && body.get("status") != null)
            plot.setStatus(PlotStatus.valueOf((String) body.get("status")));
    }
}
