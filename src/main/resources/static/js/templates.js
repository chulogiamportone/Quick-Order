
$(document).ready(function() {

	const dataJson = localStorage.getItem('USUARIOS');
	const data = JSON.parse(dataJson);
	switch (data.usuario) {
		case "MOZO":
			cargarPedidosMozo();
			break;
		case "CAJA":
			cargarPedidosCaja();
			break;
		case "COCINA":
			cargarPedidosCocina();
			break;
		default:
			location.href = "login.html"
			break;
	}
});


async function cargarPedidosMozo() {

	const response = await fetch('pedidos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },

	});
	const pedidos = await response.json();
	
	let listadoHtml = '';
	let pasada = 0;
	for (let pedido of pedidos.data) {
		pasada++
		let usuarioHtml = '<div class="cardt ">' +
			'<a  onclick="javascript: mostrarPopup('+pedido.id+');" class="d-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a></div>'
		listadoHtml += usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
	document.getElementById('btn-flotante').innerHTML = '<a href="carrito.html" class="btn-flotante" id="btn-flotante">INICIAR PEDIDO</a>';
	

}
async function cargarPedidosCaja() {

	const response = await fetch('pedidos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },

	});
	const pedidos = await response.json();

	let listadoHtml = '';
	let pasada = 0;
	for (let pedido of pedidos.data) {
		pasada++
		let usuarioHtml = '<div class="cardt ">' +
			'<a  onclick="javascript: mostrarPopup('+pedido.id+');" class="d-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a></div>'
		listadoHtml += usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
}
async function cargarPedidosCocina() {

	const response = await fetch('pedidos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },

	});
	const pedidos = await response.json();

	let listadoHtml = '';
	let pasada = 0;
	for (let pedido of pedidos.data) {
		pasada++
		let usuarioHtml = '<div class="cardt ">' +
			'<a  onclick="javascript: mostrarPopup('+pedido.id+');" class="d-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a></div>'
		listadoHtml += usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
	
}


function mostrarPopup(a) {
	document.getElementById("popup2").style.display = "block";
	
	
}

function cerrarPopup() {
	document.getElementById("popup2").style.display = "none";
}
document.getElementById("boton-abrir2").addEventListener("click", mostrarPopup);
document.getElementById("boton-cerrar2").addEventListener("click", cerrarPopup);

