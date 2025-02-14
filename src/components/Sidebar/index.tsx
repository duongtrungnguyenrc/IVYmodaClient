import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './styles.css';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar ({ menu } : { menu: {id: number, icon: string, path: string, title: string}[]}) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id: number) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <a href="/">
                    <img
                        src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
                        alt="logo" />
                    </a>
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <Link 
                                    to={item.path} 
                                    className={ item.id === active ? 'sidebar-item-active' : 'sidebar-item'} >
                                        <img 
                                            src={item.icon}
                                            alt={`icon-${item.icon}`}
                                            className='sidebar-item-icon' />
                                        <span className='sidebar-item-label'>{item.title}</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer'>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;