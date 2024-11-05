$(document).ready(function() {
	cargarProductos()
});
var cProducto=0;

async function cargarProductos() {
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});
	const productos = await response.json();
	let listadoHtml = '';
	let pasada = 0;
	for (let producto of productos.data) {
		let usuarioHtml = '<div class="colapin2"><div class="cardt ">' +
			'<a  onclick="javascript: mostrarPopup2('+producto.id+');" class="d-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">Pedido N°' + producto.numero+'.                       $'+
			producto.precio + '</h6></a></div>'+
			'<div class="card__counter"><button class="card__btn" onclick="javascript: menos('+producto.id+');" id="-'+
			pasada+'">-</button><div class="card__counter-score">'+
			cProducto+'</div><button  class="card__btn card__btn-plus" onclick="javascript: mas('+producto.id+');" id="+'+
			pasada+'">+</button></div></div>'
			
		listadoHtml += usuarioHtml;
		pasada++;
	}
	document.getElementById("Carrito").innerHTML = listadoHtml;
}

function mostrarPopup() {
	document.getElementById("popup").style.display = "block";
	document.getElementById("boton-abrir").style.display= "none";
}

function cerrarPopup() {
	document.getElementById("popup").style.display = "none";
	document.getElementById("boton-abrir").style.display= "block";
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
	alert('-')
}

function mas(a) {
	alert('+')
}







