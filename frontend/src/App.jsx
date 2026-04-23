import '@fortawesome/fontawesome-free/css/all.min.css'
import { createHashRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import './App.css'
import UserContextProvider from './Components/Context/UserContext.jsx';
import GuestLayout    from './Components/Layout/GuestLayout.jsx';
import MainLayout     from './Components/Layout/mainLayout.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
const GuestPage = lazy(() => import('./Components/GuestPage/GuestPage.jsx'));
const Login = lazy(() => import('./Components/Login/Login.jsx'));
const Register = lazy(() => import('./Components/Register/Register.jsx'));
const PassReseted = lazy(() => import('./Components/PassReseted/PassReseted.jsx'));
const ResetPass = lazy(() => import('./Components/ResetPass/ResetPass.jsx'));
const Confirm = lazy(() => import('./Components/Confirm/Confirm.jsx'));
const ForgetPass = lazy(() => import('./Components/ForgetPass/ForgetPass.jsx'));
const GuestProtected = lazy(() => import('./Components/GuestProtected/GuestProtected.jsx'));
const Category = lazy(() => import('./Components/Category/Category.jsx'));
const CategoryType = lazy(() => import('./Components/CategoryType/CategoryType.jsx'));
const About = lazy(() => import('./Components/About/About.jsx'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound.jsx'));
const Home = lazy(() => import('./Components/Home/Home.jsx'));
const LearnLanguage = lazy(() => import('./Components/LearnLanguage/LearnLanguage.jsx'));
const ProfileUser = lazy(() => import('./Components/ProfileUser/ProfileUser.jsx'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#795420] border-t-transparent" />
    </div>
  );
}

const router = createHashRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { index: true,            element: <GuestPage /> },
      { path: 'login',          element: <Login /> },
      { path: 'register',       element: <Register /> },
      { path: 'passReseted',    element: <PassReseted /> },
      { path: 'resetPass',      element: <ResetPass /> },
      { path: 'confirm',        element: <Confirm /> },
      { path: 'forgetPass',     element: <ForgetPass /> },
      { path: 'guestprotected', element: <GuestProtected /> },
      { path: 'category',       element: <Category /> },
      { path: 'about',          element: <About /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'categoryType', element: <CategoryType /> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,           element: <Home /> },
      { path: 'learnlanguage', element: <LearnLanguage /> },
      { path: 'category',      element: <Category /> },
      { path: 'categoryType',  element: <CategoryType /> },
      { path: 'profile',       element: <ProfileUser /> },
      { path: '*',             element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </UserContextProvider>
  );
}

// export default App
