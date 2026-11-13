const form = document.querySelector('#pilot-form');
const status = document.querySelector('#draft-status');
const copy = document.querySelector('#draft-copy');
const draft = document.querySelector('#draft-text');

form.hidden = false;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const name = fields.get('name').trim();
    const suburb = fields.get('suburb').trim();

    if (!name || !suburb) {
        status.textContent = 'Please enter your name and suburb.';
        form.elements[name ? 'suburb' : 'name'].focus();
        return;
    }

    const subject = 'Ellenbrook garden pilot';
    const goal = fields.get('goal').trim();
    const message = [
        'Hi Jana, I’m interested in taking part in the Garden Site Reading pilot.',
        '',
        `Name: ${name}`,
        `Suburb: ${suburb}`,
        `Garden type: ${fields.get('garden')}`,
        ...(goal ? [`What I’d like to understand: ${goal}`] : []),
        '',
        'You may contact me about the pilot using this email address.',
    ].join('\r\n');

    draft.value = `To: hello@mopanistudio.com\nSubject: ${subject}\n\n${message}`;
    copy.hidden = false;
    status.textContent = 'Your draft is ready. Send it from your email app to send your application.';
    window.location.href = `mailto:hello@mopanistudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

const countdown = document.querySelector('#countdown');
if (countdown) {
    const clock = countdown.querySelector('time');
    const deadline = Date.parse(clock.dateTime);
    const perthOffset = 8 * 60 * 60 * 1000;
    const deadlineYear = new Date(deadline + perthOffset).getUTCFullYear();

    function renderCountdown() {
        const now = Date.now();
        countdown.hidden = now >= deadline;
        if (countdown.hidden) return;

        const perthNow = new Date(now + perthOffset);
        const years = deadlineYear - perthNow.getUTCFullYear() -
            (now + perthOffset === Date.UTC(perthNow.getUTCFullYear(), 0, 1) ? 0 : 1);
        const anniversary = new Date(perthNow);
        const month = anniversary.getUTCMonth();
        anniversary.setUTCFullYear(perthNow.getUTCFullYear() + years);
        if (anniversary.getUTCMonth() !== month) anniversary.setUTCDate(0);
        const minutes = Math.ceil((deadline + perthOffset - anniversary.getTime()) / 60000);
        const values = [
            [years, 'year'],
            [Math.floor(minutes / 1440), 'day'],
            [Math.floor(minutes / 60) % 24, 'hour'],
            [minutes % 60, 'minute'],
        ];
        clock.textContent = values.filter(([value]) => value > 0)
            .map(([value, name]) => `${value} ${name}${value === 1 ? '' : 's'}`)
            .join(', ');
    }

    renderCountdown();
    if (!countdown.hidden) {
        const interval = window.setInterval(() => {
            renderCountdown();
            if (countdown.hidden) window.clearInterval(interval);
        }, 1000);
    }
}
