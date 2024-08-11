import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';
import './Layout.css';

export default function Layout() {
    return (
        <div className='general-container'>
        <Header />
        <Sidebar />
        <main className='main-container'>
            <Outlet />  
        </main>
        <Footer />
        </div>
    );
}
