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
        loader: () => fetch("../public/booksInfo.json")
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='max-w-screen-xl mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
