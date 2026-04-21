export default function Orders() {
  return (
    <div className="page-container">
      <h2>Order History</h2>
      <p>Your past orders will appear here.</p>
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <h3>No orders yet</h3>
        <p>Place your first order and it will show up here.</p>
      </div>
    </div>
  );
}
