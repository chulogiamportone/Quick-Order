inputs = document.querySelectorAll('input'); //Tomo todos los inputs del html  
btn = document.getElementById('botonLogin');

var user=null;

expresiones = { //objeto con mis expresiones regulares
	mail: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
	contraseña: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
};

const validar = (e) => { //arrow function para validar datos

	switch (e.target.id) {
		case "mail":
			expresiones.mail.test(e.target.value) ? claseT('mail') : claseF('mail');
			break;
		case "contraseña":
			expresiones.contraseña.test(e.target.value) ? claseT('contraseña') : claseF('contraseña');
			break;
	}
}
async function avanzar() {

	const response = await fetch('empleado', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});
	let validaduyc = false;
	const empleados = await response.json();
	for (let empleado of empleados.data) {
		if (empleado.usuario == document.getElementById("mail").value && empleado.contraseña == document.getElementById("contraseña").value) {
			validaduyc = true;
			user=empleado.cargo;
		}
	}
	const data = { usuario: user};
	localStorage.setItem('USUARIOS', JSON.stringify(data));
	validaduyc == true ? location.href = "templates.html" : alert('error');

}


inputs.forEach((input) => {
	input.addEventListener('keyup', validar);
});
btn.addEventListener('click', avanzar)

const claseF = (a) => {
	document.getElementById(a).classList.add('form_error');
	document.getElementById(a).classList.remove('form-control');

}
const claseT = (a) => {
	document.getElementById(a).classList.add('form-control');
	document.getElementById(a).classList.remove('form_error');

}
