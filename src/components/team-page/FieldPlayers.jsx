import React, {useState, useEffect, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd'
import { ItemTypes } from './itemTypes.js';
import { findObjectByKeyValue } from '../utils.js';

import playerIco from "../../../src/assets/player.svg"

function FieldPlayers({props, activePlayers, removePlayer, touchPlayer, touchedPlayer, updatePlayerInfo}) {

    const topGap = 3;
    const numOfRows = 6.1;
    const columnGap = 10;
    const rowHeight = (100 - topGap) / numOfRows;

    const positions = props.positions;

    const fieldRef = useRef(null);
    const [fieldWidth, setFieldWidth] = useState(0);
    const [opacity, setOpacity] = useState('none');
    const [Custom, setCustom] = useState(false);

    useEffect(() => {

        const element = fieldRef.current;

        const updateWidth = () => {
            if (element) {
                setFieldWidth(element.offsetWidth);
                setOpacity('block');
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

        const playerInfo = findObjectByKeyValue(activePlayers, 'id', index).player_info;
        const activeClass = playerInfo? " active " : "";
        const touchedClass = playerInfo && touchedPlayer && touchedPlayer.id === playerInfo.id ? " touched " : ""

        const [{ canDrop, isOver }, drop] = useDrop(() => ({
            accept: [ItemTypes.LIST_PLAYER, ItemTypes.FIELD_PLAYER],
            // drop: () => ({ name: index }),
            drop: (item, monitor) => {
                console.log();
                updatePlayerInfo(index, item.player_info);
                setCustom(!Custom)
            },
            // collect: (monitor) => ({
            //     isOver: monitor.isOver(),
            //     canDrop: monitor.canDrop(),
            // }),
        }))
        const ref = useRef(null)

        // const draggable = !!playerInfo;

        // const [{isDragging}, drag] = useDrag(() => ({
        //     type: ItemTypes.FIELD_PLAYER,
        //     canDrag: draggable,
        //     item: {player_info: playerInfo},
        // }),[draggable])
        //
        // drag(drop(ref))

        React.useEffect(() => {
            // close dropdown if click outside
            function close(e) {
                touchPlayer(null);
            }
            // add or remove event listener
            if (touchedPlayer) {
                window.addEventListener("click", close);
            }
            // cleanup
            return function removeListener() {
                window.removeEventListener("click", close);
            }


        }, [touchedPlayer]);

        const handleTouch = (event, obj) => {

            if (touchedPlayer) {
                updatePlayerInfo(index);

            } else {
                if (obj) {
                    event.stopPropagation();
                    touchPlayer(obj);

                }
            }

        };



        return (
            <div ref={drop} key={index} className={"player-place-item placed " + activeClass + touchedClass}
                 style={{left: leftPos + '%', width: playerWidth + 'px', top: topPos + '%', margin: itemMargin, display: opacity}}
                 onDrop={(event) => {event.preventDefault()}}
                 onClick={(event) => {handleTouch(event, playerInfo)}}

            >
                <div className="icon">
                    <img src={playerIco} alt="player icon"/>
                </div>
                <div className="descr-block">
                    <button type="button" className="pp-clear-btn" onClick={(event) => {event.stopPropagation(); removePlayer(playerInfo.id);  }}/>
                    <div className="name name_field">
                        {playerInfo? playerInfo.name : ''}
                    </div>
                    <div className="position">
                        <div className="score_val score_field">
                            {playerInfo? playerInfo.rating : ''}
                        </div>
                        <div className="pos_val">
                            {position.position}
                        </div>
                    </div>

                </div>

            </div>
        )
    });

    return (
      <div ref={fieldRef} id="player_places" className="players-places">
          {players}
      </div>
  )
}

export {FieldPlayers}
