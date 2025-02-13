document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            nameError.textContent = "Numele este obligatoriu.";
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
            return false;
        } else if (name.length < 2) {
            nameError.textContent = "Numele trebuie să aibă cel puțin 2 caractere.";
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
            return false;
        } else {
            nameError.textContent = "";
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            emailError.textContent = "Email-ul este obligatoriu.";
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Introdu o adresă de email validă.";
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        } else {
            emailError.textContent = "";
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            messageError.textContent = "Mesajul este obligatoriu.";
            messageInput.classList.add('invalid');
            messageInput.classList.remove('valid');
            return false;
        } else if (message.length < 10) {
            messageError.textContent = "Mesajul trebuie să aibă cel puțin 10 caractere.";
            messageInput.classList.add('invalid');
            messageInput.classList.remove('valid');
            return false;
        } else {
            messageError.textContent = "";
            messageInput.classList.remove('invalid');
            messageInput.classList.add('valid');
            return true;
        }
    }
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            formMessage.textContent = "Mesajul a fost trimis cu succes!";
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            form.reset();
            nameInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            messageInput.classList.remove('valid');
        } else {
            formMessage.textContent = "Vă rog să respectați indicațiile!";
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    });
});
