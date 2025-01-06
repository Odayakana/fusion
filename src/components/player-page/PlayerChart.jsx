import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    RadialLinearScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);


const PlayerChart = ({props}) => {

    const playerStats = props[0];

    const dataLabels = [
        'Defencive awareness',
        'Ball winning',
        'Passing',
        'Creativity',
        'Finishing',
        'Grossing',
        'Dribbling',
        'Aerial ability'
    ]

    const dataStats = [
        playerStats['Defencive awareness'],
        playerStats['Ball winning ability'],
        playerStats['Passing'],
        playerStats['Creativity'],
        playerStats['Finishing'],
        playerStats['Grossing'],
        playerStats['Dribbling'],
        playerStats['Aerial ability']
    ]


    const data = {
        labels: dataLabels,
        datasets: [
            {
                label: '',
                data: dataStats,
                fill: true,
                backgroundColor: 'rgba(123, 250, 198, 0.2)',
                borderColor: 'rgb(123, 250, 198)',
                pointBackgroundColor: 'rgb(123, 250, 198)',
                pointBorderColor: 'rgb(123, 250, 198)',
                pointHoverBackgroundColor: 'rgb(123, 250, 198)',
                pointBorderWidth: 1,
                // spanGaps: false
            },
        ],
    };

    const options = {

        plugins: {
            legend: {
                display: false,
                labels: {
                    fontSize: 0
                }
            },
        },

        scales: {
            y: {
                display: false
            },
            r: {
                suggestedMax: 100,
                suggestedMin: 0,
                angleLines: {
                    color: '#ffffff'
                },
                grid: {
                    color: '#ffffff',
                    circular: true
                },
                pointLabels: {
                    color: '#ffffff',
                    font: {
                        size: 12
                    }

                },
                ticks: { // сетка
                    stepSize: 20,
                    color: '#ffffff',
                    backdropColor: '#121529',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return <Radar data={data} options={options} />;
};

export {PlayerChart}
