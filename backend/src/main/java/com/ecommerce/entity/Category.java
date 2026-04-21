package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    /**
     * OneToMany — bidirectional.
     * mappedBy = "category" means Product owns the FK column.
     *
     * Interview note: cascade = PERSIST means saving a Category auto-saves
     * its Products. REMOVE would delete orphan products — be careful with that.
     * FetchType.LAZY = products are NOT loaded unless accessed (default for collections).
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Product> products = new ArrayList<>();
}
