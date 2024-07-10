import { createContext, useState, useEffect, ReactNode } from 'react';
import useAxios from './hooks/useAxios';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { getUserFeature } from './redux-store/features/user/features';

interface AuthContextProps {
  isAuthenticated: boolean;

}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [isAuthenticated, setIsAuthenticated]= useState<boolean>(false)

  useEffect(()=>{
    dispatch(getUserFeature())

  },[dispatch])
  const user = useAppSelector(state=>state.user.user)
  if(!user || user===undefined){
    setIsAuthenticated(false)
  }else{
    setIsAuthenticated(true)
  }
  


  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
