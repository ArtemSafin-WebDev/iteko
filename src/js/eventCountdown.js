export default function eventCountdown() {
    const elements = Array.from(document.querySelectorAll('.js-event-countdown'));

    elements.forEach(element => {
        const eventDate = element.getAttribute('data-countdown-date');

        if (!eventDate) {
            console.error('No event date');
            return;
        }

        const eventDateTime = new Date(eventDate).getTime();

        const now = new Date().getTime();
        const distance = eventDateTime - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const daysFormatted = days.toString().padStart(2, '0');
        const hoursFormatted = hours.toString().padStart(2, '0');
        const minutesFormatted = minutes.toString().padStart(2, '0');

        const displayElement = element.querySelector('.event-intro__countdown-element');

        const generateDigitMarkup = () => `
            <div class="digit">
                <div class="digit-selector">
                    <div class="digit-selector-digit">
                    0
                    </div>
                    <div class="digit-selector-digit">
                    1
                    </div>
                    <div class="digit-selector-digit">
                    2
                    </div>
                    <div class="digit-selector-digit">
                    3
                    </div>
                    <div class="digit-selector-digit">
                    4
                    </div>
                    <div class="digit-selector-digit">
                    5
                    </div>
                    <div class="digit-selector-digit">
                    6
                    </div>
                    <div class="digit-selector-digit">
                    7
                    </div>
                    <div class="digit-selector-digit">
                    8
                    </div>
                    <div class="digit-selector-digit">
                    9
                    </div>
                </div>
            </div>
        `;

        displayElement.innerHTML = `
        <div class="event-intro__countdown-date">
            <div class="event-intro__countdown-date-section">
                <div class="event-intro__countdown-date-section-number days">
                    ${Array.from(daysFormatted)
                        .map(day => generateDigitMarkup())
                        .join('')}
                </div>
                <div class="event-intro__countdown-date-section-text">
                    дней
                </div>
            </div>
            <div class="event-intro__countdown-date-divider">
                :
            </div>
            <div class="event-intro__countdown-date-section">
                <div class="event-intro__countdown-date-section-number hours">
                    ${Array.from(hoursFormatted)
                    .map(day => generateDigitMarkup())
                    .join('')}
                </div>
                <div class="event-intro__countdown-date-section-text">
                    часов
                </div>
            </div>
            <div class="event-intro__countdown-date-divider">
                :
            </div>
            <div class="event-intro__countdown-date-section event-intro__countdown-date-section--green">
                <div class="event-intro__countdown-date-section-number minutes">
                    ${Array.from(minutesFormatted)
                    .map(day => generateDigitMarkup())
                    .join('')}
                </div>
                <div class="event-intro__countdown-date-section-text">
                    минут
                </div>
            </div>
        </div>
        `;

        const daysElement = displayElement.querySelector('.days');
        const hoursElement = displayElement.querySelector('.hours');
        const minutesElement = displayElement.querySelector('.minutes');

        let x = setInterval(function() {
            const now = new Date().getTime();

            const distance = eventDateTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // const minutes = Math.floor((distance % (1000 * 60)) / 1000);

            const daysFormatted = days.toString().padStart(2, '0');
            const hoursFormatted = hours.toString().padStart(2, '0');
            const minutesFormatted = minutes.toString().padStart(2, '0');

            if (daysFormatted.length !== daysElement.children.length) {
                const digits = Array.from(daysFormatted).map(day => generateDigitMarkup());
                daysElement.innerHTML = digits.join('');
            }

            daysElement.children.forEach((element, elementIndex) => {
                element.style.setProperty('--digit', daysFormatted[elementIndex]);
            });

            if (hoursFormatted.length !== hoursElement.children.length) {
                const digits = Array.from(hoursFormatted).map(day => generateDigitMarkup());
                hoursElement.innerHTML = digits.join('');
            }

            hoursElement.children.forEach((element, elementIndex) => {
                element.style.setProperty('--digit', hoursFormatted[elementIndex]);
            });

            if (minutesFormatted.length !== minutesElement.children.length) {
                const digits = Array.from(minutesFormatted).map(day => generateDigitMarkup());
                minutesElement.innerHTML = digits.join('');
            }

            minutesElement.children.forEach((element, elementIndex) => {
                element.style.setProperty('--digit', minutesFormatted[elementIndex]);
            });

            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
    });
}
