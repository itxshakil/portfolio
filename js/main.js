document.addEventListener('DOMContentLoaded', () => {
    loadFontAwesome();

    const contactForm = document.querySelector('form#contact-form');
    const contactSendBtn = document.querySelector('form #send-btn');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        contactSendBtn.disabled = true;
        contactSendBtn.innerText = "Sending...";

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput.value.trim() === '') {
            nameInput.focus();
        }
        if (messageInput.value.trim() === '') {
            messageInput.focus();
        }

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('message', messageInput.value);
        formData.append('email', emailInput.value);

        fetch('handle_contact_form.php', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.json().then(json => {
                const messageParagraph = document.createElement('p');

                messageParagraph.innerText = json.message;
                messageParagraph.classList.add(json.class);

                contactForm.prepend(messageParagraph);

                function resetForm() {
                    messageParagraph.remove();
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';

                    contactSendBtn.disabled = false;
                    contactSendBtn.innerText = "Send";
                }

                setTimeout(() => resetForm(), 5000);
            })
        }).catch(error => {
            console.log(error);
        })
    })

    function loadFontAwesome() {
        const linkElement = document.createElement('link');
        linkElement.href = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
        linkElement.rel = "stylesheet";

        const head = document.querySelector('head');
        head.appendChild(linkElement);
    }

    document.getElementById("current-year").innerHTML = new Date().getFullYear();
})
