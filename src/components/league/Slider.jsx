import React, { useState, useRef } from 'react';
import {useParams, Link} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import 'swiper/swiper-bundle.css';

function CalendarSlider({}) {

    const days = [
        {"id" : 0, "title" : "Wednesday", "data" : "Oct 1"},
        {"id" : 1, "title" : "Saturday", "data" : "Oct 2"},
        {"id" : 2, "title" : "Wednesday", "data" : "Oct 3"},
        {"id" : 3, "title" : "Sunday", "data" : "Oct 4"},
        {"id" : 4, "title" : "Tuesday", "data" : "Oct 5"},
        {"id" : 5, "title" : "Sunday", "data" : "Oct 6"},
        {"id" : 6, "title" : "Saturday", "data" : "Oct 7"},
        {"id" : 7, "title" : "Wednesday", "data" : "Oct 3"},
        {"id" : 8, "title" : "Sunday", "data" : "Oct 4"},
        {"id" : 9, "title" : "Tuesday", "data" : "Oct 5"},
        {"id" : 10, "title" : "Sunday", "data" : "Oct 6"},
        {"id" : 11, "title" : "Saturday", "data" : "Oct 7"}
    ]

    const slides = days.map(function (slide, index) {
        return (
            <SwiperSlide key={index}>
                <div className="swiper-slide">
                    <Link to={`#`} className="slider-content">
                        <div className="day">
                            {slide.title}
                        </div>
                        <div className="date">
                            {slide.data}
                        </div>
                    </Link>
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
        slidesPerView: 3,
        spaceBetween: 14,
        breakpoints: {
            768: {
                slidesPerView: 6,
            },
            1140: {
                slidesPerView: 8,
            }
        }

    };

    return (
        <div className="days-slider">
            <Swiper {...params} ref={swiperRef}>
                {slides}
            </Swiper>

            <div className="slider-ctrls">
                <div className="calendar-col">
                    <label htmlFor="date_input" className="calendar-btn icon-calendar" />
                    <input
                        id="date_input"
                        type="text"
                        placeholder="MM.DD.YYYY"
                        value={dateInputValue}
                        onChange={handleDateInputChange}
                    />
                </div>
                <div className="slider-nav">
                    <div className="nav-btn prev icon-arrow-left"
                         onClick={() => {goToPrevSlide()}}
                    />
                    <div className="nav-btn next icon-arrow-right"
                         onClick={() => {goToNextSlide()}}
                    />
                </div>
            </div>
        </div>

    );
}

export {CalendarSlider};