import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Component/Main/Main.jsx'
import ErrorPage from './Component/ErrorPage/ErrorPage.jsx'
import Home from './Component/Home/Home.jsx'
import BookDetails from './Component/BookDetails/BookDetails.jsx'
import Login from './Component/Login/Login.jsx'
import SignUp from './Component/SignUp/SignUp.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.jsx'
import Secret from './Component/Shared/Secret/Secret.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ViewCart from './Component/ViewCartSection/ViewCart.jsx'
import Cart from './Component/ViewCartSection/Pages/Cart.jsx'
import AllUsers from './Component/ViewCartSection/Pages/AllUsers.jsx'


const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/book/:bookId",
        element: <BookDetails></BookDetails>,
        loader: () => fetch("http://localhost:5000/book")
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  },
  {
    path: '/viewcart',
    element: <PrivateRoute><ViewCart></ViewCart></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      }
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
