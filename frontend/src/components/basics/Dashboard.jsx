import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css';

const Dashboard = ({ userRole = 'owner' }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState('');

  // Mock database list (replace with database data)
  const databases = [ 
    { id: '1', name: 'Main Branch' },
    { id: '2', name: 'Warehouse' },
  ];

  // User menu items based on role
  const userItems = [
    { name: 'Settings', link: '/settings', roles: ['owner', 'admin', 'manager'] },
    { name: 'User Guide', link: '/user-guide', roles: ['owner', 'admin', 'manager', 'employee'] },
    { name: 'Logout', link: '/logout', roles: ['owner', 'admin', 'manager', 'employee'] },
  ];

  // Quick actions based on role
  const actions = [
    { name: 'Add Sale', link: selectedDatabase ? `/db/${selectedDatabase}/sales` : '/db', roles: ['owner', 'admin', 'manager', 'employee'] },
    { name: 'Add Purchase', link: selectedDatabase ? `/db/${selectedDatabase}/purchases` : '/db', roles: ['owner', 'admin', 'manager'] },
    { name: 'Add Product', link: selectedDatabase ? `/db/${selectedDatabase}/products` : '/db', roles: ['owner', 'admin', 'manager'] },
    { name: 'View Full Reports', link: selectedDatabase ? `/db/${selectedDatabase}/stats` : '/db', roles: ['owner', 'admin', 'manager'] },
  ];

  const filterByRole = (items) => items.filter((item) => item.roles.includes(userRole));

  // Handle database selection
  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
    // TODO: Store in session (e.g., localStorage or backend)
  };

  return (
    <div className="dashboard">
      {/* Database Selection */}
      {databases.length > 1 && (
        <div className="database-selection">
          <label htmlFor="database-select">Select Database/Branch: </label>
          <select
            id="database-select"
            value={selectedDatabase}
            onChange={handleDatabaseChange}
          >
            <option value="">Select a database</option>
            {databases.map((db) => (
              <option key={db.id} value={db.id}>
                {db.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Welcome!</h1>
        <div className="user-profile">
          
          <span onClick={() => setUserMenuOpen(!userMenuOpen)}><img src="/user.png" alt="User" /></span>
          {userMenuOpen && (
            <ul className="user-dropdown">
              {filterByRole(userItems).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-value">Data needed from database</p>
        </div>
        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p className="stat-value">Data needed from database</p>
        </div>
        <div className="stat-card">
          <h3>Profit/Loss Summary</h3>
          <p className="stat-value">Data needed from database</p>
        </div>
        <div className="stat-card">
          <h3>Stock Status</h3>
          <p className="stat-value">Data needed from database</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>Recent Activities</h2>
        <div className="activities-placeholder">Data needed from database</div>
      </div>

      {/* Quick Actions */}
      <div className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {filterByRole(actions).map((action) => (
            <Link
              key={action.name}
              to={action.link}
              className={`action-button ${!selectedDatabase ? 'disabled' : ''}`}
              onClick={(e) => !selectedDatabase && e.preventDefault()}
            >
              {action.name}
            </Link>
          ))}
        </div>
        {!selectedDatabase && (
          <p className="action-warning">Please select a database to enable actions.</p>
        )}
      </div>

      {/* Charts */}
      <div className="charts-section">
        <h2>Sales/Profit Charts</h2>
        <div className="chart-placeholder">Data needed from database</div>
      </div>
    </div>
  );
};

export default Dashboard;