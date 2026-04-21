package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart extends BaseEntity {

    /**
     * OneToOne — each user has exactly one cart.
     * The FK "user_id" lives in the carts table (this is the owning side).
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /**
     * OneToMany with CascadeType.ALL + orphanRemoval:
     * - ALL: all lifecycle operations (persist/merge/remove) cascade to items
     * - orphanRemoval: if a CartItem is removed from this list, it's deleted from DB
     *
     * Interview note: orphanRemoval is subtly different from cascade=REMOVE.
     * orphanRemoval triggers when the item is removed from the collection.
     */
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();
}
