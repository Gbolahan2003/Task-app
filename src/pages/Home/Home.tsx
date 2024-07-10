import React, { useEffect } from 'react'
import Appbar from '../../components/Appbar'
import Actionbar from '../../components/Actionbar';
import AppContent from '../../components/AppContent';
import { useTodoActionController } from '../../hooks/useTodoActionController';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getUserFeature } from '../../redux-store/features/user/features';



const Home = () => {

    const todoController = useTodoActionController();
    const dispatch = useAppDispatch()
    
    
    useEffect(()=>{
      dispatch(getUserFeature())
    },[dispatch])

    const users = useAppSelector(state=>state.user.user)
    
    

  return (
    
    <div className='App'>
      <Appbar />

      <div className="container-fluid p-4">
        <Actionbar name={users?.body.firstName
          
        } todoController={todoController} />

        <AppContent todoController={todoController} />
      </div>
    </div>
  )
}

export default Home