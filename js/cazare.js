document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reservationForm');
    const formMessage = document.getElementById('formMessage');

    const numeInput = document.getElementById('nume');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');
    const checkinInput = document.getElementById('data-checkin');
    const checkoutInput = document.getElementById('data-checkout');
    const cameraSelect = document.getElementById('tip-camera');
    const persoaneInput = document.getElementById('numar-persoane');
    const mesajInput = document.getElementById('mesaj');
    const numeError = document.getElementById('numeError');
    const emailError = document.getElementById('emailError');
    const telefonError = document.getElementById('telefonError');
    const checkinError = document.getElementById('checkinError');
    const checkoutError = document.getElementById('checkoutError');
    const cameraError = document.getElementById('cameraError');
    const persoaneError = document.getElementById('persoaneError');
    const mesajError = document.getElementById('mesajError');
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneRegex = /^0\d{9}$/;
    function validateNume() {
        const val = numeInput.value.trim();
        if (val === '') {
            numeError.textContent = "Numele este obligatoriu.";
            setInvalid(numeInput);
            return false;
        } else if (val.length < 2) {
            numeError.textContent = "Numele trebuie să aibă cel puțin 2 caractere.";
            setInvalid(numeInput);
            return false;
        } else {
            numeError.textContent = "";
            setValid(numeInput);
            return true;
        }
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        if (val === '') {
            emailError.textContent = "Email-ul este obligatoriu.";
            setInvalid(emailInput);
            return false;
        } else if (!emailRegex.test(val)) {
            emailError.textContent = "Introduceți o adresă de email validă.";
            setInvalid(emailInput);
            return false;
        } else {
            emailError.textContent = "";
            setValid(emailInput);
            return true;
        }
    }

    function validateTelefon() {
        const val = telefonInput.value.trim();
        if (val === '') {
            telefonError.textContent = "Telefonul este obligatoriu.";
            setInvalid(telefonInput);
            return false;
        } else if (!phoneRegex.test(val)) {
            telefonError.textContent = "Formatul telefonului nu este valid (ex: 07XXXXXXXX).";
            setInvalid(telefonInput);
            return false;
        } else {
            telefonError.textContent = "";
            setValid(telefonInput);
            return true;
        }
    }

    function validateCheckin() {
        if (checkinInput.value === '') {
            checkinError.textContent = "Data de Check-In este obligatorie.";
            setInvalid(checkinInput);
            return false;
        } else {
            checkinError.textContent = "";
            setValid(checkinInput);
            return true;
        }
    }

    function validateCheckout() {
        if (checkoutInput.value === '') {
            checkoutError.textContent = "Data de Check-Out este obligatorie.";
            setInvalid(checkoutInput);
            return false;
        }
        else {
            const checkinDate = new Date(checkinInput.value);
            const checkoutDate = new Date(checkoutInput.value);
            if (checkoutDate < checkinDate) {
                checkoutError.textContent = "Data de Check-Out nu poate fi înainte de Check-In.";
                setInvalid(checkoutInput);
                return false;
            } else {
                checkoutError.textContent = "";
                setValid(checkoutInput);
                return true;
            }
        }
    }

    function validateCamera() {
        if (cameraSelect.value === '') {
            cameraError.textContent = "Selectați tipul camerei.";
            setInvalid(cameraSelect);
            return false;
        } else {
            cameraError.textContent = "";
            setValid(cameraSelect);
            return true;
        }
    }

    function validatePersoane() {
        const val = persoaneInput.value.trim();
        if (val === '' || Number(val) < 1) {
            persoaneError.textContent = "Numărul de persoane trebuie să fie minim 1.";
            setInvalid(persoaneInput);
            return false;
        } else if (Number(val) > 10) {
            persoaneError.textContent = "Numărul maxim de persoane este 10.";
            setInvalid(persoaneInput);
            return false;
        } else {
            persoaneError.textContent = "";
            setValid(persoaneInput);
            return true;
        }
    }
    function validateMesaj() {
        const val = mesajInput.value.trim();
        if (val !== '' && val.length < 5) {
            mesajError.textContent = "Cererile speciale trebuie să aibă min. 5 caractere sau lăsați gol.";
            setInvalid(mesajInput);
            return false;
        } else {
            mesajError.textContent = "";
            setValid(mesajInput);
            return true;
        }
    }
    function setInvalid(input) {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
    function setValid(input) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
    numeInput.addEventListener('input', validateNume);
    emailInput.addEventListener('input', validateEmail);
    telefonInput.addEventListener('input', validateTelefon);
    checkinInput.addEventListener('change', validateCheckin);
    checkoutInput.addEventListener('change', validateCheckout);
    cameraSelect.addEventListener('change', validateCamera);
    persoaneInput.addEventListener('input', validatePersoane);
    mesajInput.addEventListener('input', validateMesaj);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const isNumeValid = validateNume();
        const isEmailValid = validateEmail();
        const isTelefonValid = validateTelefon();
        const isCheckinValid = validateCheckin();
        const isCheckoutValid = validateCheckout();
        const isCameraValid = validateCamera();
        const isPersoaneValid = validatePersoane();
        const isMesajValid = validateMesaj();
        if (
            isNumeValid &&
            isEmailValid &&
            isTelefonValid &&
            isCheckinValid &&
            isCheckoutValid &&
            isCameraValid &&
            isPersoaneValid &&
            isMesajValid
        ) {
            formMessage.textContent = "Rezervarea a fost trimisă cu succes!";
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            form.reset();
            const inputs = [numeInput, emailInput, telefonInput, checkinInput,
                checkoutInput, cameraSelect, persoaneInput, mesajInput];
            inputs.forEach((el) => el.classList.remove('valid'));
        } else {
            formMessage.textContent = "Vă rog să completați corect toate câmpurile.";
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    });
});
