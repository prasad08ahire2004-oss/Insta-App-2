import React from 'react'

import '../style/Post.scss'

const Post = ({ posts, openPostOptions }) => {

    return (

        // Profile par logged-in user ki posts show karna
        <section
            className="posts"
            aria-label="My posts"
        >

            {/* Check karna ki user ki posts available hain ya nahi */}
            {posts.length > 0 ? (

                // Posts ko grid format mein display karna
                <ul className="posts__grid">

                    {/* Har post ke liye ek card create karna */}
                    {posts.map((post) => (

                        <li
                            key={post._id}
                            className="post"
                        >

                            {/* MongoDB mein stored ImageKit URL se image show karna */}
                            <img
                                className="post__image"
                                src={post.imgUrl}
                                alt={post.caption || 'User post'}
                                loading="lazy"
                            />

                            {/* Three dots button se selected post ka options menu open karna */}
                            <button
                                className="post__menu"
                                type="button"
                                aria-label="Post options"
                                onClick={() => openPostOptions(post)}
                            >

                                <span className="post__dots">
                                    ···
                                </span>

                            </button>

                        </li>

                    ))}

                </ul>

            ) : (

                // Agar user ne abhi tak koi post create nahi ki
                <div className="empty">

                    <strong className="empty__title">
                        No posts yet
                    </strong>

                    <span className="empty__text">
                        Share your first post with your friends.
                    </span>

                </div>

            )}

        </section>
    )
}

export default Post