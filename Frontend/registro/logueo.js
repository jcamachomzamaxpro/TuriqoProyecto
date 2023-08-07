import { addUsuario } from "./API.js";

const formRegistro = document.querySelector('#formRegistro');
formRegistro.addEventListener('submit', agregarUsuario);

function agregarUsuario() {
    e.preventDefault();

    const nombre = document.querySelector('#inputNombre').value;
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;

    const datos = {
        nombre,
        email,
        password
    }

    if (validate(datos)) {
        return alert("TOdos los datos son necesarios")
    }
    addUsuario(datos);

}

function validate(objeto){
    return !Object.values(objeto).every( element => element !== '');
}