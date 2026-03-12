// src/pages/CustomerManagement.js
const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  const customerStats = {
    total: 89,
    active: 45,
    newThisMonth: 12,
    repeatCustomers: 34
  };

  return (
    <div className="customer-management">
      <h1>Customer Management</h1>

      <div className="stats-cards">
        <div className="stat">
          <h3>Total Customers</h3>
          <p>{customerStats.total}</p>
        </div>
        <div className="stat">
          <h3>Active</h3>
          <p>{customerStats.active}</p>
        </div>
        <div className="stat">
          <h3>New This Month</h3>
          <p>{customerStats.newThisMonth}</p>
        </div>
        <div className="stat">
          <h3>Repeat Customers</h3>
          <p>{customerStats.repeatCustomers}</p>
        </div>
      </div>

      <div className="customer-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.orderCount}</td>
                <td>₹{customer.totalSpent}</td>
                <td>{customer.lastOrder}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="message-btn">📱 Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};