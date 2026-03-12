// src/pages/ProductManagement.js
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const addProduct = (productData) => {
    // Add new product
    // Update inventory
  };

  const updateStock = (productId, newStock) => {
    // Update stock level
    // Alert if low stock
  };

  return (
    <div className="product-management">
      <div className="header">
        <h1>Product Management</h1>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          ➕ Add New Product
        </button>
      </div>

      {/* Low Stock Alert */}
      <div className="alerts">
        <h3>⚠️ Low Stock Alerts</h3>
        <div className="alert-list">
          <div className="alert-item">
            <span>Crochet Teddy Bear</span>
            <span className="stock">Only 2 left!</span>
            <button>Restock</button>
          </div>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <div className="actions">
              <button>✏️ Edit</button>
              <button>📷 Update Image</button>
              <button>📊 Sales Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};