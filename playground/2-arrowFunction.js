
const event = {
    name: 'Party',
    attendees: ['muthu', 'raji', 'vaishu', 'varshini'],
    printAttendess() {
        console.log('Following attendees for ' + this.name)
        this.attendees.forEach((attendee) => {
            console.log(this.attendee + ' is attending ' + this.name)
        })
    }
}

event.printAttendess()