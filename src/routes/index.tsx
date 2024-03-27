import { createBrowserRouter } from 'react-router-dom';
import MainApp from '../MainApp';
import { LoginForm } from '../pages/login/login';
import { FlightsPage } from '@/pages/flights/flights';
import { CreateFlightForm } from '@/pages/flights/create';

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
                element: <FlightsPage />
            }
            ,
            {
                path: '/flights/create',
                element: <CreateFlightForm />
            }
        ]
    }
]);

export default router;