import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../style/Hero.scss'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">

        {/* Left Side: Content */}
        <div className="hero__content">

          <span className="hero__badge">
            YOUR WORLD. YOUR COMMUNITY.
          </span>

          <h1 className="hero__title">
            Share Your <span className="text-gradient">Moments.</span>
            Connect With <span className="text-gradient">Your People.</span>
          </h1>

          <p className="hero__description">
            Discover a place where your moments matter. Share photos,
            connect with friends, explore new communities, and stay
            close to the people who inspire you.
          </p>

          <div className="hero__buttons">

            <Link to="/register" className="hero__button hero__button--primary">
              Get Started
              <span>→</span>
            </Link>

            <a href="#features" className="hero__button hero__button--secondary">
              Explore Features
            </a>

          </div>

          {/* Community Proof */}
          <div className="hero__community">

            <div className="hero__avatars">
              <span className="hero__avatar avatar-one">MA</span>
              <span className="hero__avatar avatar-two">NR</span>
              <span className="hero__avatar avatar-three">AV</span>
              <span className="hero__avatar avatar-four">JK</span>
              <span className="hero__avatar avatar-five">SL</span>
            </div>

            <p>
              Join a community built around the moments that matter.
            </p>

          </div>

        </div>

        {/* Right Side: Phone Mockup */}
        <div className="hero__visual">

          <div className="hero__showcase">

            <img
              className="hero__phone"
              src={assets.phoneMockup}
              alt="Connectly social media app displayed on a smartphone"
            />

            {/* Notification Card */}
            <div className="hero__floating hero__notification">
              <span className="hero__notification-icon">♥</span>

              <div>
                <strong>Maya liked your photo</strong>
                <small>2 min ago</small>
              </div>
            </div>

            {/* Likes Card */}
            <div className="hero__floating hero__likes">

              <div className="hero__small-avatars">
                <span className="small-avatar avatar-one"></span>
                <span className="small-avatar avatar-two"></span>
                <span className="small-avatar avatar-three"></span>
              </div>

              <strong>+2.4k</strong>

            </div>

            {/* Profile Card */}
            <div className="hero__floating hero__profile">

              <span className="hero__profile-avatar"></span>

              <div>
                <strong>Noah Rivera</strong>
                <small>New follower</small>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero