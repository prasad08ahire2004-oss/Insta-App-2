import React, { useState , useEffect } from 'react'
import '../styles/FeedBody.scss'
import Post from './Post'
import { usePost } from '../hooks/usePost'

const FeedBody = () => {

    // Context se feed data, loading state aur API function lena
    //Ye line usePost.js se returned values receive karti hai.
    const { feed, loading, fetchFeed } = usePost()

    const [error, setError] = React.useState('')


    // Component mount hone par feed fetch karta hai aur feed fetch fail ho gai tho error message set kar deti hai
    useEffect(() => {
        const loadFeed = async () => {
            setError('')

            try {
                await fetchFeed()
            } catch (error) {
                setError(error.message || 'Failed to fetch posts.')
            }
        }

        loadFeed()
    }, [])

    return (
        <div className="layout">

            {/* Left Sidebar */}
            <nav className="sidenav">

                <a href="/feed" className="sidenav-link active">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.5 2 10.5V21a1 1 0 0 0 1 1h6v-7h6v7h6a1 1 0 0 0 1-1V10.5z" />
                    </svg>
                    Home
                </a>

                <a href="/createpost" className="sidenav-link">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Create Post
                </a>

                <a href="/profile" className="sidenav-link">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                </a>

            </nav>


            {/* Main Feed */}
            <main className="feed">

                {/* Create Post Card */}
                <a href="/createpost" className="composer">

                    <span className="composer-avatar">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />
                        </svg>
                    </span>

                    <span className="composer-text">
                        Share a moment with your people…
                    </span>

                    <span className="composer-btn">
                        Post
                    </span>

                </a>

                {/* Loading message */}
                {loading && (
                    <p className="feed-message">
                        Loading posts...
                    </p>
                )}

                {/* Error message */}
                {error && (
                    <p className="feed-message error">
                        {error}
                    </p>
                )}


                
                {/* Backend se aane wali posts render karna */}
                {!loading && !error && feed.map((post, index) => (

                    <Post
                        key={post._id}
                        avatar={post.user?.username?.charAt(0).toUpperCase() || 'U'}
                        username={post.user?.username || 'Unknown User'}
                        location={['Mumbai, India', 'Goa, India', 'Bhopal, India'][index % 3]}
                        time="Just now"
                        image={post.imgUrl}
                        imageAlt={post.caption || 'User post'}
                        liked={false}
                        likes={Math.floor(Math.random() * 1000) + 100}
                        caption={post.caption}
                        comments={Math.floor(Math.random() * 100) + 1}
                    />

                ))}


                <p className="feed-end">
                    You're all caught up
                </p>

            </main>


            {/* Right Sidebar */}
            <aside className="sidebar">

                {/* Your Profile */}
                <a href="/profile" className="card mini-profile">

                    <span className="mini-profile-avatar">
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />
                        </svg>
                    </span>

                    <span className="mini-profile-text">
                        <strong>Your profile</strong>
                        <small>View and edit</small>
                    </span>

                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.2" strokeLinecap="round">
                        <polyline points="9 6 15 12 9 18" />
                    </svg>

                </a>


                {/* Suggested Users */}
                <section className="card suggestions">

                    <h2>Suggested for you</h2>

                    <ul>

                        <li>
                            <span className="suggestions-avatar avatar-one">M</span>
                            <span className="suggestions-name">maya.k</span>
                            <a href="#" className="suggestions-follow">Follow</a>
                        </li>

                        <li>
                            <span className="suggestions-avatar avatar-two">J</span>
                            <span className="suggestions-name">jay.shoots</span>
                            <a href="#" className="suggestions-follow">Follow</a>
                        </li>

                        <li>
                            <span className="suggestions-avatar avatar-three">S</span>
                            <span className="suggestions-name">sam.lin</span>
                            <a href="#" className="suggestions-follow">Follow</a>
                        </li>

                    </ul>

                </section>

            </aside>

        </div>
    )
}

export default FeedBody