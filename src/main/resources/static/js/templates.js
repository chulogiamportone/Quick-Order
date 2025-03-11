$(document).ready(function () {
  const dataJson = localStorage.getItem("USUARIOS");
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
      location.href = "login.html";
      break;
  }
});

async function cargarPedidosMozo() {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const pedidos = await response.json();

  if (!pedidos.data || !Array.isArray(pedidos.data)) {
    console.error("Error: La respuesta del servidor no contiene una lista de pedidos.");
    return;
  }

  let listadoHtml = "";
  let pasada = 0;

  for (let pedido of pedidos.data) {
    pasada++;
    console.log(`Pedido ${pedido.id}: Estado -> ${pedido.estado}`); // Para depuración

    let botonEntregado = "";

    if (pedido.estado && pedido.estado.trim().toLowerCase() === "listo para entregar") {
      botonEntregado = '<button class="btn-entregado" onclick="eliminarPedido('+ pedido.id +')"> Entregado </button>';
    }

    let usuarioHtml =
      '<div class="cardt id="pedido-' + pedido.id +'">' + 
        '<a  onclick="javascript: mostrarPopup(' + pedido.id + ');" class="d-card cardt-header " role="button">' +
          '<h4 class="m-0 font-weight-bold text-primary"> Pedido N° ' + pedido.numero + "</h4>" +
        "</a>" + 
        botonEntregado +
      "</div>";
    
    listadoHtml += usuarioHtml;
  }
  document.getElementById("Pedidos").innerHTML = listadoHtml;
  document.getElementById("btn-flotante").innerHTML = '<a href="carrito.html" class="btn-flotante" id="btn-flotante"> TOMAR PEDIDO </a>';
}

async function cargarPedidosCaja() {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();

  let listadoHtml = "";
  let pasada = 0;
  for (let pedido of pedidos.data) {
    pasada++;
    let usuarioHtml =
      '<div class="cardt ">' +
      '<a  onclick="javascript: mostrarPopup(' +
      pedido.id +
      ');" class="d-card cardt-header " role="button">' +
      '<h4 class="m-0 font-weight-bold text-primary">Pedido N°' +
      pedido.numero +
      "</h4></a></div>";
    listadoHtml += usuarioHtml;
  }
  document.getElementById("Pedidos").innerHTML = listadoHtml;
}

async function cargarPedidosCocina() {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();

  let listadoHtml = "";
  let pasada = 0;

  for (let pedido of pedidos.data) {
    pasada++;

    // Si el estado es "Listo para entregar", no lo mostramos
    if (pedido.estado === "Listo para entregar") {
      continue; // Salta este pedido y no lo agrega al listado
    }

    let botonHtml = "";

    // Verifica el estado y muestra el botón correspondiente
    if (pedido.estado === null || pedido.estado.trim() === "") {
      botonHtml = `<button onclick="cambiarEstadoPedido(${pedido.id}, 'En preparación')" class="btn btn-warning"> En preparación </button>`;
    } else if (pedido.estado === 'En preparación') {
      botonHtml = `<button onclick="cambiarEstadoPedido(${pedido.id}, 'Listo para entregar')" class="btn btn-success"> Listo para entregar </button>`;
    }

    let pedidoHtml =
      '<div class="cardt ">' +
      '<a  onclick="javascript: mostrarPopup(' +
      pedido.id +
      ');" class="d-card cardt-header " role="button">' +
      '<h4 class="m-0 font-weight-bold text-primary">Pedido N°' +
      pedido.numero +
      "</h4></a>"+
      botonHtml +
      "</div>";
    listadoHtml += pedidoHtml;
  }
  document.getElementById("Pedidos").innerHTML = listadoHtml;
}

async function mostrarPopup(a) {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();
  document.getElementById("popup2").style.display = "block";

  for (let pedido of pedidos.data) {
    if (pedido.id == a) {
      document.getElementById("popup2").innerHTML =
        '<div class="pop-titulo"><h2 class="pop-pedido">Pedido N°' +
        pedido.id +
        "</h2>" +
        '<h4 class="pop-estado">' +
        pedido.estado +
        '</h4></div><h4 class="titulo-prod">Productos</h4><div class="cargar-prod">	' +
        '<h4 class="prod">titulo producto</h4><div class="detalle-prod"><h6 class="detalle">detalle</h6>' +
        '<h6 class="precio">precio</h6></div></div><div class="titulo-comentario"><div class="comentario">' +
        '</div></div><div class="div-btn-cerrar-popup"><button class="btn-cerrar-popup" id="boton-cerrar2" onclick="javascript: cerrarPopup();"> Cerrar' +
        "</button></div>";
    }
  }
}

function cerrarPopup() {
  document.getElementById("popup2").style.display = "none";
}

async function eliminarPedido(id) {
  try {
    let response = await fetch(`pedidos/${id}`, { method: "DELETE" });

    if (response.ok) {

      const pedidoElement = document.getElementById(`pedido-${id}`);
      
      if (pedidoElement) {
        pedidoElement.remove();
        console.log(`Pedido ${id} eliminado`);
      }
      
      // Recargar la lista de pedidos desde el servidor
      await cargarPedidosMozo();
    }  else {
      console.error("Error al eliminar el pedido");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function cambiarEstadoPedido(id, nuevoEstado) {
  console.log(`Enviando nuevo estado: ${nuevoEstado}`); 

  // Realiza una solicitud PUT para actualizar solo el estado del pedido
  const response = await fetch(`pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({estado: nuevoEstado}) // Enviar solo el nuevo estado como texto
  });

  if (response.ok) {
    console.log(`Estado cambiado a: ${nuevoEstado}`);
    
    // Recargar los pedidos de cocina para reflejar el cambio
    cargarPedidosCocina();
  } else {
    console.error("Error al cambiar el estado del pedido");
  }
}

document.getElementById("boton-abrir2").addEventListener("click", mostrarPopup);
document.getElementById("boton-cerrar2").addEventListener("click", cerrarPopup);

document.querySelector(".btn-cerarSesion") .addEventListener("click", function () { 
   window.location.href = "login.html";
});