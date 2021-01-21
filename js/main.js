document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form#contact-form');
    const contactSendBtn = document.querySelector('form #send-btn');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        contactSendBtn.disabled = true;
        contactSendBtn.innerText = "Sending...";

        let nameInput = document.querySelector('#name');
        let emailInput = document.querySelector('#email');
        let messageInput = document.querySelector('#message');

        if (nameInput.value.trim() === '') {
            nameInput.focus();
        }
        if (messageInput.value.trim() === '') {
            messageInput.focus();
        }

        let formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('message', messageInput.value);
        formData.append('email', emailInput.value);

        fetch('handle_contact_form.php', {
            method: 'POST',
            body: formData
        }).then(response => {
            response.json().then(json => {
                let formElement = document.createElement('p');

                formElement.innerText = json.message;
                formElement.classList.add(json.class);

                contactForm.prepend(formElement);

                function resetForm() {
                    formElement.remove();
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';


                    contactSendBtn.disabled = false;
                    contactSendBtn.innerText = "Send";
                }

                setTimeout(function () {
                    resetForm();
                }, 5000);
            })
        }).catch(error => {
            console.log(error);
        })
    })
})