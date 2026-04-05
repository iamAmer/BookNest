import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import './App.css'

import GuestLayout from './Components/Layout/GuestLayout.jsx';
import GuestPage from './Components/GuestPage/GuestPage.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import PassReseted from './Components/PassReseted/PassReseted.jsx';
import ResetPass from './Components/ResetPass/ResetPass.jsx';
import Confirm from './Components/Confirm/Confirm.jsx';
import ForgetPass from './Components/ForgetPass/ForgetPass.jsx';
import Category from './Components/Category/Category.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Home from './Components/Home/Home.jsx';
import LearnLanguage from './Components/LearnLanguage/LearnLanguage.jsx';
import ProfileUser from './Components/ProfileUser/ProfileUser.jsx';
import MainLayout from './Components/Layout/mainLayout.jsx';
import About from './Components/About/About.jsx';
import CategoryType from './Components/CategoryType/CategoryType.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import UserContextProvider from './Components/Context/UserContext.jsx';
import GuestProtected from './Components/GuestProtected/GuestProtected.jsx';

function App() {
  let router = createHashRouter([
    {path:'/', element:<GuestLayout/> , children: [
      {index: true, element: <GuestPage/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'passReseted', element:<PassReseted/>},
      {path:'resetPass', element:<ResetPass/>},
      {path:'confirm', element:<Confirm/>},
      {path:'forgetPass', element:<ForgetPass/>},
      {path:'guestprotected', element:<GuestProtected/>},
      {path:'category', element:<Category/>},
      {path:'categoryType', element:<ProtectedRoute><CategoryType/></ProtectedRoute>},
      {path:'about', element:<About/>},
      {path:'*', element:<NotFound/>},
    ]},
    {path:'home', element:<ProtectedRoute><MainLayout/></ProtectedRoute>, children:[
      {index: true, element: <Home/>},
      {path:'learnlanguage', element: <LearnLanguage/>},
      {path:'category', element:<Category/>},
      {path:'categoryType', element:<CategoryType/>},
      {path:'profile', element:<ProfileUser/>},
      {path:'*', element:<NotFound/>},
    ]},
    // {path:'child', element:<Child/>, children:[]},
  ]);

  return <>
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  </>
}


export default App
