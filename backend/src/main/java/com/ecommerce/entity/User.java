package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents an application user.
 *
 * Interview notes:
 * - @Column(unique=true) adds a unique constraint at the DB level
 * - Role is stored as a string enum for readability in the DB
 * - Bidirectional OneToOne with Cart is managed here (mappedBy on Cart side)
 */
@Entity
@Table(name = "users")   // "user" is a reserved word in PostgreSQL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;   // stored as BCrypt hash — never plain text

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Convenience method used by Spring Security
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
