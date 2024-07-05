import React from 'react'
import Appbar from '../../components/Appbar'
import Actionbar from '../../components/Actionbar';
import AppContent from '../../components/AppContent';
import { useTodoActionController } from '../../hooks/useTodoActionController';



const Home = () => {
    const todoController = useTodoActionController();
  return (
    
    <div className='App'>
      <Appbar />

      <div className="container-fluid p-4">
        <Actionbar todoController={todoController} />

        <AppContent todoController={todoController} />
      </div>
    </div>
  )
}

export default Home