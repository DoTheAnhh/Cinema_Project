// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layouts from './components/Layout';
import Login from './components/Login';
import User from './components/UserPage/User';
import MVDetailForUser from './components/UserPage/MovieDetailForUser/MVDetailForUser';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import { UserProvider } from './components/Context/UserContext';
import './App.css'
import CinemaRoomBooking from './components/UserPage/MovieDetailForUser/CinemaRoom/CinemaRoomBooking';
import FoodSelected from './components/UserPage/MovieDetailForUser/CinemaRoom/FoodSelected/FoodSelected';
interface RouteComponent {
  path: string;
  element: React.ReactElement;
  children?: RouteComponent[];
}

function App() {
  useEffect(() => {
    document.title = "Do The Anh";
  }, []);

  const routes: RouteComponent[] = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'dotheanh/*',
      element: <ProtectedRoute element={<Layouts />} requiredRole="ADMIN" />,
      children: [
        // Define your protected routes here
      ]
    },
    {
      path: 'user/*',
      element: <User />
    },
    {
      path: 'movie/:id',
      element: <MVDetailForUser />
    },
    {
      path: 'cinema-room-booking',
      element: <CinemaRoomBooking />
    },
    {
      path: 'food-selected',
      element: <FoodSelected />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ];

  const renderRoutes = (children: RouteComponent[] = [], path = '') => {
    return children.map((route) => {
      const currentPath = path + route.path;
      return (
        <Route
          key={currentPath}
          path={currentPath}
          element={route.element}
        >
          {route?.children && renderRoutes(route.children, currentPath)}
        </Route>
      );
    });
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
