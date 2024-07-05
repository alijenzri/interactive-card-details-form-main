class Card {
    constructor() {
        this.cacheDOM();
        this.bindEvents();
        this.updateCard();
    }

    cacheDOM() {
        this.form = document.querySelector('form');
        this.formSection = document.querySelector('.form-section'); // Cache form section
        this.confirmButton = document.querySelector('.confirm-button');

        this.inputName = document.querySelector('.input-name');
        this.cardHolderName = document.querySelector('.card-holder-name');
        this.errorMessageName = document.querySelector('.error-message-name');

        this.inputNumber = document.querySelector('.input-number');
        this.cardHolderNumber = document.querySelector('.card-number');
        this.errorMessageNumber = document.querySelector('.error-message-number');

        this.inputYear = document.querySelector('.expiry-year');
        this.inputMonth = document.querySelector('.expiry-month');
        this.cardHolderDate = document.querySelector('.card-expiry-date');
        this.errorMessageDate = document.querySelector('.error-message-date');

        this.inputCardCvc = document.querySelector('.input-card-cvc');
        this.errorMessageCardCvc = document.querySelector('.error-message-cvc');
        this.cardHolderCvc = document.querySelector('.card-cvc');
    }

    bindEvents() {
        this.inputName.addEventListener('input', this.handleNameInput.bind(this));
        this.inputNumber.addEventListener('input', this.handleNumberInput.bind(this));
        this.inputMonth.addEventListener('input', this.handleMonthInput.bind(this));
        this.inputYear.addEventListener('input', this.handleYearInput.bind(this));
        this.inputCardCvc.addEventListener('input', this.handleCvcInput.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleNameInput(event) {
        const inputValue = event.target.value;
        const inputValueWithoutSpace = inputValue.replace(/\s+/g, '');

        if (isAlpha(inputValueWithoutSpace)) {
            this.errorMessageName.textContent = '';
            this.inputName.classList.remove('error-border');
        } else {
            this.errorMessageName.textContent = 'Wrong format, characters only';
            this.inputName.classList.add('error-border');
        }

        this.cardHolderName.textContent = inputValue || 'Jane Appleseed';
        this.updateCard();
    }

    handleNumberInput(event) {
        const inputValue = event.target.value;
        const inputValueWithoutSpace = inputValue.replace(/\s+/g, '');

        if (!isNaN(inputValueWithoutSpace) && inputValueWithoutSpace.indexOf('.') === -1) {
            this.errorMessageNumber.textContent = '';
            this.inputNumber.classList.remove('error-border');

            if (inputValue.length > 19) {
                this.errorMessageNumber.textContent = 'The card number must be 16 digits';
                this.inputNumber.classList.add('error-border');
            }
        } else {
            this.errorMessageNumber.textContent = 'Wrong format, numbers only';
            this.inputNumber.classList.add('error-border');
        }

        this.cardHolderNumber.textContent = inputValue.substring(0, 19) || '0000 0000 0000 0000';
        this.updateCard();
    }

    handleMonthInput(event) {
        const inputValue = event.target.value;

        if (inputValue === '') {
            this.errorMessageDate.textContent = `can't be blank`;
            this.inputMonth.classList.add('error-border');
        } else {
            this.errorMessageDate.textContent = '';
            this.inputMonth.classList.remove('error-border');
        }

        this.cardHolderDate.textContent = `${inputValue.substring(0, 2)}/${this.inputYear.value || '00'}` || '00/00'
        this.updateCard();
    }

    handleYearInput(event) {
        const inputValue = event.target.value;

        if (inputValue === '') {
            this.errorMessageDate.textContent = `can't be blank`;
            this.inputYear.classList.add('error-border');
        } else {
            this.errorMessageDate.textContent = '';
            this.inputYear.classList.remove('error-border');
        }

        this.cardHolderDate.textContent = `${this.inputMonth.value || '00'}/${inputValue.substring(0, 2)}` || '00/00'
        this.updateCard();
    }

    handleCvcInput(event) {
        const inputValue = event.target.value;

        if (inputValue === '') {
            this.errorMessageCardCvc.textContent = `can't be blank`;
            this.inputCardCvc.classList.add('error-border');
        } else {
            this.errorMessageCardCvc.textContent = '';
            this.inputCardCvc.classList.remove('error-border');
        }

        this.cardHolderCvc.textContent = inputValue.substring(0, 3);
        this.updateCard();
    }

    validateInputs() {
        const isNameValid = isAlpha(this.inputName.value.replace(/\s+/g, ''));
        const isNumberValid = !isNaN(this.inputNumber.value.replace(/\s+/g, ''))
            && this.inputNumber.value.replace(/\s+/g, '').length === 16;

        if (!isNameValid) {
            this.errorMessageName.textContent = 'Wrong format, characters only';
            this.inputName.classList.add('error-border');
        }

        if (!isNumberValid) {
            this.errorMessageNumber.textContent = 'The card number must be 16 digits and contain only numbers';
            this.inputNumber.classList.add('error-border');
        }

        return isNameValid && isNumberValid;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validateInputs()) {
            this.formSection.innerHTML = `
                <div class="thank-you-section">
                    <img src="images/icon-complete.svg" class="thank-you-img" >
                    <h1 class="thank-you-heading">THANK YOU!</h1>
                    <p class="thank-you-message">We've added your card details</p>
                    <button class="continue-button">Continue</button>
                </div>
            `;
            // Add visible class after a delay to trigger transition
            setTimeout(() => {
                document.querySelector('.thank-you-section').classList.add('visible');
            }, 10);
        }
    }

    updateCard() {
        if (this.inputName.value === '') {
            this.cardHolderName.textContent = 'Jane Appleseed';
        }

        if (this.inputNumber.value === '') {
            this.cardHolderNumber.textContent = '0000 0000 0000 0000';
        }

        if (this.inputMonth.value === '') {
            this.cardHolderDate.textContent = `00/${this.inputYear.value.substring(0, 2) || '00'}`;
        } else if (this.inputYear.value === '') {
            this.cardHolderDate.textContent = `${this.inputMonth.value.substring(0, 2) || '00'}/00`;
        }

        if (this.inputCardCvc.value === '') {
            this.cardHolderCvc.textContent = '000';
        }
    }
}

const isAlpha = (str) => /^[A-Za-z]+$/.test(str);

const card = new Card();
