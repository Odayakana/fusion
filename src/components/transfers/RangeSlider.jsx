import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { findObjectByKeyValue } from '../utils.js';


const RangeSlider = React.forwardRef(({ min, max, sendMinMax }, ref) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    React.useImperativeHandle(ref, () => ({
        clear: () => {
            setMinVal(min);
            setMaxVal(max);
            minValRef.current = min;
            maxValRef.current = max;
        },
    }));


    function shortNums (num) {
        if (num >= 1000000) {
            // Если число больше или равно миллиону, делим на 1 миллион и округляем
            return Math.round(num / 1000000) + 'm';
        } else if (num >= 1000) {
            // Если число больше или равно тысяче, делим на 1000 и округляем
            return Math.round(num / 1000) + 'k';
        } else {
            // Если число меньше 1000, просто возвращаем его в виде строки
            return num.toString();
        }
    }

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    // useEffect(() => {
    // }, [minVal, maxVal, onChange]);

    return (
        <div className="range-slider-container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                onMouseUp={() => {
                    sendMinMax(minVal, maxVal);
                }}
                onTouchEnd={() => {
                    sendMinMax(minVal, maxVal);
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                onMouseUp={() => {
                    sendMinMax(minVal, maxVal);
                }}
                onTouchEnd={() => {
                    sendMinMax(minVal, maxVal);
                }}
                className="thumb thumb--right"
            />

            <div className="range-slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">{shortNums(minVal)}</div>
                <div className="slider__right-value">{shortNums(maxVal)}</div>
            </div>
        </div>
    );

});

RangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};

export {RangeSlider}
