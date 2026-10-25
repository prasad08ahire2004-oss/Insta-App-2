import React from 'react'
import '../style/Header.scss'

const Header = () => {
  return (
    <header className="topbar">

        <h1 className="topbar__title">
            maya.rao
        </h1>

        <button
        className="icon-btn"
        type="button"
        aria-label="Settings"
        >

            <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            >

                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />

            </svg>

        </button>

    </header>
  )
}

export default Header
