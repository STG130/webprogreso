document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
});

// Firebase Authentication
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Redirigir al usuario a la página principal si ya está autenticado
        window.location.href = 'main.html'; // Cambiar 'main.html' por tu página de destino
    }
});

document.querySelector('#login-form form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'main.html'; // Cambiar 'main.html' por tu página de destino
        })
        .catch((error) => {
            alert('Error de inicio de sesión: ' + error.message);
        });
});

document.querySelector('#register-form form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'main.html'; // Cambiar 'main.html' por tu página de destino
        })
        .catch((error) => {
            alert('Error de registro: ' + error.message);
        });
});
