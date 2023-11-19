import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default function TrainingCalendar() {


    // States
    const [trainings, setTrainings] = useState([]);


    // GET-request to fetch all trainings data from API
    const getTrainings = async () => {
        try {
            const res = await axios.get("https://traineeapp.azurewebsites.net/gettrainings");
            const resData = res.data;
            setTrainings(resData);
            console.log(resData);
        }
        catch (err) {
            console.error(err);
        }
    }

    // Map trainings data into events compatible with react-big-calendar
    const events = trainings.map((training) => {

        // Get training start time from 'training.date'
        const startDateTime = new Date(training.date);
        // Calculate training end time by converting 'training.duration' to milliseconds and adding it to start time 
        const endDateTime = new Date(startDateTime.getTime() + training.duration * 60000);

        // Return an event object with required properties
        return {
            id: training.id,
            title: training.activity,
            start: startDateTime,
            end: endDateTime,
            allDay: false
        };
    });

    // useEffect hook to fetch training data when the component mounts
    useEffect(() => {
        getTrainings();
    }, [])


    // Render the Calendar component with defined properties
    return (
        <Calendar
            localizer={momentLocalizer(moment)}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month", "week", "day", "agenda"]}
            style={{ height: 500, }}
        />
    );
}