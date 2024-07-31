import './App.css'
import Layouts from './components/Layout';
import Login from './components/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './components/UserPage/User';
import { useEffect } from 'react';
import MVDetailForUser from './components/UserPage/MovieDetailForUser/MVDetailForUser';

interface RouteComponent {
  path: string;
  element: React.ComponentType<any>;
  children?: RouteComponent[];
}

function App() {

  useEffect(() => {
    document.title = "Do The Anh";
  }, []);

  const routes: RouteComponent[] = [
    {
      path: '',
      element: Login
    },
    {
      path: 'dotheanh/*',
      element: Layouts,
    },
    {
      path: 'user/*',
      element: User,
    },
    {
      path: 'movie/:id',
      element: MVDetailForUser
    }
  ];

  const renderRoutes = (children: RouteComponent[] = [], path = '') => {
    return children.map((route) => {
      const currentPath = path + route.path;
      return (
        <Route
          key={currentPath}
          path={currentPath}
          element={<route.element />}
        >
          {route?.children && renderRoutes(route.children, currentPath)}
        </Route>
      )
    })
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
