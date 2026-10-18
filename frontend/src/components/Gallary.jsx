import React from 'react'
import '../style/Gallary.scss'

const Gallary = () => {
    return (
        <section className="gallery" id="gallery">

            <div className="gallery__container">

                {/* Section Heading */}
                <div className="gallery__header">

                    <h2>Every Moment Has a Story</h2>

                    <p>
                        From everyday memories to unforgettable adventures,
                        discover the moments that bring people together.
                    </p>

                </div>


                {/* Gallery Images */}
                <div className="gallery__grid">

                    {/* Travel Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="Travel moment: planning the next adventure"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Travel
                        </span>

                    </div>


                    {/* Friends Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="Friends laughing together outdoors"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Friends
                        </span>

                    </div>


                    {/* Nature Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="Sunlight streaming through a green forest"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Nature
                        </span>

                    </div>


                    {/* Food Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="A beautifully plated meal"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Food
                        </span>

                    </div>


                    {/* Lifestyle Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="A calm everyday lifestyle moment"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Lifestyle
                        </span>

                    </div>


                    {/* Photography Image */}
                    <div className="gallery-item">

                        <img
                            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&h=750&q=75"
                            alt="A vintage camera ready for the next shot"
                            width="600"
                            height="750"
                            loading="lazy"
                        />

                        <span className="gallery-item__label">
                            Photography
                        </span>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Gallary