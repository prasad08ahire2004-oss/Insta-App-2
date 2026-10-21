import React from 'react'
import '../styles/Post.scss'

const Post = (props) => {

    return (
        <article className="post">

            {/* Post Header */}
            <header className="post-header">

                <a href="/profile" className="post-author">

                    <span className="post-avatar">
                        {props.avatar}
                    </span>

                    <span className="post-who">

                        <strong>{props.username}</strong>

                        <small>{props.location}</small>

                    </span>

                </a>

                <time className="post-time">
                    {props.time}
                </time>

            </header>


            {/* Post Image */}
            <div className="post-photo">

                <img
                    src={props.image}
                    alt={props.imageAlt}
                    loading="lazy"
                />

            </div>


            {/* Post Actions */}
            <div className="post-actions">

                <div className="post-action-group">

                    {/* Like Button */}
                    <button
                        type="button"
                        className={`icon-btn ${props.liked ? 'liked' : ''}`}
                        aria-label={props.liked ? 'Unlike' : 'Like'}
                    >

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={props.liked ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>

                    </button>


                    {/* Comment Button */}
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label="Comment"
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
                        >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>

                    </button>


                    {/* Share Button */}
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label="Share"
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
                        >
                            <line x1="22" y1="2" x2="11" y2="13" />

                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>

                    </button>

                </div>


                {/* Save Button */}
                <button
                    type="button"
                    className="icon-btn"
                    aria-label="Save"
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
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>

                </button>

            </div>


            {/* Post Details */}
            <div className="post-body">

                <strong>{props.likes} likes</strong>

                <p>
                    <strong>{props.username}</strong>{' '}
                    {props.caption}
                </p>

                <button
                    type="button"
                    className="post-comments"
                >
                    View all {props.comments} comments
                </button>

            </div>

        </article>
    )
}

export default Post