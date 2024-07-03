class Card {
    constructor() {
        this.inputName = document.querySelector('.input-name');
        this.cardHolderName = document.querySelector('.card-holder-name');
        this.errorMessage = document.querySelector('.error-message');

        this.inputName.addEventListener('input', this.handleNameInput.bind(this));
        this.updateCard(this.inputName.value);
    }

    handleNameInput(event) {
        let inputValue = event.target.value;
        let inputValueWithoutSpace = inputValue.replace(/\s+/g, '');

        if (isAlpha(inputValueWithoutSpace) || inputValue === '') {
            this.errorMessage.textContent = '';
            this.inputName.classList.remove('error-border');
        } else {
            this.errorMessage.textContent = 'Wrong format, characters only';
            this.inputName.classList.add('error-border');
        }

        this.cardHolderName.innerHTML = inputValue;
        this.updateCard(inputValue);
    }

    updateCard(inputValue) {
        if (inputValue === '') {
            this.cardHolderName.innerHTML = 'Jane Appleseed';
        }
    }
}

const isAlpha = (str) => /^[A-Za-z]+$/.test(str);

const card = new Card();
