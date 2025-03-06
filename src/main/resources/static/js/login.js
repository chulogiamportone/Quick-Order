// Este código valida el formulario del login en tiempo real,
// realiza una autenticación con un servidor mediante una solicitud fetch,
// y proporciona retroalimentación visual sobre errores en los campos o credenciales incorrectas.
// Además, gestiona el estado del usuario autenticado utilizando localStorage.

//Se puede mejorar el código, mirar chat gpt

//Seleccion de elementos HTML
const inputs = document.querySelectorAll("input");
const btn = document.getElementById("botonLogin");
const popup = document.getElementById("popup2");

var user = null;

//Objeto con mis expresiones regulares para validación
const expresiones = {
  mail: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
  contraseña: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
};
//expresiones.mail: Verifica que el correo tenga un formato válido, por ejemplo: usuario@dominio.com.
// expresiones.contraseña: Valida contraseñas con:
// - Al menos un número.
// - Al menos una letra mayúscula y una minúscula.
// - Longitud entre 8 y 16 caracteres.
// - Sin espacios.

//Validar campos: arrow function para validar datos.
//Comprueba el contenido de los campos mail y contraseña en tiempo real (keyup)
// Si el contenido cumple con la expresión regular, aplica estilos de clase "correcto" (claseT).
// Si no cumple, aplica la clase "incorrecto" (claseF).
const validar = (e) => {
  switch (e.target.id) {
    case "mail":
      expresiones.mail.test(e.target.value) ? claseT("mail") : claseF("mail");
      break;
    case "contraseña":
      expresiones.contraseña.test(e.target.value)
        ? claseT("contraseña")
        : claseF("contraseña");
      break;
  }
};

//Autenticación:
// Realiza una solicitud GET al endpoint 'empleado' para obtener una lista de usuarios.
// Compara el correo y la contraseña ingresados con los datos del servidor.
// Si las credenciales coinciden:Almacena el cargo del usuario en localStorage y redirige a "templates.html".
// Si las credenciales no coinciden, llama a mostrarPopup2() para mostrar un mensaje de error.
async function avanzar() {
  const response = await fetch("empleado", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  let validaduyc = false;

  const empleados = await response.json();

  for (let empleado of empleados.data) {
    if (
      empleado.usuario == document.getElementById("mail").value &&
      empleado.contraseña == document.getElementById("contraseña").value
    ) {
      validaduyc = true;
      user = empleado.cargo;
    }
  }

  const data = { usuario: user };

  // Si todo está correcto, almacenamos el usuario y redirigimos
  localStorage.setItem("USUARIOS", JSON.stringify(data));

  validaduyc == true ? (location.href = "templates.html") : mostrarPopup2();
}

// Eventos:
// keyup en inputs: Valida cada campo de entrada en tiempo real.
// click en btn: Llama a la función avanzar para procesar la autenticación.
inputs.forEach((input) => {
  input.addEventListener("keyup", validar);
});

btn.addEventListener("click", avanzar);

//Estilos de validacion:
// claseF: Indica un error en el campo, por ejemplo, coloreándolo de rojo.
// claseT: Indica que el campo es válido, por ejemplo, coloreándolo de verde.
const claseF = (a) => {
  document.getElementById(a).classList.add("form_error"); // Aplica clase de error.
  document.getElementById(a).classList.remove("form-control"); // Elimina clase de éxito.
};

const claseT = (a) => {
  document.getElementById(a).classList.add("form-control"); // Aplica clase de éxito.
  document.getElementById(a).classList.remove("form_error"); // Aplica clase de error.
};

// Manejo de errores:
// mostrarPopup2: Muestra un mensaje indicando que el usuario o la contraseña son incorrectos.
// cerrarPopup2: Oculta el mensaje de error cuando se presiona el botón "Cerrar".
function mostrarPopup2(mensaje) {
  let pop = document.getElementById("popup2");
  let fondo = document.createElement("div");

  fondo.classList.add("popup-background");
  fondo.id = "popup-background";

  document.body.appendChild(fondo);

  pop.style.display = "block";
  pop.style.opacity = "1";
  fondo.style.display = "block";

  pop.innerHTML = `
    <h6 class="m-0 font-weight-bold text-primary"> EL USUARIO O LA CONTRASEÑA SON INCORRECTOS </h6>
    <button id="boton-cerrar2" onclick="javascript: cerrarPopup2();"> Cerrar </button>
  `;

  // Cierra automáticamente después de 3 segundos
  setTimeout(() => {
    cerrarPopup2();
  }, 3000);
}

function cerrarPopup2() {
  let pop = document.getElementById("popup2");
  let fondo = document.getElementById("popup-background");

  pop.style.opacity = "0";

  setTimeout(() => {
    pop.style.display = "none";
    if (fondo) fondo.remove();
  }, 300);
}