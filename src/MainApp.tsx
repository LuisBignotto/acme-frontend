import { Outlet } from 'react-router-dom';
import Header from './components/header/header';

const userLoggedIn = false;
const userAvatarUrl = "https://github.com/LuisBignotto.png";

function MainApp() {
    return (
        <div className="flex flex-col h-screen">
            <Header userLoggedIn={userLoggedIn} userAvatarUrl={userAvatarUrl} />
            <div className='flex-grow overflow-auto pt-14 md:pt-20'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainApp;