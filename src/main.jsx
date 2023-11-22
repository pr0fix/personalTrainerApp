import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Homepage, Customerpage, Trainingpage, Error, Trainingcalendar, Trainingstats} from './Pages.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/personalTrainerApp/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Homepage />,
        index: true
      },
      {
        path: "/personalTrainerApp/customer",
        element: <Customerpage />
      },
      {
        path: "/personalTrainerApp/training",
        element: <Trainingpage />
      },
      {
        path: "/personalTrainerApp/trainingcalendar",
        element: <Trainingcalendar />
      },
      {
        path:"/personalTrainerApp/trainingstats",
        element: <Trainingstats/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
