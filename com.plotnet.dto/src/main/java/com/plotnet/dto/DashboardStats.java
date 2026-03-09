package com.plotnet.dto;

public class DashboardStats {

    private long totalPlots;
    private long availablePlots;
    private long totalBookings;
    private long totalRevenue;

    public DashboardStats() {}

    public DashboardStats(long totalPlots, long availablePlots, long totalBookings, long totalRevenue) {
        this.totalPlots     = totalPlots;
        this.availablePlots = availablePlots;
        this.totalBookings  = totalBookings;
        this.totalRevenue   = totalRevenue;
    }

    public long getTotalPlots() { return totalPlots; }
    public void setTotalPlots(long totalPlots) { this.totalPlots = totalPlots; }

    public long getAvailablePlots() { return availablePlots; }
    public void setAvailablePlots(long availablePlots) { this.availablePlots = availablePlots; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public long getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(long totalRevenue) { this.totalRevenue = totalRevenue; }
}
