fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
        const usuario = data.results[0];
        document.getElementById('nombre').textContent = usuario.name.first;
        document.getElementById('email').textContent = usuario.email;
        document.getElementById('fecha').textContent = usuario.dob.date;
        document.getElementById('ubicacion').textContent = `${usuario.location.city}, ${usuario.location.country}`;
        document.getElementById('contraseña').textContent = usuario.contraseña

        // Mostrar la imagen de perfil
        document.getElementById('imagenPerfil').src = usuario.picture.large;
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
