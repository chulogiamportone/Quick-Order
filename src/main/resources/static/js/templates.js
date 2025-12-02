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
    } else if (pedido.estado === "Cancelado") {
      estadoColor = "#D63939";
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
    if (pedido.estado !== "En Preparación") continue;
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
    } else if (pedido.estado === "Cancelado") {
      estadoColor = "#D63939";
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

async function mostrarPopup(a, mostrarPagar = false) {
  const response = await fetch("pedidos", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const pedidos = await response.json();
  document.getElementById("popup2").style.display = "block";

  for (let pedido of pedidos.data) {
    if (pedido.id == a) {
      let productosHtml = "";
      if (pedido.lista_Productos && pedido.lista_Productos.length > 0) {
        for (let producto of pedido.lista_Productos) {
          productosHtml += `
            <div class="cargar-prod">
              <h4 class="prod">${producto.nombre}</h4>
              <div class="detalle-prod">
                <h6 class="detalle">${
                  producto.descripcion || producto.Descripcion
                }</h6>
                <h6 class="precio">${producto.precio || producto.Precio}</h6>
              </div>
            </div>`;
        }
      } else {
        productosHtml = `<div class="cargar-prod"><h4 class="prod">No hay productos</h4></div>`;
      }

      let pagarBtnHtml = "";
      if (mostrarPagar) {
        pagarBtnHtml = `<button class='btn-pagar' id='boton-pagar' onclick='javascript: pagarPedido(${pedido.id});'>Pagar</button>`;
      }

      document.getElementById("popup2").innerHTML = `
        <div class="pop-titulo"><h2 class="pop-pedido">Pedido N°${pedido.id}</h2>
        <h4 class="pop-estado">${pedido.estado}</h4></div>
        <h4 class="titulo-prod">Productos</h4>
        ${productosHtml}
        <div class="titulo-comentario">
          <div class="comentario"></div>
        </div>
        <div class="titulo-prod">
          <button class="btn-cerrar2" id="boton-cerrar2" onclick="javascript: cerrarPopup();">Cerrar</button>
          ${pagarBtnHtml}
        </div>
      `;
    }
  }
}
function pagarPedido(idPedido) {
  cerrarPopup();
  // Ocultar el card del pedido pagado
  const card = document.getElementById(`pedido-${idPedido}`);
  if (card) {
    card.style.display = "none";
  }
}

function cerrarPopup() {
  document.getElementById("popup2").style.display = "none";
}
document.getElementById("boton-abrir2").addEventListener("click", mostrarPopup);
document.getElementById("boton-cerrar2").addEventListener("click", cerrarPopup);
