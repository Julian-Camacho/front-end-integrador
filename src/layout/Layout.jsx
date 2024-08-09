import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';

export default function Layout() {
    return (
        <>
        <Header />
        <Sidebar />
        <main className='main-container'>
            <Outlet />  
        </main>
        <Footer />
        </>
    );
}
