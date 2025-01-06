import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import {Popup} from "../common/Popup.jsx";


function TransferFlowPopup({info, popEvent, setPopEvent, popOpen, closePopup, handleSubmit, handleBoost}) {

    const boostOptions = [
        { value: '2', label: '+5m € - 2$' },
        { value: '3', label: '10m € - 3$' },
        { value: '4', label: '20m € - 4$' },
    ]


    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    let popupContent;

    const BoostOptions = boostOptions.map((item, index) => {
        return (
            <div className="checkbox-block form-group round" key={index}>
                <input
                    type="radio"
                    id={`user_option_${index}`} // ensure unique IDs
                    name="user_options" // all radio buttons in the same group
                    value={item.value} // use item value for the radio option
                    checked={selectedOption === item.value} // controlled input
                    onChange={handleChange} // handle change event
                />
                <label htmlFor={`user_option_${index}`}>
                    {item.label} {/* Assuming item has a label property */}
                </label>
            </div>
        );
    });

    switch (popEvent) {
        case 'submit':

            if (info.transferBudget < info.remainingBudget) {
                popupContent = (
                    <Popup popOpen={popOpen} close={closePopup}>
                        <h3>
                            INSUFFICIENT FUNDS
                        </h3>

                        <div className="offer-description text-center">
                            You don’t have enough transfer budget to complete this transfer.
                        </div>

                        <div className="buttons-block">
                            <button
                                type="submit"
                                className="submit-btn trans-btn white"
                                onClick={() => {closePopup()}}
                            >
                                CLOSE
                            </button>

                            {!info.boosted && (
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    onClick={() => { setPopEvent('boost') }}
                                >
                                    BOOST
                                </button>
                            )}

                        </div>
                    </Popup>
                );
                break;
            }
            if (info.squadSize < 22) {
                popupContent = (
                    <Popup popOpen={popOpen} close={closePopup}>
                        <h3>
                            NOT ENOUGH PLAYERS
                        </h3>

                        <div className="offer-description text-center">
                            Your squad must have at least 22 players.
                        </div>

                        <div className="buttons-block">
                            <button
                                type="submit"
                                className="submit-btn trans-btn white"
                                onClick={() => {closePopup()}}
                            >
                                CLOSE
                            </button>
                        </div>
                    </Popup>
                );
                break;
            }

            popupContent = (
                <Popup popOpen={popOpen} close={closePopup}>
                    <h3>
                        FINISH TRANSFERS
                    </h3>

                    <div className="offer-description text-center">
                        Are you sure that you have completed all of your transfers? You will not be able to buy or sell players until the next transfer window.
                    </div>

                    <div className="buttons-block">
                        <button
                            type="submit"
                            className="submit-btn trans-btn white"
                            onClick={() => {closePopup()}}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="submit-btn submit_offer_btn"
                            onClick={() => {handleSubmit()}}

                        >
                            FINISH
                        </button>
                    </div>
                </Popup>
            );
            break;
        case 'boost':
            popupContent = (
                <Popup popOpen={popOpen} close={closePopup}>
                    <h3>
                        BOOST TRANSFER BUDGET
                    </h3>

                    <div className="boost-options">
                        {BoostOptions}
                    </div>

                    <div className="buttons-block">
                        <button
                            type="submit"
                            className="submit-btn trans-btn white"
                            onClick={() => {closePopup()}}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="submit-btn submit_offer_btn"
                            onClick={() => {handleBoost(selectedOption)}}
                        >
                            CONFIRM
                        </button>
                    </div>
                </Popup>
            );
            break;
        default:
            popupContent = '';
    }
    return popupContent; // Возвращаем значение, которое мы хотим присвоить константе
}

export {TransferFlowPopup}
