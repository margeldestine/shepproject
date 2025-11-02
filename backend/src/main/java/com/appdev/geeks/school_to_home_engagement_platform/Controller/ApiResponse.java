package com.appdev.geeks.school_to_home_engagement_platform.Controller;

import java.util.Map;

public class ApiResponse {
    private String status; // "success" or "error"
    private String message;
    private Map<String, Object> data;

    public ApiResponse() {}

    public ApiResponse(String status, String message, Map<String, Object> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Map<String, Object> getData() { return data; }
    public void setData(Map<String, Object> data) { this.data = data; }
}