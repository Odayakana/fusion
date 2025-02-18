import React, { useState, useRef } from 'react';
import {useParams, Link} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import 'swiper/swiper-bundle.css';

function PlayersSlider({props}) {

    console.log(props);



    const slides = props.map(function (slide, index) {
        return (
            <SwiperSlide key={index}>
                <div className="swiper-slide">
                    <div className="slider-content">
                        <div className="player-title-block">
                            <img src="/src/assets/flag.png" alt="#"/>
                            <div className="pos">
                                {slide.position}
                            </div>
                            <h5>
                                {slide.name}
                            </h5>
                            <Link to={`/player/${slide.slug}`}>
                                <span className="ico icon-tip" />
                            </Link>
                        </div>

                        <div className="player-stats">
                            <div className="info-col">
                                <div className="title">
                                    Games
                                </div>
                                <div className="val">
                                    {slide.games}
                                </div>
                            </div>
                            <div className="info-col">
                                <div className="title">
                                    Goals
                                </div>
                                <div className="val">
                                    {slide.goals}
                                </div>
                            </div>
                            <div className="info-col">
                                <div className="title">
                                    Assists
                                </div>
                                <div className="val">
                                    {slide.assists}
                                </div>
                            </div>
                            <div className="info-col">
                                <div className="title">
                                    Rating
                                </div>
                                <div className="val">
                                    {slide.rating}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </SwiperSlide>
        )

    })

    const swiperRef = useRef(null);
    const goToNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext(); // Переключаемся на следующий слайд
        }
    };

    const goToPrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev(); // Переключаемся на предыдущий слайд
        }
    };

    const [dateInputValue, setDateInputValue] = useState('');

    const handleDateInputChange = (event) => {
        setDateInputValue(event.target.value);
    };

    const params = {
        simulateTouch: false,
        shortSwipes: true,
        speed: 400,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 14,
        pagination: true
    };

    return (
        <div className="players-slider">
            <Swiper {...params} ref={swiperRef} pagination={{clickable: true}} modules={[Pagination]}>
                {slides}
            </Swiper>
        </div>

    );
}

export {PlayersSlider};