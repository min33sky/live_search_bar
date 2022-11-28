import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorViewer from '../components/ErrorViewer';
import About from '../screens/about';
import ErrorTest from '../screens/errorTest';
import Home from '../screens/home';
import NotFound from '../screens/notFound';
import Search from '../screens/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'error-test',
        element: <ErrorTest />,
        errorElement: <ErrorViewer />,
      },
      {
        path: 'search/:keyword',
        element: <Search />,
      },
    ],
  },
]);

export default router;
