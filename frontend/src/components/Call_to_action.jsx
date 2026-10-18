import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Call_to_action.scss'

const Call_to_action = () => {
    return (
        <section className="cta">

            <div className="cta__box">

                {/* Heading */}
                <h2 className="cta__title">
                    Ready to Share Your World?
                </h2>


                {/* Description */}
                <p className="cta__text">
                    Join the community, share your favorite moments,
                    and start building meaningful connections.
                </p>


                {/* Buttons and Login Link */}
                <div className="cta__actions">

                    <Link to="/register" className="cta__button">
                        Create Your Account
                    </Link>

                    <p className="cta__login">
                        Already have an account?{' '}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </section>
    )
}

export default Call_to_action