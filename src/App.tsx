import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { Routes, Route, Navigate } from 'react-router-dom';
import "./App.scss";
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { getUserFeature } from './redux-store/features/user/features';
import { handleErrors } from './utils/errorHandler';
import ProgressBar from './components/loadingBar';
import SignUP from './pages/sign-up/SIgnUp';
import ParticleContainer from './components/particle/particle';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Work Sans', 'Inter']
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserFeature());
      } catch (error) {
        handleErrors(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className="App">
    
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/sign-up' element ={<SignUP/>}/>
      </Routes>


      
    </div>
  );
}

export default App;
