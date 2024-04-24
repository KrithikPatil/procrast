import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../header/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
function Tnavbar(items) {
    // const displayName = items.displayName;
    // const email = items.email;
    // console.log(displayName, email);
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const displayName = items.displayName;
    const email = items.email;
    console.log(displayName, email);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const config = {
        bucketName: 'sem6-test-images',
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const user_image = "https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/index/" + displayName + ".jpg" + `?${new Date().getTime()}`;

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        }
        else {
            setDropdown(true);
        }
    };
    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        }
        else {
            setDropdown(false);
        }
    };

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    PROCRASTICIDE
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <FontAwesomeIcon icon={click ? faTimes : faBars} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={`/todo?email=${email}`} className='nav-links' onClick={closeMobileMenu}>
                            Todo
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/canvas' className='nav-links' onClick={closeMobileMenu}>
                            Canvas
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={`/calendar?email=${email}`} className='nav-links' onClick={closeMobileMenu}>
                            Calendar
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <div className='nav-links'>
                            {displayName}
                        </div>
                    </li>
                    
                    <li className='nav-item' >
                            <img id="uimg" src = {user_image} width = "80px" height = "80px"/>
                    </li>

                </ul>
                
            </nav >
        </>
    );
}

export default Tnavbar;