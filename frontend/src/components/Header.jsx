import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../style/Header.scss'

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <header className={`header ${menuOpen ? 'header--open' : ''}`}>

            <div className='header__container'>

                {/* Logo */}

                <NavLink to='/' className='logo' onClick={closeMenu}>

                    <span className='logo__mark' aria-hidden='true'>

                        <svg
                            viewBox='0 0 40 40'
                            width='36'
                            height='36'
                            fill='none'
                        >
                            <circle
                                cx='15'
                                cy='20'
                                r='7'
                                stroke='white'
                                strokeWidth='2.6'
                            />

                            <circle
                                cx='25'
                                cy='20'
                                r='7'
                                stroke='white'
                                strokeWidth='2.6'
                                opacity='0.85'
                            />

                        </svg>

                    </span>

                    <span className='logo__text'>
                        Connectly
                    </span>

                </NavLink>


                {/* Desktop Navigation */}

                <div className='header__right'>

                    <nav className='header__nav'>

                        <ul>

                            <li>
                                <NavLink
                                    to='/'
                                    end
                                    className='header__link'
                                    onClick={closeMenu}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to='/features'
                                    className='header__link'
                                    onClick={closeMenu}
                                >
                                    Features
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to='/about'
                                    className='header__link'
                                    onClick={closeMenu}
                                >
                                    About
                                </NavLink>
                            </li>

                        </ul>

                    </nav>


                    {/* Desktop Buttons */}

                    <div className='header__actions'>

                        <NavLink
                            to='/login'
                            className='btn btn--outline'
                            onClick={closeMenu}
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to='/register'
                            className='btn btn--primary'
                            onClick={closeMenu}
                        >
                            Register
                        </NavLink>

                    </div>

                </div>


                {/* Hamburger Button */}

                <button
                    type='button'
                    className='header__toggle'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >

                    {menuOpen ? (

                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                        >
                            <path d='M18 6L6 18' />
                            <path d='M6 6L18 18' />
                        </svg>

                    ) : (

                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                        >
                            <path d='M3 6H21' />
                            <path d='M3 12H21' />
                            <path d='M3 18H21' />
                        </svg>

                    )}

                </button>

            </div>


            {/* Responsive Menu */}

            <div className='mobile-menu'>

                <div className='mobile-menu__container'>

                    <nav className='mobile-menu__nav'>

                        <ul>

                            <li>
                                <NavLink
                                    to='/'
                                    end
                                    className='mobile-menu__link'
                                    onClick={closeMenu}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to='/features'
                                    className='mobile-menu__link'
                                    onClick={closeMenu}
                                >
                                    Features
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to='/about'
                                    className='mobile-menu__link'
                                    onClick={closeMenu}
                                >
                                    About
                                </NavLink>
                            </li>

                        </ul>

                    </nav>


                    {/* Responsive Buttons */}

                    <div className='mobile-menu__actions'>

                        <NavLink
                            to='/login'
                            className='btn btn--outline'
                            onClick={closeMenu}
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to='/register'
                            className='btn btn--primary'
                            onClick={closeMenu}
                        >
                            Register
                        </NavLink>

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header