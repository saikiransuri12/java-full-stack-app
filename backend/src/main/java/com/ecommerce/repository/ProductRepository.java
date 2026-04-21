package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Derived query — Spring generates the SQL
    List<Product> findByCategoryId(Long categoryId);

    // Pagination + sorting built in via Pageable
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    // Case-insensitive search using LIKE — useful for product search feature
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    /**
     * JPQL example — join fetch to avoid N+1 queries when loading category.
     * Interview note: JOIN FETCH loads the association in a single query
     * instead of Hibernate issuing a separate SELECT per product.
     */
    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.price BETWEEN :min AND :max")
    List<Product> findByPriceRange(@Param("min") BigDecimal min, @Param("max") BigDecimal max);
}
