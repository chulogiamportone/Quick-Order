inputs = document.querySelectorAll('input'); //Tomo todos los inputs del html
btn = document.getElementById('botonLogin');

btn.addEventListener('click', avanzar)

expresiones = { //objeto con mis expresiones regulares
	mail: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
	contraseña: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
};

const validar = (e) => { //arrow function para validar datos

	switch (e.target.id) {
		case "username":
			expresiones.mail.test(e.target.value) ? claseT('mail') : claseF('mail');
			break;
		case "password":
			expresiones.contraseña.test(e.target.value) ? claseT('contraseña') : claseF('contraseña');
			break;
	}
}
async function avanzar() {
	console.log("DEBUG: Iniciando validación de usuario y contraseña");
	const response = await fetch('empleado', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});

	console.log(document.getElementById("username").value)
	console.log(document.getElementById("password").value)

	const empleados = await response.json();

	for (let empleado of empleados.data) {
		if (empleado.usuario == document.getElementById("username").value && empleado.contraseña == document.getElementById("{noop}"+"password").value) {
			validaduyc = true;
			user = empleado.cargo;
		}
	}
	const data = { usuario: user };
	localStorage.setItem('USUARIOS', JSON.stringify(data));

}


inputs.forEach((input) => {
	input.addEventListener('keyup', validar);
});



const claseF = (a) => {
	document.getElementById(a).classList.add('form_error');
	document.getElementById(a).classList.remove('form-control');

}
const claseT = (a) => {
	document.getElementById(a).classList.add('form-control');
	document.getElementById(a).classList.remove('form_error');

}

