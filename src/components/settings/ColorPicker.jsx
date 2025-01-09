import React, {useState} from "react";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';


function ColorPicker({data, handleChange}) {

    const [color, setColor] = useState('#ffffff');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const style = {
        color: color
    };

    const pickerStyles = {
        // display: displayColorPicker ? "block" : 'none',
        position: "absolute",
        bottom: "100%",
        left: 0,
        marginBottom: "14px"

    }

    const handleTogglePicker = () => {
        setDisplayColorPicker((prev) => !prev);
    };

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        const result = {
            target : {
                name:  Object.keys(data)[0],
                value: color.hex,
            }
        }
        handleChange(result)
        // setDisplayColorPicker(false);
    };

    const pickerRef = React.useRef(null);

    React.useEffect(() => {
        // close dropdown if click outside
        function close(e) {
            if (!pickerRef.current.contains(e.target)) {
                setDisplayColorPicker(false);
            }
        }
        // add or remove event listener
        if (displayColorPicker) {
            window.addEventListener("click", close);
        }
        // cleanup
        return function removeListener() {
            window.removeEventListener("click", close);
        }
    }, [displayColorPicker]);


    return (

        <div className="color-block">
            <span className="ico icon-t-shirt"  style={style}/>

            <button type="button" className="read-more-btn"  onClick={(event) => {event.stopPropagation(); handleTogglePicker()}}>CHANGE COLOR</button>


            {displayColorPicker ? (
                <div ref={pickerRef} style={pickerStyles}>
                    <Wheel color={color} onChange={handleChangeComplete}/>
                </div>
            ) : null}

        </div>

    )
}

export {ColorPicker}
