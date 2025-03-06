// CARGA DE PEDIDOS SEGUN EL USUARIO
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
    default: // Si el usuario no está autenticado, lo redirige al login
      location.href = "login.html";
      break;
  }
});

// CERRAR SESION
document.querySelector(".btn-cerarSesion").addEventListener("click", function() {
    window.location.href = "login.html";
});

// USUARIO MOZO
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

    let usuarioHtml = `
    <div class="cardt"> 
		<a  onclick="javascript: mostrarPopup(${pedido.id}) class="d-card cardt-header" role="button">
			<h4 class="m-0 font-weight-bold text-primary"> Pedido N°${pedido.numero} </h4>
		</a>
	</div>
	`;

    listadoHtml += usuarioHtml;
  }

  document.getElementById("Pedidos").innerHTML = listadoHtml; 
  
  document.getElementById("btn-flotante").innerHTML = '<a href="carrito.html" class="btn-flotante" id="btn-flotante"> TOMAR PEDIDO </a>';
}

// USUARIO PERSONAL DE CAJA
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
    
	let usuarioHtml = `
    <div class="cardt"> 

		<a  onclick="javascript: mostrarPopup(${pedido.id}) class="d-card cardt-header" role="button">
			<h4 class="m-0 font-weight-bold text-primary"> Pedido N°${pedido.numero} </h4>
		</a>

    <button id="btnPagado" class="btn-pagado"> Pagado </button>
	</div>
	`;

	listadoHtml += usuarioHtml;
  }

  document.getElementById("Pedidos").innerHTML = listadoHtml;
}

// USUARIO PERSONAL DE COCINA
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
    
	let usuarioHtml = `
    <div class="cardt"> 
		<a  onclick="javascript: mostrarPopup(${pedido.id}) class="d-card cardt-header" role="button">
			<h4 class="m-0 font-weight-bold text-primary"> Pedido N°${pedido.numero} </h4>
		</a>
	</div>
	`;

    listadoHtml += usuarioHtml;
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
      document.getElementById("popup2").innerHTML =`
        <div class="pop-titulo">
			    <h2 class="pop-pedido"> Pedido N° ${pedido.id} </h2>
			    
          <h4 class="pop-estado"> ${pedido.estado} </h4>
		    </div>
		
		    <h4 class="titulo-prod"> Productos </h4>
		
        <div class="cargar-prod">
              <h4 class="prod"> titulo producto </h4>
          <div class="detalle-prod"> 
            <h6 class="detalle"> detalle </h6>
                <h6 class="precio"> precio </h6>
          </div>
        </div>
		
        <div class="titulo-comentario">
          <div class="comentario"> </div>
        </div>
		
        <div class="titulo-prod">
          <button id="boton-cerrar2" onclick="javascript: cerrarPopup();"> Cerrar </button>
        </div>"
	    `;
    }
  }
}

function cerrarPopup() {
  document.getElementById("popup2").style.display = "none";
}

document.getElementById("boton-abrir2").addEventListener("click", mostrarPopup);
document.getElementById("boton-cerrar2").addEventListener("click", cerrarPopup);