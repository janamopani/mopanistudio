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
    status.textContent = 'Your draft is ready. Send it from your email app to register your interest.';
    window.location.href = `mailto:hello@mopanistudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});
