export default function Cart() {
  return (
    <div className="page-container">
      <h2>Your Cart</h2>
      <p>Cart items will appear here once products are wired to the API.</p>
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started.</p>
      </div>
    </div>
  );
}
