document.addEventListener('DOMContentLoaded', function() {
    // Sample events data
    const events = [
        { day: 5, month: 1, title: "New Year's Party", link: "events/scout.html" },
        { day: 14, month: 2, title: "Valentine's Day", link: "events/valentines.html" },
        // Add more events here
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    // Set month name
    document.getElementById('month').innerText = months[currentMonth] + " " + currentYear;

    // Set days of the week
    days.forEach(day => {
        const div = document.createElement('div');
        div.innerText = day;
        document.getElementById('days').appendChild(div);
    });

    // Generate calendar dates
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < 42; i++) { // A month max can have 6 weeks
        const div = document.createElement('div');
        if (i >= firstDay && i < lastDate + firstDay) {
            let day = i - firstDay + 1;
            div.innerText = day;
            let event = events.find(e => e.day === day && e.month === currentMonth + 1);
            if(event) {
                div.innerHTML = `<a href="${event.link}">${day} - ${event.title}</a>`;
            }
        }
        document.getElementById('dates').appendChild(div);
    }
});