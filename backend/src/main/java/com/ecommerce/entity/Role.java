package com.ecommerce.entity;

/**
 * User roles used by Spring Security for authorization.
 * Stored as a String in the DB via @Enumerated(EnumType.STRING).
 */
public enum Role {
    CUSTOMER,
    ADMIN
}
