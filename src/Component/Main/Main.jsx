import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Shared/NavBar/NavBar';

const Main = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {noHeader || <NavBar></NavBar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;