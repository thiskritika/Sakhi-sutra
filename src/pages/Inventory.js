// src/pages/Inventory.js
const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  const lowStockThreshold = 5;

  return (
    <div className="inventory">
      <h1>Inventory Management</h1>

      <div className="inventory-summary">
        <div className="summary-card">
          <h3>Total Products</h3>
          <p>45</p>
        </div>
        <div className="summary-card warning">
          <h3>Low Stock Items</h3>
          <p>5</p>
        </div>
        <div className="summary-card success">
          <h3>In Stock</h3>
          <p>38</p>
        </div>
        <div className="summary-card danger">
          <h3>Out of Stock</h3>
          <p>2</p>
        </div>
      </div>

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Minimum Stock</th>
              <th>Status</th>
              <th>Last Restocked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className={item.stock <= lowStockThreshold ? 'low-stock' : ''}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.stock}</td>
                <td>{item.minStock}</td>
                <td>
                  <span className={`stock-badge ${item.stock === 0 ? 'out' : item.stock <= lowStockThreshold ? 'low' : 'good'}`}>
                    {item.stock === 0 ? 'Out of Stock' : item.stock <= lowStockThreshold ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td>{item.lastRestocked}</td>
                <td>
                  <button className="restock-btn">Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};