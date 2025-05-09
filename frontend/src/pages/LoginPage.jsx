import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Login from '../components/Login';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [, setUser] = useState(null);
  const navigate = useNavigate();

  const handleUserLogin = (userData) => {
    setUser(userData); 
    navigate('/'); 
  };

  return (
    <>
      <PageHeader />
      <Login setUser={handleUserLogin} />
      <Footer />
    </>
  );
}

export default LoginPage;
