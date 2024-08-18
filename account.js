// Importa las funciones que necesitas del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkuwjxY1rP97DB2HyZZSIwSt1OYZ_NqKY",
    authDomain: "tracker-de-objetivos.firebaseapp.com",
    projectId: "tracker-de-objetivos",
    storageBucket: "tracker-de-objetivos.appspot.com",
    messagingSenderId: "447944901898",
    appId: "1:447944901898:web:e0fa52984f5f43ca61a6f3",
    measurementId: "G-KH3RCDF9FW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar autenticación
const auth = getAuth();

// Manejar el formulario de registro
document.getElementById('register-form-element').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso
            alert("Cuenta creada exitosamente");
            // Redirigir a la página principal o lo que desees
            window.location.href = 'newgoal.html'; // Cambia a tu página principal
        })
        .catch((error) => {
            // Manejar errores
            alert('Error de registro: ' + error.message);
        });
});

// Manejar el formulario de inicio de sesión
document.getElementById('login-form-element').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            alert("Inicio de sesión exitoso");
            // Redirigir a la página principal o lo que desees
            window.location.href = 'newgoal.html'; // Cambia a tu página principal
        })
        .catch((error) => {
            // Manejar errores
            alert('Error de inicio de sesión: ' + error.message);
        });
});
