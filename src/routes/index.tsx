import { createBrowserRouter } from 'react-router-dom';
import MainApp from '../MainApp';
import { LoginForm } from '../pages/login/login';
import { FlightsPage } from '@/pages/flights/flights';
import { CreateFlightForm } from '@/pages/flights/create';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
 {
    path: '/',
    element: <MainApp />,
    children: [
      {
        path: '/',
        element: <LoginForm />
      },
      {
        path: '/flights',
        element: <ProtectedRoute element={<FlightsPage />} redirectTo="/" />
      },
      {
        path: '/flights/create',
        element: <ProtectedRoute element={<CreateFlightForm />} redirectTo="/" />
      }
    ]
 }
]);

export default router;
