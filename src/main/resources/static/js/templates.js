// Variable global para almacenar el cargo numérico (0: Mozo, 1: Cocina, 2: Caja)
let EMPLEADO_CARGO_NUM = -1; 
// Variable global para almacenar el cargo en texto
let EMPLEADO_CARGO_STRING = "";

// Variable para la ruta de actualización de pedidos
const RUTA_ACTUALIZACION_PEDIDO = '/api/pedidos/actualizar_estado'; 

// ------------------------------------------------------------------
// --- FUNCIONES UTILITY Y ASIGNACIÓN DE ÍCONOS ---
// ------------------------------------------------------------------

function getIconoProducto(categoria) {
    const categoriaMinuscula = categoria ? categoria.toLowerCase() : '';
 
    if (categoriaMinuscula.includes('pizza')) {
        return '<i class="fas fa-pizza-slice"></i>';
    }
    if (categoriaMinuscula.includes('sandwich') || categoriaMinuscula.includes('hamburguesa')) {
        return '<i class="fas fa-cutlery"></i>'; 
    }
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

function recargarListadoPedidos() {
    switch (EMPLEADO_CARGO_STRING) {
        case "MOZO":
            cargarPedidosMozo();
            break;
        case "CAJA":
            cargarPedidosCaja();
            break;
        case "COCINA":
            cargarPedidosCocina();
            break;
    }
}

// ------------------------------------------------------------------
// --- FUNCIÓN DE LOGIN (AVANZAR) ---
// ------------------------------------------------------------------

async function avanzar() {
  const currentUser = localStorage.getItem("USER");
  
  if (!currentUser) {
      // Si no hay usuario en Local Storage, redirigir
      return "NO_LOGUEADO";
  }
  
  try {
    const response = await fetch("/empleado", { // Usamos la ruta relativa corregida
      method: "GET",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });

    if (!response.ok) {
        // Error de API o servidor
        return "ERROR_DE_CONEXION";
    }

    const empleados = await response.json();
    
    for (let empleado of empleados.data) {
      if (empleado.usuario === currentUser) {
        
        // Asignación de variables globales de cargo
        EMPLEADO_CARGO_NUM = empleado.cargo;
        
        if (empleado.cargo === 0) {
            EMPLEADO_CARGO_STRING = "MOZO";
            return "MOZO";
        }
        if (empleado.cargo === 1) {
            EMPLEADO_CARGO_STRING = "COCINA";
            return "COCINA";
        }
        if (empleado.cargo === 2) {
            EMPLEADO_CARGO_STRING = "CAJA";
            return "CAJA";
        }
        
        return "ERROR_CARGO_INVALIDO";
      }
    }
  } catch (error) {
    console.error("Error de conexión o parseo de datos:", error);
    return "ERROR_DE_CONEXION";
  }

  // Usuario encontrado en LS pero no en la respuesta de la API
  return "USUARIO_NO_ENCONTRADO"; 
}

// ------------------------------------------------------------------
// --- BLOQUE DE INICIO Y ROUTER PRINCIPAL ---
// ------------------------------------------------------------------

$(document).ready(async function () {
  const user = await avanzar(); 

  // Manejo de errores y redirección (SOLUCIÓN AL BUCLE DE REDIRECCIÓN)
  if (user === "NO_LOGUEADO" || user === "USUARIO_NO_ENCONTRADO" || user === "ERROR_DE_CONEXION" || user === "ERROR_CARGO_INVALIDO") {
      location.href = "login";
      return; 
  }
  
  // Router de Carga (SOLO SE EJECUTA SI user ES MOZO, CAJA O COCINA)
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
  }
});

// ------------------------------------------------------------------
// --- FUNCIONES DE CARGA DE PEDIDOS ---
// ------------------------------------------------------------------

async function cargarPedidosMozo() {
    const response = await fetch("pedidos", {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    const pedidos = await response.json();

    let listadoHtml = "";
    
    for (let pedido of pedidos.data) {
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
        } else if (pedido.estado === "Cancelado") {
            estadoColor = "#D63939";
        }

        let usuarioHtml = `
            <div class="cardt ">
                <a onclick="javascript: mostrarPopup(${pedido.id});" class="d-card cardt-header" role="button">
                <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
                <p class="m-0 hora-cardt"> Hora: ${hora}</p>
                <p class="m-0 estado-cardt" style="color:${estadoColor}"> Estado: ${pedido.estado}</p>
                </a>
            </div>
        `;

        listadoHtml += usuarioHtml;
    }

    document.getElementById("Pedidos").innerHTML = listadoHtml;
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
  
  for (let pedido of pedidos.data) {
    if (pedido.estado !== "Entregado") continue;
    
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
    } else if (pedido.estado === "Cancelado") {
        estadoColor = "#D63939";
    }

    let usuarioHtml = `
        <div class="cardt " id="pedido-${pedido.id}">
            <a onclick="javascript: mostrarPopup(${pedido.id});" class="d-card cardt-header" role="button">
            <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
            <p class="m-0 hora-cardt"> Hora: ${hora}</p>
            <p class="m-0 estado-cardt" style="color:${estadoColor}"> Estado: ${pedido.estado}</p>
            </a>
        </div>
    `;

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
  
  for (let pedido of pedidos.data) {
    if (pedido.estado !== "En Preparación" && pedido.estado !== "Pendiente") continue;
    
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

    // Definir color según estado
    let estadoColor = "";

    if (pedido.estado === "En Preparación") {
        estadoColor = "#EFCF0A";
    } else if (pedido.estado === "Entregado") {
        estadoColor = "#51A360";
    } else if (pedido.estado === "Cancelado") {
        estadoColor = "#D63939";
    }

    let usuarioHtml = `
        <div class="cardt ">
            <a onclick="javascript: mostrarPopup(${pedido.id});" class="d-card cardt-header" role="button">
            <h4 class="m-0 font-weight-bold text-primary h4-cardt">Pedido N°${pedido.numero}</h4>
            <p class="m-0 hora-cardt"> Hora: ${hora}</p>
            <p class="m-0 estado-cardt" style="color:${estadoColor}"> Estado: ${pedido.estado}</p>
            </a>
        </div>
    `;

    listadoHtml += usuarioHtml;
  }

  document.getElementById("Pedidos").innerHTML = listadoHtml;
  document.getElementById("btn-flotante").innerHTML =
    '<a href="carrito" class="btn-flotante" id="btn-flotante">INICIAR PEDIDO</a>';
}

// ------------------------------------------------------------------
// --- FUNCIÓN ROUTER DE POPUP Y GENERADORES DE VISTA ---
// ------------------------------------------------------------------

async function mostrarPopup(a) {
    const response = await fetch("pedidos", {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    const pedidos = await response.json();
    
    const pedidoContenedor = document.getElementById("popup2");
    const pedidoSeleccionado = pedidos.data.find(p => p.id == a);
    
    if (!pedidoSeleccionado) return;

    let popupContentHtml = '';

    // --- ROUTER POR CARGO ---
    if (EMPLEADO_CARGO_NUM === 0) { // MOZO
        popupContentHtml = generarPopupMozo(pedidoSeleccionado);
    } else if (EMPLEADO_CARGO_NUM === 1) { // COCINA
        popupContentHtml = generarPopupCocina(pedidoSeleccionado); 
    } else if (EMPLEADO_CARGO_NUM === 2) { // CAJA
        popupContentHtml = generarPopupCaja(pedidoSeleccionado);
    } else {
        popupContentHtml = `<div class="qo-popup-summary-content"><p class="text-center">Permiso denegado o rol no reconocido.</p></div>`;
    }
    // -------------------------

    // Aplicar estilos y mostrar
    pedidoContenedor.innerHTML = popupContentHtml;
    pedidoContenedor.classList.add('qo-popup-backdrop');
    pedidoContenedor.classList.remove('popupc2'); // Eliminamos la clase vieja
    pedidoContenedor.style.display = "flex";
}

// ------------------------------------------------------------------
// --- FUNCIONES GENERADORAS POR ROL ---
// ------------------------------------------------------------------

function generarPopupMozo(pedido) {
    const estadoActual = pedido.estado;
    let totalPagar = 0; 
    let productosHtml = '';
    
    // 1. Generar productos y calcular total
    if (pedido.lista_Productos && pedido.lista_Productos.length > 0) {
        productosHtml = pedido.lista_Productos.map(item => {
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
    }

    // 2. Definir botón de acción
    const listoParaEntregar = estadoActual.toLowerCase() === 'listo para entregar';
    const claseBoton = listoParaEntregar ? 'qo-btn-finish' : 'qo-btn-finish-disabled';
    const disabled = listoParaEntregar ? '' : 'disabled';
    
    const botonHTML = `<button class="${claseBoton}" ${disabled} onclick="actualizarEstadoPedido(${pedido.id}, 'Entregado');">ENTREGAR PEDIDO</button>`;
    
    // 3. Devolver la estructura completa
    return `
        <div class="qo-popup-summary-content">
            <div class="popup-header">
                <h2 class="pop-pedido">Pedido N°${pedido.numero || pedido.id}</h2>
                <h4 class="pop-estado">${estadoActual}</h4>
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
    
    // Lógica de Secuencia del Botón
    if (estadoActual.toLowerCase() === 'nuevo pedido') {
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

    // Generar listado de productos (Nombre, Cantidad y Descripción - SIN PRECIOS)
    if (pedido.lista_Productos && pedido.lista_Productos.length > 0) {
        productosHtml = pedido.lista_Productos.map(item => `
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
    }

    return `
        <div class="qo-popup-summary-content">
            <div class="popup-header">
                <h2 class="pop-pedido">Comanda N°${pedido.numero || pedido.id}</h2>
                <h4 class="pop-estado">${estadoActual}</h4>
            </div>
            
            <div class="resumen-title">Elementos a preparar:</div>
            <div class="qo-summary-scroll-area">
                ${productosHtml}
            </div>

            <div class="popup-footer-resumen">
                <p class="text-muted small">Tiempo estimado: ${pedido.tiempoestimado || '30 minutos'}</p>
            </div>
            
            <div class="popup-actions">
                <button class="qo-btn-back" onclick="cerrarPopup();">CERRAR VISTA</button>
                <button class="${claseBoton}" ${disabled} onclick="actualizarEstadoPedido(${pedido.id}, '${nuevoEstado}');">${textoBoton}</button>
            </div>
        </div>
    `;
}

function generarPopupCaja(pedido) {
    const estadoActual = pedido.estado;
    let totalPagar = 0; 
    let productosHtml = '';
    
    // 1. Generar productos y calcular total
    if (pedido.lista_Productos && pedido.lista_Productos.length > 0) {
        productosHtml = pedido.lista_Productos.map(item => {
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
    }

    // 2. Definir botón de acción
    const entregado = estadoActual.toLowerCase() === 'entregado';
    const claseBoton = entregado ? 'qo-btn-finish' : 'qo-btn-finish-disabled';
    const disabled = entregado ? '' : 'disabled';
    
    const botonHTML = `<button class="${claseBoton}" ${disabled} onclick="actualizarEstadoPedido(${pedido.id}, 'Finalizado');">FINALIZAR CUENTA</button>`;
    
    // 3. Devolver la estructura completa
    return `
        <div class="qo-popup-summary-content">
            <div class="popup-header">
                <h2 class="pop-pedido">Pedido N°${pedido.numero || pedido.id}</h2>
                <h4 class="pop-estado">${estadoActual}</h4>
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

// ------------------------------------------------------------------
// --- FUNCIONES DE ACCIÓN (ACTUALIZACIÓN Y CIERRE) ---
// ------------------------------------------------------------------

async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
    if (!confirm(`¿Estás seguro de que quieres marcar el Pedido N°${pedidoId} como "${nuevoEstado}"?`)) {
        return;
    }
    
    const datosActualizacion = {
        id: pedidoId,
        estado: nuevoEstado
    };

    try {
        const response = await fetch(RUTA_ACTUALIZACION_PEDIDO, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(datosActualizacion)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} al actualizar el estado.`);
        }

        alert(`✅ Pedido N°${pedidoId} actualizado a "${nuevoEstado}".`);
        // Llama a cerrarPopup para recargar el listado y cerrar la ventana
        cerrarPopup(); 

    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        alert("❌ Error al contactar al servidor para actualizar el estado.");
    }
}

function cerrarPopup() {
    const popupContenedor = document.getElementById("popup2");
    popupContenedor.style.display = "none";
    popupContenedor.classList.remove('qo-popup-backdrop'); 
    
    // Recargamos el listado para actualizar el estado de las tarjetas
    recargarListadoPedidos(); 
}