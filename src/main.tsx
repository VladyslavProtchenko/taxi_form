import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Orders from './pages/dashboard/Orders.tsx';
import Calendar from './pages/dashboard/Calendar.tsx';
import Customers from './pages/dashboard/Customers.tsx';
import Drivers from './pages/dashboard/Drivers.tsx';
import Prices from './pages/dashboard/Prices.tsx';
import Settings from './pages/dashboard/Settings.tsx';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children:[
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "Customers",
        element: <Customers />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "prices",
        element: <Prices />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
