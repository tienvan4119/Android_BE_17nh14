const {google} = require('googleapis')

const {OAuth2} = google.auth

const oAuth2Client = new OAuth2("1036915290940-s2ds8oo8cc31ihm4ebkhsm2vb53o7igs.apps.googleusercontent.com", "6X87qhwgkLsdPJbYx18B3JBo")

oAuth2Client.setCredentials({
    refresh_token: '1//04hswM1iCqnWtCgYIARAAGAQSNwF-L9IroWzYq8He5elg6awQAJ3w8KGoinxW42DbLkgejfPuFBlEOojqvE0zg5QvXddvu16Xed0',

})
const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() +45)

const event = {
    summary: 'Meet with David',
    location: '54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt Nam',
    description: 'Demo first version of Android app',
    start: {
        dateTime: eventStartTime,
        timeZone: 'VietNam',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'VietNam'
    },
    colorId: 1,
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'VietNam',
        items: [{id: 'primary'}],
    },
},(err, res)=> {
    if(err)
    {
         return console.error('Free Busy Query Error: ', err)
    }
    const eventsArr = res.data.calendar.primary.busy
    if(eventsArr.length ===0){
        return calendar.events.insert({calendarId:'primary', resource: event},
        err => {
            if(err) return console.error("Calendar Event Creation Error: ", err)

            return console.log("Calendar Event Created.")
        }
        )
    }
}
)