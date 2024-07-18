import './App.css'
import Home from './components/Layout';
import Login from './components/Login';
import ListMovie from './components/Movie/components/ListMovie';
import Movie from './components/Movie/components/Movie';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListMovieDetail from './components/MovieDetail/component/ListMovieDetail';

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
          element: ListMovie,
          children: [
            {
              path: '/movie-detail',
              element: Movie
            },
            {
              path: '/movie-detail/:id',
              element: Movie
            }
          ]
        },
        {
          path: '/movie-details',
          element: ListMovieDetail
        }
      ]
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
