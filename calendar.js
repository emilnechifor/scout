document.addEventListener('DOMContentLoaded', function() {
    // Sample events data
    const events = [
        { day: 5, month: 11, title: "Sortie Scout", link: "events/scout.html" },
        { day: 14, month: 11, title: "Test", link: "events/louveteaux.html" },
        // Add more events here
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

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
    const firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < 42; i++) {
        const div = document.createElement('div');
        if (i >= firstDay && i < lastDate + firstDay) {
            let day = i - firstDay + 1;
            div.innerText = day;
            let event = events.find(e => e.day === day && e.month === currentMonth + 1);
            if(event) {
                div.innerHTML = `<a href="${event.link}">${day} - ${event.title}</a>`;
                div.classList.add('event-day'); // Add a class for styling
            }
        }
        document.getElementById('dates').appendChild(div);
    }
});