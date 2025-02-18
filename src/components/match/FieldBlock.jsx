import React, {useState, useEffect, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd'
import { findObjectByKeyValue } from '../utils.js';


import imgField from "/src/assets/field.svg"


function FieldBlock({formationInfo, teamPlayers, color}) {

    const topGap = 15;
    const numOfRows = 6.1;
    const columnGap = 10;
    const rowHeight = (100 - topGap) / numOfRows;

    const positions = formationInfo.positions;


    const fieldRef = useRef(null);
    const [fieldWidth, setFieldWidth] = useState(0);
    const [display, setDisplay] = useState('none');

    useEffect(() => {

        const element = fieldRef.current;

        const updateWidth = () => {
            if (element) {
                setFieldWidth(element.offsetWidth);
                setDisplay('block');
            }
        };

        // Получаем начальную ширину элемента
        updateWidth();

        // Создаём наблюдателя за размерами
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(element);

        // Очистка при размонтировании
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const players = positions.map(function (position, index) {

        const effectiveCols = position.cols === "5" ? 5 : 4;
        const playerWidth = (fieldWidth - columnGap*(effectiveCols + 1))/effectiveCols;
        const columnWidth = 100 / position.cols;
        const leftPos = columnWidth*position.col - columnWidth/2;
        const topPos = topGap + rowHeight*(position.row - 1);
        const itemMargin = `0 0 0 -${playerWidth/2}px`;

        const fontSize = playerWidth / 2;

        const playerInfo = findObjectByKeyValue(teamPlayers, 'formationPlaceId', position.id);

        const styles = {
            left: leftPos + '%',
            width: playerWidth + 'px',
            top: topPos + '%',
            margin: itemMargin,
            display: display
        }
        const stylesIcon = {
            fontSize: fontSize + 'px',
            color: color
        }

        return (
            <div key={position.id} className={"player-place-item"}
                 style={styles}
            >
                <div className="icon">
                    <span style={stylesIcon} className="player-ico icon-t-shirt" />
                </div>
                <div className="descr-block">
                    <div className="name">{playerInfo.name}</div>
                </div>

            </div>
        )
    });

    return (
        <div className="field-container">
            <img src={imgField} alt="field"/>


            <div ref={fieldRef} className="players-places">
                {players}
            </div>

        </div>

  )
}

export {FieldBlock}
