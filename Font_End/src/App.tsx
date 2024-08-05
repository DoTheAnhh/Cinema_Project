// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layouts from './components/Layout';
import Login from './components/Login';
import User from './components/UserPage/User';
import MVDetailForUser from './components/UserPage/MovieDetailForUser/MVDetailForUser';
import ProtectedRoute from './ProtectedRoute';
import './App.css'
import NotFound from './NotFound';

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
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
