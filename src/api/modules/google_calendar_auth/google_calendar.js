const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/drive'];
const calendar = google.calendar({version : "v3"});


const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES,
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+14:00';


const dateTimeForCalander = (timeStart_string, timeEnd_string) => {
    let timeStart = new Date(timeStart_string)
    let timeEnd = new Date(timeEnd_string)
    let year = timeStart.getFullYear();
    console.log(year)
    let month = timeStart.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = timeStart.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = timeStart.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = timeStart.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    
    let yearEnd = timeEnd.getFullYear();
    console.log(year)
    let monthEnd = timeEnd.getMonth() + 1;
    if (monthEnd < 10) {
        monthEnd = `0${monthEnd}`;
    }
    let dayEnd = timeEnd.getDate();
    if (dayEnd < 10) {
        dayEnd = `0${dayEnd}`;
    }
    let hourEnd = timeEnd.getHours();
    if (hourEnd < 10) {
        hourEnd = `0${hourEnd}`;
    }
    let minuteEnd = timeEnd.getMinutes();
    if (minuteEnd < 10) {
        minuteEnd = `0${minuteEnd}`;
    }

    let newTimeEnd = `${yearEnd}-${monthEnd}-${dayEnd}T${hourEnd}:${minuteEnd}:00.000${TIMEOFFSET}`;

    let event2 = new Date(Date.parse(newTimeEnd));

    let endDate = event2;

    return {
        'start': startDate,
        'end': endDate
    }
    
};

console.log(typeof(timeStart))
let eventFromCalendar = {
    'summary' : `DEADLINE`,
    'description' : `CNPM`,
    'timeStart' : timeStart,
    'timeEnd' : timeEnd
}

let dateTime = dateTimeForCalander(eventFromCalendar['timeStart'], eventFromCalendar['timeEnd']);

// Event for Google Calendar
let event = {
    'summary': eventFromCalendar['summary'],
    'description': eventFromCalendar['description'],
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Ho_Chi_Minh'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Ho_Chi_Minh'
    },
};

// console.log(dateTimeForCalander())
// Insert new event to Google Calendar
const insertEvent = async (event) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

calendar.events.insert({
    auth:auth,
    calendarId: "primary",
    resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink)
})


insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Get all the events between two dates
// const getEvents = async (dateTimeStart, dateTimeEnd) => {

//     try {
//         let response = await calendar.events.list({
//             auth: auth,
//             calendarId: calendarId,
//             timeMin: dateTimeStart,
//             timeMax: dateTimeEnd,
//             timeZone: 'Asia/Ho_Chi_Minh'
//         });
    
//         let items = response['data']['items'];
//         return items;
//     } catch (error) {
//         console.log(`Error at getEvents --> ${error}`);
//         return 0;
//     }
// };

// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
// const deleteEvent = async (eventId) => {

//     try {
//         let response = await calendar.events.delete({
//             auth: auth,
//             calendarId: calendarId,
//             eventId: eventId
//         });

//         if (response.data === '') {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at deleteEvent --> ${error}`);
//         return 0;
//     }
// };

// let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });