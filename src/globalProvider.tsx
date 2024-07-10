import React, { FC } from 'react'
import { store} from "./redux-store";
import { Provider } from 'react-redux';
import {Toaster} from 'sonner'
// import { PersistGate } from 'redux-persist/integration/react';


interface  provider {
    children:React.ReactNode
}
const GlobalProvider:FC<provider> = ({children}) => {
  return (
    <Provider store={store}>
        <main>
          <Toaster
        expand={true}
        richColors
          position='top-center'/>
            {children}
        </main>
      
    </Provider>
  )
}

export default GlobalProvider