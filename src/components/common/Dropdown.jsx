import React from "react";
import { findObjectByKeyValue } from '../utils.js';

const TeamDropdown = React.forwardRef(({ props, activeItemId = 0, setId }, ref) => {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    // Используем activeItemId как начальное значение для состояния activeId
    const [activeId, setActiveId] = React.useState(activeItemId === 0 ? props[0].id : activeItemId);

    React.useImperativeHandle(ref, () => ({
        clear: () => {
            setActiveId(props[0].id);
        },
    }));

    // click listeners for closing dropdown
    React.useEffect(() => {
        // close dropdown if click outside
        function close(e) {
            if (!dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        // add or remove event listener
        if (open) {
            window.addEventListener("click", close);
        }
        // cleanup
        return function removeListener() {
            window.removeEventListener("click", close);
        }
    }, [open]);

    const listItems = props.map(function (item) {
        return (
            <li key={item.id} onClick={() => {setActiveId(item.id); if (setId) {setId(item.id)}}} className={item.id === activeId ? 'active' : ''}>
                <div className="value">
                    {item.title}
                </div>
                {item.properties ?
                    <div className="descr">
                        <span className="good">Good against:</span>{item.properties.advantages} <br/>
                        <span className="bad">Bad against:</span>{item.properties.flaws}
                    </div>
                    : ''}
            </li>
        )
    });

    return (
        <div className="drop-block">
            <div className={open ? "c-custom-drop active" : "c-custom-drop"}>

                <div ref={dropdownRef} className="current" onClick={() => setOpen(true)}>
                    {findObjectByKeyValue(props, 'id', activeId).title}
                </div>

                <ul className="drop-list">
                    {listItems}
                </ul>

            </div>
        </div>
    )
});

export {TeamDropdown};