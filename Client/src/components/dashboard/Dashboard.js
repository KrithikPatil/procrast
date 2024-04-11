import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import Tnavbar from '../timermain/Tnavbar';

const Dashboard = () => {
    const [completedToday, setCompletedToday] = useState(0);
    const [completedPastWeek, setCompletedPastWeek] = useState([]);
    const [todayEvent, setTodayEvent] = useState(0);

    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8000/get-event')
            .then(response => response.json())
            .then(data => {
                const today = new Date();
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const todayEnd = new Date(todayStart);
                todayEnd.setHours(23, 59, 59, 999);

                const completedTodayCount = data.filter(event => {
                    const eventDate = new Date(event.start);
                    return event.completed && eventDate >= todayStart && eventDate <= todayEnd;
                }).length;
                setCompletedToday(completedTodayCount);

                const todayEventCount = data.filter(event => {
                    const eventDate = new Date(event.start);
                    return eventDate >= todayStart && eventDate <= todayEnd;
                }).length;
                setTodayEvent(todayEventCount);

                const pastWeekDates = [];
                const pastWeekCompletedCounts = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    pastWeekDates.push(date.toDateString());
                    const completedCount = data.filter(event => {
                        const eventDate = new Date(event.start);
                        return event.completed && eventDate.toDateString() === date.toDateString();
                    }).length;
                    pastWeekCompletedCounts.push(completedCount);
                }
                setCompletedPastWeek(pastWeekCompletedCounts);

                // Create charts
                createCharts(completedTodayCount, pastWeekCompletedCounts, todayEventCount);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const createCharts = (completedTodayCount, pastWeekCompletedCounts, todayEventCount) => {
        destroyChartInstances();

        const pieCtx = pieChartRef.current.getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Completed', 'Not Completed'],
                datasets: [{
                    data: [(completedTodayCount / todayEventCount) * 100, 100 - (completedTodayCount / todayEventCount) * 100],
                    backgroundColor: ['green', 'red']
                }]
            }
        });

        const barCtx = barChartRef.current.getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Completed'],
                datasets: [{
                    label: 'Completed Today',
                    data: [completedTodayCount],
                    backgroundColor: 'green'
                }]
            }
        });

        const lineCtx = lineChartRef.current.getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                datasets: [{
                    label: 'Completed Past Week',
                    data: pastWeekCompletedCounts,
                    borderColor: 'blue',
                    fill: false
                }]
            }
        });
    };

    const destroyChartInstances = () => {
        [pieChartRef, barChartRef, lineChartRef].forEach(ref => {
            if (ref.current && ref.current.chart) {
                ref.current.chart.destroy();
            }
        });
    };

    return (
        <div>
        <Tnavbar />
        <div className='dash'>
            <div className='pie-chart'>
                <canvas ref={pieChartRef} width="400" height="400"></canvas>
            </div>
            <div className='bar-graph'>
                <canvas ref={barChartRef} width="400" height="400"></canvas>
            </div>
            <div className='line-chart'>
                <canvas ref={lineChartRef} width="400" height="400"></canvas>
            </div>
        </div>
        </div>
        
    );
}

export default Dashboard;
