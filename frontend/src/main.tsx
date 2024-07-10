import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './routes/routes.tsx'
import { store,persistor } from './utils/context/persistStore.ts'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
      </Provider>
  </React.StrictMode>,
)
