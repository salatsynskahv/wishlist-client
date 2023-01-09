import React from 'react';


const Planner = () => {
    const currentDate = new Date();
    console.log("currentDate: " + currentDate);
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
        <div className="container">
            <input type="date" id="start" name="trip-start"
                   min="2018-01-01"
                   max="2018-12-31"/>
            <div id="calendar-main">
                {
                    daysOfWeek.map(item => {
                        return <div> {item} </div>;
                    })
                }

            </div>
        </div>)
}

export default Planner;