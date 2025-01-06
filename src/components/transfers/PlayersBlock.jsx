import React from "react";
import Flag from 'react-world-flags'

import {Link} from "react-router-dom";
import playersInfo from "../../json-data/players-market.json";


function PlayersBlock({players, fields, unsignable = false}) {

    const [sortBy, setSortBy] = React.useState('id');
    const [sortType, setSortType] = React.useState('desc');

    function sortArrayByKey(array, key, order = 'desc') {
        return array.sort((a, b) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    const sortedPlayers = sortArrayByKey(players, sortBy, sortType);

    function handleSort(key) {
        if (sortBy === key) {
            setSortType((sortType === 'asc') ? 'desc' : 'asc');
        } else {
            setSortType('desc')
            setSortBy(key)
        }
    }

    function numToPrice (num, currency) {
        if (num >= 1000000) {
            // Если число больше или равно миллиону, делим на 1 миллион и округляем
            return currency + Math.round(num / 1000000) + 'm';
        } else if (num >= 1000) {
            // Если число больше или равно тысяче, делим на 1000 и округляем
            return currency + Math.round(num / 1000) + 'k';
        } else {
            // Если число меньше 1000, просто возвращаем его в виде строки
            return currency + num.toString();
        }
    }

    const additionalClass = (key) => {
        if (key === 'nationality') {
            return 'country-col'
        }
        if (key === 'position') {
            return 'pos-col'
        }
        if (key === 'name') {
            return 'title-col'
        }
        return ''
    }



    const offerItems = sortedPlayers.map(function (item) {

        const unsignButton = () => {
            if (unsignable) {
                return (
                    <button className="unsign-btn ico icon-r-b-cross" />
                )
            }
            return (
                ''
            )

        }

        return (
            <div key={item.id} className="row pos-col">
                {Object.entries(fields).map(([key, value]) => {

                    const itemVal = () => {
                        if (key === 'value' || key === 'signedFor' || key === 'myOffer') {
                            return numToPrice(item[key], "€")
                        }
                        if (key === 'nationality') {
                            return (
                                <div className="image">
                                    <Flag code={ item[key] }  fallback={ item[key] }/>
                                </div>
                            )
                        }
                        return item[key]
                    }


                    return (
                        <div key={key} className={`col ${additionalClass(key)}`}>
                            {itemVal()}
                        </div>
                    )

                })}

                <div key={'ctrls-column'} className="col ctrls-col">
                    <Link to={`/player/${item.slug}`} className="ico icon-tip" />
                    {unsignButton()}
                </div>
            </div>
        )
    });


    return (

        <div className="players-list">

            <div className="row head-row">
                {Object.entries(fields).map(([key, value], index) => (
                    <div key={index} className={`col ${additionalClass(key)}`}>
                        <button type="button" className={`sort-btn ${key === sortBy ? sortType : ''}`}
                                onClick={() => {handleSort(key)}}
                        >
                            {value}
                        </button>
                    </div>
                ))}
                <div key={'ctrls-column'} className="col ctrls-col" />
            </div>

            {offerItems}

        </div>
    )
}

export {PlayersBlock}
