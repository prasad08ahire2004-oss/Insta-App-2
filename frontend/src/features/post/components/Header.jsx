import React from 'react'
import '../styles/Header.scss'

const Header = () => {
    return (
        <header className="header">

            <div className="header-inner">

                {/* Logo */}
                <a href="/" className="logo">

                    <span className="logo-icon">
                        <svg viewBox="0 0 40 40" width="34" height="34">
                            <circle
                                cx="15"
                                cy="20"
                                r="7"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2.6"
                            />

                            <circle
                                cx="25"
                                cy="20"
                                r="7"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2.6"
                                opacity="0.85"
                            />
                        </svg>
                    </span>

                    <span className="logo-text">
                        Connectly
                    </span>

                </a>


                {/* Search Bar */}
                <form
                    className="search"
                    onSubmit={(e) => e.preventDefault()}
                >

                    <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                    >
                        <circle cx="11" cy="11" r="8" />

                        <line
                            x1="21"
                            y1="21"
                            x2="16.65"
                            y2="16.65"
                        />
                    </svg>

                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search people"
                    />

                </form>


                {/* Buttons */}
                <div className="header-actions">

                    {/* Create Post */}
                    <a href="/createpost" className="create-btn">

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />

                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>

                        Create Post

                    </a>


                    {/* Profile */}
                    <a href="/profile" className="profile-btn">

                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />
                        </svg>

                    </a>

                </div>

            </div>

        </header>
    )
}

export default Header