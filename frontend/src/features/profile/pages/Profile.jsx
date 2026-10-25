
import React, { useState , useEffect } from 'react'
import Header from '../components/Header'
import Post from '../components/Post'
import '../style/Profile.scss'

// Profile feature ka custom hook
// Isse posts, loading, error aur API call karne ka function milega
import { useProfile } from '../hooks/useProfile'

const Profile = () => {

    // ProfileContext se posts aur API-related data lena
    const {
        posts,
        loading,
        error,
        fetchMyPosts
    } = useProfile()



    // Profile page load hone par logged-in user ki posts fetch karna
    useEffect(() => {

        // Backend API call karke posts ko Context mein store karega
        fetchMyPosts()

    }, [])

    // ProfileContext mein posts ki current value check karna
// Jab bhi posts array change hoga, console mein print hoga
useEffect(() => {

    console.log('Profile Posts:', posts)

}, [posts])



    // Currently selected tab
    const [activeTab, setActiveTab] = useState('Posts')

    // Selected post jiska options menu open hai
    const [selectedPost, setSelectedPost] = useState(null)

    // Delete confirmation dialog ki state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    // Success message ki state
    const [toast, setToast] = useState('')

    // Post options menu open karna
    const openPostOptions = (post) => {
        setSelectedPost(post)
    }

    // Post options menu close karna
    const closePostOptions = () => {
        setSelectedPost(null)
    }

    // Delete confirmation open karna
    const openDeleteConfirm = () => {
        setShowDeleteConfirm(true)
    }

    // Delete confirmation close karna
    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false)
    }

    // Selected post delete karna
    const handleDeletePost = () => {

        if (!selectedPost) return

        // Abhi sirf React state se post remove kar rahe hain
        setPosts((previousPosts) => {
            return previousPosts.filter((post) => {
                return post.id !== selectedPost.id
            })
        })

        setShowDeleteConfirm(false)
        setSelectedPost(null)
        setToast('Post deleted successfully')
    }

    return (
        <div className="screen">

            {/* ================= TOPBAR ================= */}

            <Header />


            <main className="page">

                {/* ================= PROFILE IDENTITY ================= */}

                <section className="identity">

                    <span
                        className="avatar"
                        role="img"
                        aria-label="Profile photo of Maya Rao"
                    >
                        <span className="avatar__inner">
                            MR
                        </span>
                    </span>

                    <h2 className="identity__name">
                        Maya Rao
                    </h2>

                    <p className="identity__handle">
                        @maya.rao · she/her
                    </p>

                    <p className="identity__bio">
                        Weekend hiker, slow cook, collector of
                        small moments. Here for my people.
                    </p>

                </section>


                {/* ================= PROFILE STATS ================= */}

                <section
                    className="stats"
                    aria-label="Profile stats"
                >

                    <div className="stat">
                        <strong className="stat__value">
                            {posts.length}
                        </strong>
                        <span className="stat__label">
                            Posts
                        </span>
                    </div>

                    <a
                        className="stat stat--link"
                        href="/followers"
                    >
                        <strong className="stat__value">
                            182
                        </strong>
                        <span className="stat__label">
                            Followers
                        </span>
                    </a>

                    <a
                        className="stat stat--link"
                        href="/following"
                    >
                        <strong className="stat__value">
                            164
                        </strong>
                        <span className="stat__label">
                            Following
                        </span>
                    </a>

                </section>


                {/* ================= PROFILE ACTIONS ================= */}

                <section className="actions">

                    <a
                        className="btn btn--primary"
                        href="/editprofile"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 20h4L19 9l-4-4L4 16z" />
                            <path d="M13 7l4 4" />
                        </svg>

                        Edit profile
                    </a>

                    <button
                        className="icon-btn icon-btn--large"
                        type="button"
                        aria-label="Share profile"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 15V4" />
                            <path d="M8 8l4-4 4 4" />
                            <path d="M5 13v6h14v-6" />
                        </svg>
                    </button>

                </section>


                {/* ================= MY CIRCLES ================= */}

                <section
                    className="circles"
                    aria-label="My circles"
                >

                    <h3 className="section-title">
                        My circles
                    </h3>

                    <div className="circles__list">

                        <div className="circle">
                            <span className="circle__badge circle__badge--green">
                                HC
                            </span>

                            <span className="circle__text">
                                <strong>Hike Crew</strong>
                                <span>6 people</span>
                            </span>
                        </div>

                        <div className="circle">
                            <span className="circle__badge circle__badge--coral">
                                DC
                            </span>

                            <span className="circle__text">
                                <strong>Dinner Club</strong>
                                <span>4 people</span>
                            </span>
                        </div>

                        <div className="circle">
                            <span className="circle__badge circle__badge--purple">
                                FM
                            </span>

                            <span className="circle__text">
                                <strong>Family</strong>
                                <span>8 people</span>
                            </span>
                        </div>

                    </div>

                </section>


                {/* ================= PROFILE TABS ================= */}

                <div
                    className="tabs"
                    role="tablist"
                    aria-label="Profile content"
                >

                    {['Posts', 'Moments', 'Saved'].map((tab) => (

                        <button
                            key={tab}
                            className={`tabs__tab ${
                                activeTab === tab ? 'is-active' : ''
                            }`}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>

                    ))}

                </div>


                {/* ================= USER POSTS ================= */}

                {activeTab === 'Posts' && (

                    // API request chal rahi ho toh loading message show karna
                    loading ? (

                        <p>Loading your posts...</p>

                    ) : error ? (

                        // API fail hone par error message show karna
                        <p>{error}</p>

                    ) : (

                        // API successful hone par posts child component ko bhejna
                        <Post
                            posts={posts}
                            openPostOptions={openPostOptions}
                        />

                    )

                )}


                {/* ================= OTHER TABS ================= */}

                {activeTab === 'Moments' && (
                    <section className="posts">
                        <div className="empty">
                            <strong className="empty__title">
                                No moments yet
                            </strong>
                        </div>
                    </section>
                )}

                {activeTab === 'Saved' && (
                    <section className="posts">
                        <div className="empty">
                            <strong className="empty__title">
                                No saved posts yet
                            </strong>
                        </div>
                    </section>
                )}

            </main>


            {/* ================= BOTTOM NAVIGATION ================= */}

            <nav
                className="tabbar"
                aria-label="Main"
            >

                <a
                    className="tabbar__item"
                    href="/feed"
                    aria-label="Home"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M4 11l8-7 8 7v9H4z" />
                    </svg>
                </a>

                <a
                    className="tabbar__item"
                    href="/circles"
                    aria-label="Circles"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <circle cx="9" cy="9" r="3.5" />
                        <circle cx="17" cy="10" r="2.5" />
                        <path d="M3 19c0-3 3-5 6-5s6 2 6 5M16 14c3 0 5 1.5 5 4" />
                    </svg>
                </a>

                <a
                    className="tabbar__create"
                    href="/create-post"
                    aria-label="Create post"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </a>

                <a
                    className="tabbar__item"
                    href="/notifications"
                    aria-label="Notifications"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z" />
                    </svg>
                </a>

                <a
                    className="tabbar__item tabbar__item--active"
                    href="/profile"
                    aria-label="Profile"
                    aria-current="page"
                >
                    <span className="tabbar__avatar">
                        MR
                    </span>
                    <span className="tabbar__dot"></span>
                </a>

            </nav>


            {/* ================= POST OPTIONS OVERLAY ================= */}

            {selectedPost && !showDeleteConfirm && (

                <>
                    <div
                        className="overlay"
                        onClick={closePostOptions}
                    ></div>

                    <div
                        className="sheet"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Post options"
                    >

                        <span className="sheet__handle"></span>

                        <div className="sheet__head">

                            <span
                                className={`sheet__thumb post--${selectedPost.theme}`}
                            ></span>

                            <span className="sheet__info">
                                <strong>
                                    {selectedPost.title}
                                </strong>

                                <span>
                                    Shared with {selectedPost.circle}
                                </span>
                            </span>

                        </div>

                        <button
                            className="sheet__row"
                            type="button"
                        >
                            Edit caption
                        </button>

                        <button
                            className="sheet__row"
                            type="button"
                        >
                            Change who can see this
                        </button>

                        <button
                            className="sheet__row"
                            type="button"
                        >
                            Save to your collection
                        </button>

                        <button
                            className="sheet__row sheet__row--danger"
                            type="button"
                            onClick={openDeleteConfirm}
                        >
                            Delete post
                        </button>

                        <button
                            className="btn btn--outline"
                            type="button"
                            onClick={closePostOptions}
                        >
                            Cancel
                        </button>

                    </div>
                </>

            )}


            {/* ================= DELETE CONFIRMATION ================= */}

            {showDeleteConfirm && (

                <>
                    <div
                        className="overlay overlay--dark"
                        onClick={closeDeleteConfirm}
                    ></div>

                    <div
                        className="confirm"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="confirm-title"
                        aria-describedby="confirm-text"
                    >

                        <h2
                            className="confirm__title"
                            id="confirm-title"
                        >
                            Delete this post?
                        </h2>

                        <p
                            className="confirm__text"
                            id="confirm-text"
                        >
                            It will be removed for everyone in your circles.
                            This can't be undone.
                        </p>

                        <button
                            className="btn btn--danger"
                            type="button"
                            onClick={handleDeletePost}
                        >
                            Delete post
                        </button>

                        <button
                            className="btn btn--outline"
                            type="button"
                            onClick={closeDeleteConfirm}
                        >
                            Keep post
                        </button>

                    </div>
                </>

            )}


            {/* ================= SUCCESS TOAST ================= */}

            {toast && (

                <div
                    className="toast"
                    role="status"
                >
                    {toast}
                </div>

            )}

        </div>
    )
}

export default Profile
