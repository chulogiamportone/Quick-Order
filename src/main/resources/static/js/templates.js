async function avanzar() {
  console.log("DEBUG: Iniciando validación de usuario y contraseña");

  const response = await fetch("http://localhost:8080/empleado", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const empleados = await response.json();

  for (let empleado of empleados.data) {
    if (empleado.usuario == localStorage.getItem("USER")) {
      return empleado.cargo;
    }
  }
}

$(document).ready(async function () {
  const user = await avanzar();
  console.log(user);

  switch (user) {
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
      location.href = "login";
      break;
  }
});

async function cargarPedidosMozo() {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();
  console.log("PEDIDOS GET:", pedidos);
  let listadoHtml = "";
  let pasada = 0;

  for (let pedido of pedidos.data) {
    pasada++;

    // Extraer solo la hora y minutos de la cadena fechyHoraDePedido
    let hora = "";
    if (pedido.fechyHoraDePedido) {
      const partes = pedido.fechyHoraDePedido.split(" ");
      if (partes.length > 1) {
        const horaMin = partes[1].split(":");
        if (horaMin.length >= 2) {
          hora = `${horaMin[0]}:${horaMin[1]}`;
        } else {
          hora = partes[1];
        }
      } else {
        hora = pedido.fechyHoraDePedido;
      }
    }

    // OBTENER LA CLASE CSS USANDO LA FUNCIÓN COMPARTIDA
    const claseEstado = getClaseEstado(pedido.estado);

    let usuarioHtml = `
      <div class="cardt ">
        <a onclick="javascript: mostrarPopup(${pedido.id});" class="d-card cardt-header" role="button">
      
          <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
        
          <p class="m-0 hora-cardt"> Hora: ${hora}</p>
          <p class="m-0 estado-cardt ${claseEstado}"> Estado: ${pedido.estado}</p>
        </a>
      </div>
    `;

    listadoHtml += usuarioHtml;
  }

  document.getElementById("Pedidos").innerHTML = listadoHtml;
  document.getElementById("user_name_description").innerHTML = "Mozo";
  document.getElementById("btn-flotante").innerHTML =
    '<a href="carrito" class="btn-flotante" id="btn-flotante">INICIAR PEDIDO</a>';
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
    if (pedido.estado !== "Entregado") continue;
    pasada++;

    let hora = "";
    if (pedido.fechyHoraDePedido) {
      const partes = pedido.fechyHoraDePedido.split(" ");
      if (partes.length > 1) {
        const horaMin = partes[1].split(":");
        if (horaMin.length >= 2) {
          hora = `${horaMin[0]}:${horaMin[1]}`;
        } else {
          hora = partes[1];
        }
      } else {
        hora = pedido.fechyHoraDePedido;
      }
    }

    let estadoColor = "";

    if (pedido.estado === "En Preparación") {
      estadoColor = "#EFCF0A";
    } else if (pedido.estado === "Entregado") {
      estadoColor = "#51A360";
    }

    let usuarioHtml = `
      <div class="cardt " id="pedido-${pedido.id}">
        <a onclick="javascript: mostrarPopup(${pedido.id}, true);" class="d-card cardt-header" role="button">
          <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
          <p class="m-0 hora-cardt"> Hora: ${hora}</p>
          <p class="m-0 estado-cardt" style="color:${estadoColor}"> Estado: ${pedido.estado}</p>
        </a>
      </div>
    `;

    listadoHtml += usuarioHtml;
  }
  document.getElementById("Pedidos").innerHTML = listadoHtml;
  document.getElementById("user_name_description").innerHTML = "Caja";
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
    if (pedido.estado !== "En Preparación" && pedido.estado !== "Pendiente") continue;
    pasada++;

    let hora = "";
    if (pedido.fechyHoraDePedido) {
      const partes = pedido.fechyHoraDePedido.split(" ");
      if (partes.length > 1) {
        const horaMin = partes[1].split(":");
        if (horaMin.length >= 2) {
          hora = `${horaMin[0]}:${horaMin[1]}`;
        } else {
          hora = partes[1];
        }
      } else {
        hora = pedido.fechyHoraDePedido;
      }
    }

    let estadoColor = "";

    if (pedido.estado === "En Preparación") {
      estadoColor = "#EFCF0A";
    } else if (pedido.estado === "Entregado") {
      estadoColor = "#51A360";
    }

    let usuarioHtml = `
      <div class="cardt " id="pedido-${pedido.id}">
        <a onclick="javascript: mostrarPopup(${pedido.id}, true);" class="d-card cardt-header" role="button">
          <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
          <p class="m-0 hora-cardt"> Hora: ${hora}</p>
          <p class="m-0 estado-cardt" style="color:${estadoColor}"> Estado: ${pedido.estado}</p>
        </a>
      </div>
    `;

    listadoHtml += usuarioHtml;
  }
  document.getElementById("Pedidos").innerHTML = listadoHtml;
  document.getElementById("user_name_description").innerHTML = "Cocina";
}

function getIconoProducto(categoria) {
  const categoriaMinuscula = categoria ? categoria.toLowerCase() : '';

  if (categoriaMinuscula.includes('pizza')) {
    return '<i class="fas fa-pizza-slice"></i>';
  }
  // Usamos fa-cutlery como el ícono más compatible y visible para sandwiches/hamburguesas
  if (categoriaMinuscula.includes('sandwich') || categoriaMinuscula.includes('hamburguesa')) {
    return '<i class="fas fa-utensils"></i>';
  }
  // Acompañamientos/Empanadas
  if (categoriaMinuscula.includes('acompaña') || categoriaMinuscula.includes('empanada') || categoriaMinuscula.includes('papas')) {
    return '<i class="fas fa-fries"></i>';
  }

  if (categoriaMinuscula.includes('bebida') || categoriaMinuscula.includes('trago')) {
    return '<i class="fas fa-cocktail"></i>';
  }
  if (categoriaMinuscula.includes('postre') || categoriaMinuscula.includes('dulce')) {
    return '<i class="fas fa-ice-cream"></i>';
  }
  return '<i class="fas fa-utensils"></i>';
}

function getClaseEstado(estado) {
  if (!estado) return '';
  const estadoLower = estado.toLowerCase();

  if (estadoLower.includes("preparación")) {
    return 'estado-en-preparacion'; // Amarillo
  } else if (estadoLower.includes("pendiente") || estadoLower === 'nuevo') {
    return 'estado-pendiente'; // Gris
  } else if (estadoLower.includes("listo")) {
    return 'estado-listo-entrega'; // Verde
  } else if (estadoLower.includes("entregado")) {
    return 'estado-entregado'; // Azul Cyan
  } else if (estadoLower.includes("cancelado")) {
    return 'estado-cancelado'; // Rojo
  }
  return '';
}

async function mostrarPopup(a) {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();

  const pedidoContenedor = document.getElementById("popup2");
  const user = await avanzar(); // user será el string del cargo ("MOZO", "CAJA", etc.)

  let popupContentHtml = '';

  for (let pedido of pedidos.data) {
    console.log("Pedido encontrado:", pedido);
    console.log("lista_Productos:", pedido.lista_Productos);
    console.log("Lista_Productos:", pedido.Lista_Productos);
    
    if (pedido.id == a) { // Procesar solo el pedido seleccionado
      // Normalizamos la propiedad de productos
      pedido.productos = pedido.lista_Productos || pedido.Lista_Productos || [];

      // --- ROUTER POR CARGO ---
      switch (user) {
        case "MOZO":
          popupContentHtml = generarPopupMozo(pedido);
          break;
        case "CAJA":
          popupContentHtml = generarPopupCaja(pedido);
          break;
        case "COCINA":
          popupContentHtml = generarPopupCocina(pedido);
          break;
        default:
          popupContentHtml = `<div class="qo-popup-summary-content"><p class="text-center">Permiso denegado o rol no reconocido.</p></div>`;
          break;
      }
      break; // Salir del bucle for una vez que el pedido es procesado
    }
  }

  // Si el popupContentHtml se llenó (es decir, el pedido fue encontrado y ruteado)
  if (popupContentHtml) {
    // Aplicar estilos y mostrar
    pedidoContenedor.innerHTML = popupContentHtml;
    pedidoContenedor.classList.add('qo-popup-backdrop');
    pedidoContenedor.classList.remove('popupc2'); // Eliminamos la clase vieja
    pedidoContenedor.style.display = "flex";
  }
}

function generarPopupMozo(pedido) {
  const estadoActual = pedido.estado;
  let totalPagar = 0;
  let productosHtml = '';

  // Normalizamos: usamos pedido.productos si existe, sino probamos ambas claves
  const productos = pedido.productos || pedido.lista_Productos || pedido.Lista_Productos || [];

  if (productos.length > 0) {
    productosHtml = productos.map(item => {
      const precioUnitario = parseFloat(item.precio || item.Precio || 0);
      const cantidad = item.cantidad || 1;
      const subtotalItem = precioUnitario * cantidad;
      totalPagar += subtotalItem;

      return `
        <div class="qo-summary-item d-flex align-items-center justify-content-between">
          <div class="item-info d-flex align-items-center">
            <span class="item-icon">${getIconoProducto(item.categoria || 'utensilios')}</span> 
            <div>
              <p class="item-nombre m-0">${item.nombre}</p>
              <p class="item-precio-qty m-0 small">$${item.precio || item.Precio} x${cantidad}</p> 
            </div>
          </div>
          <span class="item-total-line">$${subtotalItem.toFixed(2)}</span>
        </div>
      `;
    }).join('');
  } else {
    productosHtml = '<p class="text-muted text-center py-3">No hay productos en este pedido.</p>';
  }

  const listoParaEntregar = estadoActual.toLowerCase() === 'listo para entregar';
  const claseBoton = listoParaEntregar ? 'qo-btn-finish' : 'qo-btn-finish-disabled';
  const disabled = listoParaEntregar ? '' : 'disabled';

  const botonHTML = `
    <button class="${claseBoton}" ${disabled} onclick="actualizarEstadoPedido(${pedido.id}, 'Entregado');">
      ENTREGAR PEDIDO
    </button>
  `;

  return `
    <div class="qo-popup-summary-content">
      <div class="popup-header">
        <h2 class="pop-pedido">Pedido N°${pedido.numero || pedido.id}</h2>
        <h4 class="pop-estado ${getClaseEstado(estadoActual)}">${estadoActual}</h4>
      </div>
      
      <div class="resumen-title">Productos:</div>
      <div class="qo-summary-scroll-area">
        ${productosHtml}
      </div>

      <div class="popup-footer-resumen">
        <div class="resumen-line total-line">
          <span class="resumen-label font-weight-bold">Total a pagar:</span>
          <span class="resumen-value font-weight-bold">$ ${totalPagar.toFixed(2)}</span> 
        </div>
      </div>
      
      <div class="popup-actions">
        <button class="qo-btn-back" onclick="cerrarPopup();">CERRAR</button>
        ${botonHTML}
      </div>
    </div>
  `;
}

function generarPopupCaja(pedido) {
  const estadoActual = pedido.estado;
  let totalPagar = 0;
  let productosHtml = '';

  const productos = pedido.productos || pedido.lista_Productos || pedido.Lista_Productos || [];

  if (productos.length > 0) {
    productosHtml = productos.map(item => {
      const precioUnitario = parseFloat(item.precio || item.Precio || 0);
      const cantidad = item.cantidad || 1;
      const subtotalItem = precioUnitario * cantidad;
      totalPagar += subtotalItem;

      return `
        <div class="qo-summary-item d-flex align-items-center justify-content-between">
          <div class="item-info d-flex align-items-center">
            <span class="item-icon">${getIconoProducto(item.categoria || 'utensilios')}</span> 
            <div>
              <p class="item-nombre m-0">${item.nombre}</p>
              <p class="item-precio-qty m-0 small">$${item.precio || item.Precio} x${cantidad}</p> 
            </div>
          </div>
          <span class="item-total-line">$${subtotalItem.toFixed(2)}</span>
        </div>
      `;
    }).join('');
  } else {
    productosHtml = '<p class="text-muted text-center py-3">No hay productos en este pedido.</p>';
  }

  const entregado = estadoActual.toLowerCase() === 'entregado';
  const claseBoton = entregado ? 'qo-btn-finish' : 'qo-btn-finish-disabled';
  const disabled = entregado ? '' : 'disabled';

  const botonHTML = `
    <button 
      class="${claseBoton}" 
      ${disabled} 
      onclick="actualizarEstadoPedido(${pedido.id}, 'Finalizado');">
      FINALIZAR CUENTA
    </button>
  `;

  return `
    <div class="qo-popup-summary-content">
      <div class="popup-header">
        <h2 class="pop-pedido">Cuenta N°${pedido.numero || pedido.id}</h2>
        <h4 class="pop-estado ${getClaseEstado(estadoActual)}">${estadoActual}</h4>
      </div>
      
      <div class="resumen-title">Productos:</div>
      <div class="qo-summary-scroll-area">
        ${productosHtml}
      </div>

      <div class="popup-footer-resumen">
        <div class="resumen-line total-line">
          <span class="resumen-label font-weight-bold">Total a pagar:</span>
          <span class="resumen-value font-weight-bold">$ ${totalPagar.toFixed(2)}</span> 
        </div>
      </div>
      
      <div class="popup-actions">
        <button class="qo-btn-back" onclick="cerrarPopup();">CERRAR</button>
        ${botonHTML}
      </div>
    </div>
  `;
}

function generarPopupCocina(pedido) {
  const estadoActual = pedido.estado;
  let productosHtml = '';
  let nuevoEstado = '';
  let textoBoton = '';
  let botonHabilitado = true;

  if (estadoActual.toLowerCase() === 'pendiente') {
    nuevoEstado = 'En Preparación';
    textoBoton = 'COMENZAR PREPARACIÓN';
  } else if (estadoActual.toLowerCase() === 'en preparación') {
    nuevoEstado = 'Listo para entregar';
    textoBoton = 'PEDIDO LISTO';
  } else {
    botonHabilitado = false;
    textoBoton = `ESTADO: ${estadoActual.toUpperCase()}`;
  }

  const claseBoton = botonHabilitado ? 'qo-btn-finish' : 'qo-btn-finish-disabled';
  const disabled = botonHabilitado ? '' : 'disabled';

  const productos = pedido.productos || pedido.lista_Productos || pedido.Lista_Productos || [];

  if (productos.length > 0) {
    productosHtml = productos.map(item => `
      <div class="qo-summary-item d-flex align-items-center justify-content-between">
        <div class="item-info d-flex align-items-center">
          <span class="item-icon">${getIconoProducto(item.categoria || 'utensilios')}</span> 
          <div>
            <p class="item-nombre m-0 font-weight-bold">${item.nombre} x${item.cantidad || 1}</p>
            <p class="item-precio-qty m-0 small text-muted">${item.descripcion || item.Descripcion || 'Sin descripción'}</p> 
          </div>
        </div>
      </div>
    `).join('');
  } else {
    productosHtml = '<p class="text-muted text-center py-3">No hay productos para preparar.</p>';
  }

  return `
    <div class="qo-popup-summary-content">
      <div class="popup-header">
        <h2 class="pop-pedido">Pedido N°${pedido.numero || pedido.id}</h2>
        <h4 class="pop-estado ${getClaseEstado(estadoActual)}">${estadoActual}</h4>
      </div>
      
      <div class="resumen-title">Elementos a preparar:</div>
      <div class="qo-summary-scroll-area">
        ${productosHtml}
      </div>

      <div class="popup-footer-resumen">
        <p class="text-muted small">Tiempo estimado: ${pedido.tiempoestimado || '30 minutos'}</p>
      </div>
      
      <div class="popup-actions">
        <button class="qo-btn-back" onclick="cerrarPopup();">CERRAR</button>
        <button class="${claseBoton}" ${disabled} onclick="actualizarEstadoPedido(${pedido.id}, '${nuevoEstado}');">
          ${textoBoton}
        </button>
      </div>
    </div>
  `;
}

function pagarPedido(idPedido) {
  cerrarPopup();
  // Ocultar el card del pedido pagado
  const card = document.getElementById(`pedido-${idPedido}`);
  if (card) {
    card.style.display = "none";
  }
}

async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
  if (!confirm(`¿Estás seguro de que quieres marcar el Pedido N°${pedidoId} como "${nuevoEstado}"?`)) {
    return;
  }

  const datosActualizacion = {
    id: pedidoId,
    estado: nuevoEstado
  };

  try {
    // Asume que RUTA_ACTUALIZACION_PEDIDO está definida globalmente
    const response = await fetch(RUTA_ACTUALIZACION_PEDIDO, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(datosActualizacion)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor.' }));
      throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
    }

    alert(`✅ Pedido N°${pedidoId} actualizado a "${nuevoEstado}".`);

    // Cierra el popup (llama a recargarListadoPedidos)
    cerrarPopup();

  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
    alert(`❌ Error al actualizar el estado: ${error.message || 'Verifique la conexión al servidor.'}`);
  }
}

function cerrarPopup() {
  const popupContenedor = document.getElementById("popup2");

  // **[CORRECCIÓN CLAVE]** Limpia la clase del fondo blur y oculta
  popupContenedor.style.display = "none";
  popupContenedor.classList.remove('qo-popup-backdrop');

  // Recargamos el listado para actualizar el estado de las tarjetas
  // (Esta función debe estar definida previamente en tu archivo JS)
  recargarListadoPedidos();
}

document.getElementById("boton-abrir2").addEventListener("click", mostrarPopup);

async function recargarListadoPedidos() {
  const user = await avanzar();  // ya la tenés definida arriba

  switch (user) {
    case "MOZO":
      await cargarPedidosMozo();
      break;
    case "CAJA":
      await cargarPedidosCaja();
      break;
    case "COCINA":
      await cargarPedidosCocina();
      break;
    default:
      // si el rol no es válido, podrías redirigir o no hacer nada
      break;
  }
}