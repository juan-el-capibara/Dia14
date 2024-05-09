/*Se desea visualizar la siguiente informacion de un usuario aleatorio,

1- Nombre
2- Email
3- Cumpleaños
4- Ubicacion o Direccion
5- Telefono
6- Contraseña

Ademas se tiene que visualizar la imagen de la persona

*/  
let currentPerson; // Hace que quede la persona actual 

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Fetch failed: ' + error.message);
    }
}

async function getPerson() {
    try {
        const response = await fetchData('https://randomuser.me/api/?results=1');
        return response.results[0];
    } catch (error) {
        console.error(error);
    }
}

function createHeader(firstName, lastName) {
    return ` <p>Hi, My name is</p>
    <h2>${firstName} ${lastName}</h2>`;
}

function createImage(imageUrl) {
    return `<img src="${imageUrl}"><br><br>`;
}

function createEmail(email) {
    return `<p>My email address is:</p>
    <h2>${email}</h2>`;
}

function createBirthday(birthday) {
    return `<p>My birthday is:</p>
    <h2>${new Date(birthday).toLocaleDateString()}</h2>`;
}

function createAddress(postcode, country) {
    return `<p>My address is:</p>
    <h2>${postcode} ${country}</h2>`;
}

function createPhone(phone) {
    return `<p>My phone number is:</p> 
    <h2>${phone}</h2>`;
}

function createPassword(password) {
    return `<p>My password is:</p>
    <h2>${password}</h2>`;
}


function renderPerson(data, infoType) { // infoType => Tipo de informacion que se debe de mostrar
    let info = ''; 
    /*Se declara una variable info inicializada como una cadena vacía.
    Esta variable se utilizará para almacenar el contenido HTML que se va 
    a mostrar en la página. */

    switch(infoType) { // switch => Evalua el valor de infoType para determianr que tipo de informacion que se va a mostrar
        case 'nombre':
            info = createHeader(data.name.first, data.name.last); // Genera un emcabezado con el nombre de la persona
            break;
        case 'email':
            info = createEmail(data.email); // Genera un parrafo parafo con el Email
            break;
        case 'birthday':
            info = createBirthday(data.dob.date);
            break;
        case 'address':
            info = createAddress(data.location.postcode, data.location.country);
            break;
        case 'numero':
            info = createPhone(data.phone);
            break;
        case 'contrasena':
            info = createPassword(data.login.password);
            break;
        default: // Si infoType no coincide con ninguna informacion anterior se muestra el mesaje de info
            info = 'Información no disponible';
            break;
    }

    document.getElementById('contenedor').innerHTML = createImage(data.picture.large) + info; 
    /*para mostrar la imagen de la persona, seguido del contenido HTML generado según el tipo de información especificada por infoType */
}

async function init() {
    document.getElementById('randomButton').addEventListener('click', async () => {
        currentPerson = await getPerson();
        renderPerson(currentPerson, 'nombre'); 
        // Por defecto, mostrar nombre al hacer clic en el botón
    });

    const iconos = document.querySelectorAll('.icono');
    iconos.forEach((icono, index) => {
        icono.addEventListener('mouseover', async () => {
            if (!currentPerson) return; // Verificar que haya una persona actual
            switch(index) { // Tipos de casos
                case 0:
                    renderPerson(currentPerson, 'nombre');
                    break;
                case 1:
                    renderPerson(currentPerson, 'email');
                    break;
                case 2:
                    renderPerson(currentPerson, 'birthday');
                    break;
                case 3:
                    renderPerson(currentPerson, 'address');
                    break;
                case 4:
                    renderPerson(currentPerson, 'numero');
                    break;
                case 5:
                    renderPerson(currentPerson, 'contrasena');
                    break;
                default:
                    renderPerson(currentPerson, ''); // Por defecto, no hace nada
                    break;
            }
        });
    });
}

window.onload = init;