import './App.css'
import Home from './components/Layout';
import Login from './components/Login';
import Movie from './components/Movie/components/Movie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

interface RouteComponent {
  path: string;
  element: React.ComponentType<any>;
  children?: RouteComponent[];
}

function App() {
  
  const routes: RouteComponent[] = [
    {
      path: '/',
      element: Login
    },
    {
      path: '/dotheanh',
      element: Home,
      children: [
        {
          path: '/home',
          element: Home
        },
        {
          path: '/movies',
          element: Movie
        }
      ]
    }
  ];

  return (
    <>
      <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.element />}
          >
            {route.children && route.children.map(child => (
              <Route
                key={`${route.path}-${child.path}`}
                path={`${route.path}/${child.path}`}
                element={<child.element />}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
