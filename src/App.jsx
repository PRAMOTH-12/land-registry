import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddLand from './components/Addland';
import LandList from './components/LandList';
import BlockchainView from './components/BlockchainView';
import TransactionForm from './components/TransactionForm';
import MineBlockButton from './components/MineBlockButton';
import Wallet from './pages/Wallet';
import Blockchain from './pages/Blockchain';
import AddProperty from './pages/Addproperty';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <div style={{ display: 'flex' }}>
                <Sidebar /> {/* Sidebar visible only when logged in */}

                <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-land" element={<AddLand />} />
                    <Route path="/lands" element={<LandList />} />
                    <Route path="/blockchain" element={<BlockchainView />} />
                    <Route path="/send-transaction" element={<TransactionForm />} />
                    <Route path="/mine-block" element={<MineBlockButton />} />
                    <Route path="/wallet" element={<Wallet />} />
                    
                    <Route path="/add-property" element={<AddProperty />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
