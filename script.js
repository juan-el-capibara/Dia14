class RandomUserButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.onClick.bind(this));
    }

    async onClick() {
        const response = await fetch('https://randomuser.me/api/?results=1');
        const data = await response.json();
        const user = data.results[0];
        const userComponent = document.querySelector('user-component');
        userComponent.render(user);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <button>Obtener Usuario Aleatorio</button>
        `;
    }
}

customElements.define('random-user-button', RandomUserButton);
class UserComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render(user) {
        const { name, email, dob, location, phone, login, picture } = user;

        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos para el componente */
            </style>
            <div>
                <img src="${picture.large}">
                <p>Hi, My name is</p>
                <h2>${name.first} ${name.last}</h2>
                <p>My email address is:</p>
                <h2>${email}</h2>
                <p>My birthday is:</p>
                <h2>${new Date(dob.date).toLocaleDateString()}</h2>
                <p>My address is:</p>
                <h2>${location.postcode} ${location.country}</h2>
                <p>My phone number is:</p>
                <h2>${phone}</h2>
                <p>My password is:</p>
                <h2>${login.password}</h2>
            </div>
        `;
    }
}

customElements.define('user-component', UserComponent);
