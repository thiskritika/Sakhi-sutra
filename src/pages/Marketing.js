// src/pages/Marketing.js
const Marketing = () => {
  const [campaigns, setCampaigns] = useState([]);

  const createCampaign = () => {
    // Create WhatsApp broadcast campaign
    // Send promotional messages
  };

  return (
    <div className="marketing">
      <h1>Marketing Tools</h1>

      <div className="campaign-creator">
        <h2>Create WhatsApp Campaign</h2>
        <textarea placeholder="Enter your message..."></textarea>
        <div className="campaign-options">
          <label>
            <input type="checkbox" /> Send to all customers
          </label>
          <label>
            <input type="checkbox" /> Send to repeat customers only
          </label>
          <label>
            <input type="checkbox" /> Send to new customers
          </label>
        </div>
        <button className="send-btn">Send Broadcast</button>
      </div>

      <div className="past-campaigns">
        <h2>Past Campaigns</h2>
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <div className="campaign-header">
              <h3>{campaign.name}</h3>
              <span className="date">{campaign.date}</span>
            </div>
            <p>{campaign.message}</p>
            <div className="campaign-stats">
              <span>Sent to: {campaign.sentCount}</span>
              <span>Opened: {campaign.openRate}%</span>
              <span>Orders: {campaign.orderCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};