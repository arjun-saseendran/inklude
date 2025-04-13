import React from "react";
import ReactDOM from "react-dom/client"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Root } from "./routes/Root";
import "./index.css";
import { App } from "./App";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Cart } from "./components/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/login',
        element: <Login/>
        },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
