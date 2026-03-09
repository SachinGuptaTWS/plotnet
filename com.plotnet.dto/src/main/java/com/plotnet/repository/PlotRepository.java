package com.plotnet.repository;

import com.plotnet.model.Plot;
import com.plotnet.model.Plot.PlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlotRepository extends JpaRepository<Plot, Long> {

    long countByStatus(PlotStatus status);

    @Query("SELECT p FROM Plot p WHERE " +
           "(:location IS NULL OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:minArea IS NULL OR p.area >= :minArea) AND " +
           "(:maxArea IS NULL OR p.area <= :maxArea) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "p.status = 'AVAILABLE'")
    List<Plot> findAvailableWithFilters(
        @Param("location") String location,
        @Param("minArea")  Integer minArea,
        @Param("maxArea")  Integer maxArea,
        @Param("minPrice") Long minPrice,
        @Param("maxPrice") Long maxPrice
    );
}
