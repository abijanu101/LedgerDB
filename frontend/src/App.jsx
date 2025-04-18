import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/global.css';

import SignUp from './components/basics/Signup.jsx';
import LogIn from './components/basics/Login.jsx';
import Dashboard from './components/basics/Dashboard.jsx';

import DBCommons from './components/userDB/dbCommons.jsx';

import Products from './components/userDB/Products.jsx';
import Sales from './components/userDB/Sales.jsx';
import Purchases from './components/userDB/Purchases.jsx';
import Branches from './components/userDB/Branches.jsx';
import Statistics from './components/userDB/Statistics.jsx';

import Denied from './components/basics/Denied.jsx';
import NotFound from './components/basics/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Navbar) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/db/denied" element={<Denied />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />

        {/* Authenticated Routes (With Navbar) */}
        <Route
          path="/db"
          element={
            <>
              <Navbar userRole="owner" />
              <div className="container" style={{ padding: '20px' }}>
                <Dashboard />
              </div>
            </>
          }
        />
        <Route
          path="/db/:dbID"
          element={
            <>
              <Navbar userRole="owner" />
              <div className="container" style={{ padding: '20px' }}>
                <DBCommons />
              </div>
            </>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="branches" element={<Branches />} />
          <Route path="stats" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;