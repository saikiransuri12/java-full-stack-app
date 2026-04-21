import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Placeholder products — replace with real API call to GET /api/products
const PLACEHOLDER_PRODUCTS = [
  { id: 1, emoji: '👟', category: 'Footwear', name: 'Air Runner Pro', price: '$129.99' },
  { id: 2, emoji: '🎧', category: 'Electronics', name: 'Studio Headphones', price: '$89.99' },
  { id: 3, emoji: '👜', category: 'Accessories', name: 'Leather Tote Bag', price: '$64.99' },
  { id: 4, emoji: '⌚', category: 'Watches', name: 'Minimalist Watch', price: '$199.99' },
  { id: 5, emoji: '📱', category: 'Electronics', name: 'Phone Case', price: '$19.99' },
  { id: 6, emoji: '🕶️', category: 'Accessories', name: 'UV Sunglasses', price: '$44.99' },
  { id: 7, emoji: '🎒', category: 'Bags', name: 'Urban Backpack', price: '$74.99' },
  { id: 8, emoji: '🧢', category: 'Clothing', name: 'Classic Cap', price: '$24.99' },
];

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
  'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)',
  'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
  'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)',
];

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="hero-badge">
          <span>✦</span> New arrivals just dropped
        </div>

        <h1>
          Shop smarter,<br />
          live <span>better</span>
        </h1>

        <p>
          Discover thousands of curated products across fashion, electronics,
          and accessories — all in one place.
        </p>

        <div className="hero-actions">
          {user ? (
            <Link to="/cart" className="btn-hero-primary">View Cart</Link>
          ) : (
            <Link to="/register" className="btn-hero-primary">Get Started — Free</Link>
          )}
          <a href="#products" className="btn-hero-outline">Browse Products</a>
        </div>
      </section>

      <section className="products-section" id="products">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">Handpicked just for you</p>

        <div className="products-grid">
          {PLACEHOLDER_PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div
                className="product-card-image"
                style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
              >
                {product.emoji}
              </div>
              <div className="product-card-body">
                <div className="product-card-category">{product.category}</div>
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
