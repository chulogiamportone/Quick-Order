$(document).ready(function() {
	cargarProductos()
});

async function cargarProductos() {
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});

	const productos = await response.json();
	console.log("Respuesta de la API: ", productos);

	let listadoHtml = '';

	for (let producto of productos.data) {
		let productoHtml =
			'<div class="colapin2"> <div class="cardp">' +
			'<a  onclick="javascript: mostrarPopup2(' + producto.id + ');" class="p-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">' + producto.nombre + '&nbsp; $ ' + producto.precio + 
			'</h6> </a> </div>' +
			'<div class="card__counter"> <button class="card__btn" onclick="javascript: menos(' + producto.id + ');" id="-' +
			producto.id + '"> - </button> <div class="card__counter-score" id="c' + producto.id + '"> 0 </div>' +
			'<button class="card__btn card__btn-plus" onclick="javascript: mas(' + producto.id + ');" id="+' +
			producto.id + '"> + </button> </div> </div>'

		listadoHtml += productoHtml;
	}
	document.getElementById("Carrito").innerHTML = listadoHtml;
}

async function mostrarPopup() {
	let popup = document.getElementById("popup");
	popup.style.display = "block";

	document.getElementById("boton-abrir").style.display = "none";
	document.getElementById("btnf").style.display = "none";

	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});

	const productos = await response.json();

	let listadoHtml = '';
	listadoHtml+='<button class="btn-cerrar-popup" id="boton-cerrar" onclick="javascript: cerrarPopup();"> Cerrar </button>'
	
	for (let producto of productos.data) {
		let content = parseInt(document.getElementById("c" + producto.id).innerText.trim(), 10);

		if (content > 0) {
			listadoHtml +='<div style="display=block;"> <div class="div-product-list"> <div class="card-product ">' +
			'<a onclick="javascript: mostrarPopup2(' + producto.id + ');" class="d-card cardt-header" role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">' + producto.nombre + '&nbsp; $ ' +
			producto.precio + ' &nbsp; x'+ content + '</h6> </a> </div> </div>'
		}
	}

	popup.innerHTML = listadoHtml;
}

function cerrarPopup() {
	document.getElementById("popup").style.display = "none";
	document.getElementById("boton-abrir").style.display = "block";
	document.getElementById("btnf").style.display = "block";
}

function mostrarPopup2(a) {
	document.getElementById("popup2").style.display = "block";
}

function cerrarPopup2() {
	document.getElementById("popup2").style.display = "none";
}

document.getElementById("boton-abrir").addEventListener("click", mostrarPopup);
document.getElementById("boton-cerrar").addEventListener("click", cerrarPopup);

function menos(a) {
	let content = document.getElementById("c" + a).innerHTML;

	if (content != "0") {
		content--;
	}

	document.getElementById("c" + a).innerHTML = content;
}

function mas(a) {
	let content = document.getElementById("c" + a).innerHTML;

	content++;

	document.getElementById("c" + a).innerHTML = content;
}