import { createBrowserRouter } from 'react-router-dom';
import MainApp from '../MainApp';
import { LoginForm } from '../pages/login/login';
import { FlightsPage } from '@/pages/flights/flights';
import ProtectedRoute from './ProtectedRoute';
import { FlightPage } from '@/pages/flights/flight';
import { UpdateFlightForm } from '@/pages/flights/update';

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
        path: '/flights/:flightId',
        element: <ProtectedRoute element={<FlightPage />} redirectTo="/" />
      },
      {
        path: '/flights/update/:flightId',
        element: <ProtectedRoute element={<UpdateFlightForm />} redirectTo="/" />
      }
    ]
 }
]);

export default router;
