package com.ecommerce.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String tokenType;   // always "Bearer"
    private String email;
    private String fullName;
    private String role;
}
