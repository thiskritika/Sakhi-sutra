// src/pages/OrderManagement.js
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  const updateOrderStatus = (orderId, status) => {
    // Update order status
    // Send WhatsApp notification to customer
    const message = `Your order #${orderId} status has been updated to ${status}`;
    window.open(`https://wa.me/customer_number?text=${message}`);
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      
      <div className="filters">
        <button onClick={() => setFilter('all')}>All Orders</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('processing')}>Processing</button>
        <button onClick={() => setFilter('shipped')}>Shipped</button>
        <button onClick={() => setFilter('delivered')}>Delivered</button>
      </div>

      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            
            <div className="order-details">
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Order Date:</strong> {order.date}</p>
            </div>

            <div className="order-items">
              <h4>Items:</h4>
              {order.items.map(item => (
                <div key={item.id} className="item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-actions">
              <select onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              
              <button className="whatsapp-btn">
                📱 Message Customer
              </button>
              
              <button className="tracking-btn">
                📦 Update Tracking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};