import React from 'react'
import '../style/Features.scss'

const Features = () => {
    return (
        <section className="features" id="features">

            <div className="features__container">

                {/* Section Heading */}
                <div className="features__header">
                    <h2>Everything You Need to Stay Connected</h2>

                    <p>
                        Express yourself, discover new perspectives,
                        and build meaningful connections.
                    </p>
                </div>


                {/* Features Cards */}
                <div className="features__grid">

                    {/* Card 1 */}
                    <div className="feature-card">

                        <div className="feature-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </div>

                        <h3 className="feature-card__title">
                            Share Your Moments
                        </h3>

                        <p className="feature-card__text">
                            Capture your favorite moments and share photos
                            with your friends and community.
                        </p>

                    </div>


                    {/* Card 2 */}
                    <div className="feature-card feature-card--pink">

                        <div className="feature-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>

                        <h3 className="feature-card__title">
                            Connect With Friends
                        </h3>

                        <p className="feature-card__text">
                            Follow the people you care about and stay
                            connected with their latest updates.
                        </p>

                    </div>


                    {/* Card 3 */}
                    <div className="feature-card feature-card--orange">

                        <div className="feature-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                            </svg>
                        </div>

                        <h3 className="feature-card__title">
                            Discover New Content
                        </h3>

                        <p className="feature-card__text">
                            Explore interesting posts, discover new creators,
                            and find content that inspires you.
                        </p>

                    </div>


                    {/* Card 4 */}
                    <div className="feature-card">

                        <div className="feature-card__icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>

                        <h3 className="feature-card__title">
                            Engage With Your Community
                        </h3>

                        <p className="feature-card__text">
                            Like posts, leave comments, and interact with
                            people who share your interests.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Features