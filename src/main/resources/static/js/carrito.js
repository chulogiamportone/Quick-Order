$(document).ready(function() {
	cargarProductos()
});


async function cargarProductos() {
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});
	const productos = await response.json();
	let listadoHtml = '';
	let pasada=1;
	for (let producto of productos.data) {
		let usuarioHtml = '<div class="cardt "><a href="#collapseCardT'+pasada+'" class="d-card cardt-header collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardT'+pasada+'"><h6 class="m-0 font-weight-bold text-primary">' + producto.nombre + '</h6></a><div class="collapse " id="collapseCardT'+pasada+'"><div class="cardt-body">'+producto.descripcion+producto.precio+'</div></div></div><tr><td>'
		listadoHtml += usuarioHtml;
		pasada++;
	}
	document.getElementById("Carrito").innerHTML = listadoHtml;
}

function mostrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
}

function cerrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

var botonAbrir = document.getElementById("boton-abrir");
botonAbrir.addEventListener("click", mostrarPopup);
var botonCerrar = document.getElementById("boton-cerrar");
botonCerrar.addEventListener("click", cerrarPopup);