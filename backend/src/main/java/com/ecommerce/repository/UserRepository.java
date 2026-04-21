package com.ecommerce.repository;

import com.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Spring Data JPA generates the SQL implementation at runtime.
 *
 * Interview notes:
 * - JpaRepository<Entity, PK> gives you CRUD + pagination out of the box.
 * - Method names like findByEmail follow the "query derivation" convention —
 *   Spring generates "SELECT * FROM users WHERE email = ?" automatically.
 * - existsByEmail avoids loading the full entity just to check existence.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
