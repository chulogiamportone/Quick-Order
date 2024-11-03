$(document).ready(function() {

	const dataJson = localStorage.getItem('USUARIOS');
	const data = JSON.parse(dataJson);
	alert(data.usuario)
	cargarPedidosMozo()
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
		let usuarioHtml = '<div class="cardt "><a href="#collapseCardT1" class="d-card cardt-header collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardT1"><h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a><div class="collapse " id="collapseCardT1"><div class="cardt-body">MOZO</div></div></div><tr><td>'
		listadoHtml += usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
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
		let usuarioHtml = '<div class="cardt "><a href="#collapseCardT1" class="d-card cardt-header collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardT1"><h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a><div class="collapse " id="collapseCardT1"><div class="cardt-body">CAJA</div></div></div><tr><td>'
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
		let usuarioHtml = '<div class="cardt "><a href="#collapseCardT1" class="d-card cardt-header collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardT1"><h6 class="m-0 font-weight-bold text-primary">Pedido N°' + pedido.numero + '</h6></a><div class="collapse " id="collapseCardT1"><div class="cardt-body"> COCINA</div></div></div><tr><td>'
		listadoHtml += usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
}