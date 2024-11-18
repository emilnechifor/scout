document.addEventListener('DOMContentLoaded', function() {
    // Events List
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const events = [
        { day: 5, month: 11, endDay: 6, title: "Sortie Scout", link: "events2024/scout-day.html" },
        { day: 14, month: 11, title: "Test", link: "events2024/louveteaux-day.html" },
        // Add more events here
    ];
    const yearevents = [
        { yeareventmonth: 11, monthstartDay: 3, montheventtitle: "Sortie Scout", link: "events2024/scout-03_nov.html" },
        { yeareventmonth: 11, monthstartDay: 9, monthendDay: 10, montheventtitle: "Saint-Valentin", link: "events/valentines.html" },
        // Add more events here
    ];
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

            // Check for events that start on this day or continue from previous days
            let event = events.find(e => (e.day === day && e.month === currentMonth + 1) ||
                                          (e.endDay >= day && e.day <= day && e.month === currentMonth + 1));

            if(event) {
                if (event.day === day) { // Event starts on this day
                    div.innerHTML = `<a href="${event.link}">${day} - ${event.title}</a>`;
                } else { // Event continues from a previous day
                    div.innerHTML = `<a href="${event.link}" class="multi-day">...</a>`; // Using '...' or any symbol to indicate continuation
                    div.classList.add('event-day', 'multi-day-event');
                }
                div.classList.add('event-day');
            }
        }
        document.getElementById('dates').appendChild(div);
    }
    const yearCalendar = document.getElementById('year-calendar');

    months.forEach((yeareventmonth, index) => {
        const yeareventmonthDiv = document.createElement('div');
        yeareventmonthDiv.className = 'month';

        const yeareventmonthTitle = document.createElement('h2');
        yeareventmonthTitle.textContent = yeareventmonth;
        yeareventmonthDiv.appendChild(yeareventmonthTitle);

        yearevents.filter(e => e.yeareventmonth === index + 1).forEach(yearevent => {
            const yeareventDiv = document.createElement('div');
            yeareventDiv.className = 'event';
            if (yearevent.monthstartDay == (yearevent.monthendDay ? yearevent.monthendDay : yearevent.monthstartDay)) {
                yeareventDiv.innerHTML = `<a href="${yearevent.link}">Le ${yearevent.monthstartDay} - ${yearevent.montheventtitle}</a>`;
            } else {
                yeareventDiv.innerHTML = `<a href="${yearevent.link}">Du ${yearevent.monthstartDay} au ${yearevent.monthendDay ? yearevent.monthendDay : yearevent.monthstartDay} - ${yearevent.montheventtitle}</a>`;
            }
                yeareventmonthDiv.appendChild(yeareventDiv);
        });

        yearCalendar.appendChild(yeareventmonthDiv);
    });
});