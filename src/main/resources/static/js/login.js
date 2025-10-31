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
	localStorage.setItem("USER",document.getElementById("user").value)
	
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

