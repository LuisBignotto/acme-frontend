import { createBrowserRouter } from 'react-router-dom';
import MainApp from '../MainApp';
import { LoginForm } from '../pages/login/login';
import { FlightsPage } from '@/pages/flights/flights';
import ProtectedRoute from './ProtectedRoute';
import { FlightPage } from '@/pages/flights/flight';
import { BaggagesPage } from '@/pages/baggages/baggages';
import { UsersPage } from '@/pages/users/users';
import { UserProfile } from '@/pages/configuration/config';
import { TicketsPage } from '@/pages/tickets/TicketsPage';
import { TicketDetailsPage } from '@/pages/tickets/TicketDetailsPage';

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
        path: '/baggages',
        element: <ProtectedRoute element={<BaggagesPage />} redirectTo="/" />
      },
      {
        path: '/users',
        element: <ProtectedRoute element={<UsersPage />} redirectTo="/" />
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<UserProfile />} redirectTo="/" />
      },
      {
        path: '/tickets',
        element: <ProtectedRoute element={<TicketsPage />} redirectTo="/" />
      },
      {
        path: '/tickets/:ticketId',
        element: <ProtectedRoute element={<TicketDetailsPage />} redirectTo="/" />
      }
    ]
 }
]);

export default router;
