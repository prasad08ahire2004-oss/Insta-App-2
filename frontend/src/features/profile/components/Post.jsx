import React from 'react'
import '../style/Post.scss'

const Post = ({posts , openPostOptions}) => {
  return (
    <section
    className="posts"
    aria-label="My posts"
    >

        {posts.length > 0 ? (

            <ul className="posts__grid">

                {posts.map((post) => (

                    <li
                    key={post.id}
                    className={`post post--${post.theme}`}
                    data-title={post.title}
                    data-circle={post.circle}
                    >

                        {/* Decorative post background */}
                        <span className="post__sun"></span>
                        <span className="post__ground"></span>

                        {/* Post options button */}
                        <button
                        className="post__menu"
                        type="button"
                        aria-label={`Options for post: ${post.title}`}
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

                <div className="empty">
                    <strong className="empty__title">
                        No posts yet
                    </strong>

                    <span className="empty__text">
                        Share a moment with your circles.
                    </span>
                </div>

            )}

    </section>
  )
}

export default Post
