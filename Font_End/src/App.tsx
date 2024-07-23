import './App.css'
import Layouts from './components/Layout';
import Login from './components/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

interface RouteComponent {
  path: string;
  element: React.ComponentType<any>;
  children?: RouteComponent[];
}

function App() {
  
  const routes: RouteComponent[] = [
    {
      path: '',
      element: Login
    },
    {
      path: 'dotheanh/*',
      element: Layouts, 
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
