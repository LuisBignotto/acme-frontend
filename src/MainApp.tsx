import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import { isAuthenticated } from './services/authService';
import { ToastProvider } from '@/components/ui/toast'; 
import { Toaster } from '@/components/ui/toaster';

const userLoggedIn = isAuthenticated();

function MainApp() {
    return (
        <ToastProvider>
            <div className="flex flex-col h-screen">
                <Header userLoggedIn={userLoggedIn} />
                <div className='flex-grow overflow-auto pt-14 md:pt-20'>
                    <Outlet />
                </div>
                <Toaster />
            </div>
        </ToastProvider>
    )
}

export default MainApp;
