import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ userRole = 'owner' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dbID } = useParams(); // Get dbID from URL

  const navItems = {
    databases: [
      { name: 'Create Database', link: '/create-database', roles: ['owner', 'admin'] },
      { name: 'Select Database', link: '/select-database', roles: ['owner', 'admin', 'manager', 'employee'] },
    ],
    operations: [
      { name: 'Products', link: dbID ? `${dbID}/products` : '/db', roles: ['owner', 'admin', 'manager', 'employee'] },
      { name: 'Sales', link: dbID ? `${dbID}/sales` : '/db', roles: ['owner', 'admin', 'manager', 'employee'] },
      { name: 'Purchases', link: dbID ? `${dbID}/purchases` : '/db', roles: ['owner', 'admin', 'manager'] },
    ],
    people: [
      { name: 'Employees', link: '/employees', roles: ['owner', 'admin', 'manager'] },
      { name: 'Customers', link: '/customers', roles: ['owner', 'admin', 'manager', 'employee'] },
      { name: 'Suppliers', link: '/suppliers', roles: ['owner', 'admin', 'manager'] },
    ],
    stock: [
      { name: 'Stock Tracking', link: '/stock-tracking', roles: ['owner', 'admin', 'manager', 'employee'] },
      { name: 'Internal Movement', link: '/internal-movement', roles: ['owner', 'admin', 'manager'] },
    ],
    reports: [
      { name: 'Sales Insights', link: dbID ? `${dbID}/stats` : '/db', roles: ['owner', 'admin', 'manager'] },
      { name: 'Profit/Loss', link: '/profit-loss', roles: ['owner', 'admin', 'manager'] },
      { name: 'Employee Performance', link: '/employee-performance', roles: ['owner', 'admin', 'manager'] },
    ],
  };

  const userItems = [
    { name: 'Settings', link: '/settings', roles: ['owner', 'admin', 'manager'] },
    { name: 'User Guide', link: '/user-guide', roles: ['owner', 'admin', 'manager', 'employee'] },
    { name: 'Logout', link: '/logout', roles: ['owner', 'admin', 'manager', 'employee'] },
  ];

  const filterByRole = (items) => items.filter((item) => item.roles.includes(userRole));
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Link to="/db" className="navbar-logo">
      <img src="/Logo.png" alt="LedgerDB Logo" />
        <img src="/LedgerDB.png" alt="LedgerDB Logo" />
      </Link>

      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <li className="navbar-item">
          <Link to="/db">Dashboard</Link>
        </li>
        {filterByRole(navItems.databases).length > 0 && (
          <li className="navbar-item">
            Databases ▼
            <ul className="navbar-dropdown">
              {filterByRole(navItems.databases).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {filterByRole(navItems.operations).length > 0 && (
          <li className="navbar-item">
            Operations ▼
            <ul className="navbar-dropdown">
              {filterByRole(navItems.operations).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {filterByRole(navItems.people).length > 0 && (
          <li className="navbar-item">
            People ▼
            <ul className="navbar-dropdown">
              {filterByRole(navItems.people).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {filterByRole(navItems.stock).length > 0 && (
          <li className="navbar-item">
            Stock ▼
            <ul className="navbar-dropdown">
              {filterByRole(navItems.stock).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {filterByRole(navItems.reports).length > 0 && (
          <li className="navbar-item">
            Reports ▼
            <ul className="navbar-dropdown">
              {filterByRole(navItems.reports).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        <li className="navbar-item navbar-alerts">
          🔔 <span className="badge">3</span>
          <ul className="navbar-dropdown">
            <li>Low stock: Item XYZ</li>
            <li>Audit log: Price changed</li>
            <li>Pending payment: Sale #123</li>
          </ul>
        </li>
        <li className="navbar-item navbar-user">
          <img src="/user.png" alt="User" />
          user
          <ul className="navbar-dropdown">
            {filterByRole(userItems).map((item) => (
              <li key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;