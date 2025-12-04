// Variable para almacenar todos los productos una vez cargados
let allProducts = [];

// **[NUEVO]** Objeto global para almacenar la cantidad de cada producto en el carrito
let shoppingCart = {};

$(document).ready(function () {
    // Carga inicial de productos
    cargarProductos();

    // Listener del botón para ABRIR el popup de carrito
    document.getElementById("boton-abrir").addEventListener("click", mostrarPopup);
});

// Listener para los botones de categoría (se ejecuta cuando el DOM está listo)
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remueve la clase 'active' de cualquier botón que la tenga
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Agrega la clase 'active' al botón que fue clickeado
            this.classList.add('active');

            // Llama a la función de filtrado con la categoría seleccionada (data-category)
            const selectedCategory = this.dataset.category;
            displayFilteredProducts(selectedCategory);
        });
    });
});

/**
 * Asigna un ícono de Font Awesome basado en la categoría del producto.
 */
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

// --- FUNCIONES ASÍNCRONAS DE BACKEND/DATOS ---

async function getNextNumeroPedido() {
    // DEBES ADAPTAR ESTA RUTA Y LÓGICA A TU BACKEND
    try {
        const response = await fetch('pedidos/proximo-numero', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });
        const data = await response.json();
        return data.proximoNumero;
    } catch (error) {
        console.error("Error al obtener el próximo número de pedido. Usando valor por defecto.", error);
        return 1001;
    }
}

// --- FUNCIÓN PRINCIPAL DE CARGA Y FILTRADO ---

async function cargarProductos() {
    try {
        const response = await fetch('productos', {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        });
        const productos = await response.json();

        // Guardamos todos los productos en la variable global
        allProducts = productos.data;

        // **[NUEVO]** Inicializa el carrito a cero para todos los productos
        allProducts.forEach(p => shoppingCart[p.id] = 0);

        // Muestra todos los productos inicialmente
        displayFilteredProducts('TODOS');

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

/**
 * Filtra los productos según la categoría y actualiza el HTML.
 */
function displayFilteredProducts(category = 'TODOS') {
    let listadoHtml = '';
    const categoryLower = category.toLowerCase();

    // 1. Filtrar los productos (Lógica de agrupación de la versión anterior)
    const productsToDisplay = allProducts.filter(producto => {
        const productoCategoriaLower = producto.categoria.toLowerCase();

        if (categoryLower === 'all' || categoryLower === 'todos') {
            return true;
        }

        if (productoCategoriaLower === categoryLower) {
            return true;
        }

        if (categoryLower.includes('pizza') && productoCategoriaLower.includes('pizza')) {
            return true;
        }

        if ((categoryLower.includes('sandwich') || categoryLower.includes('hamburguesa')) &&
            (productoCategoriaLower.includes('sandwich') || productoCategoriaLower.includes('hamburguesa'))) {
            return true;
        }

        if ((categoryLower.includes('acompaña') || categoryLower.includes('empanada')) &&
            (productoCategoriaLower.includes('acompaña') || productoCategoriaLower.includes('empanada'))) {
            return true;
        }

        if (categoryLower.includes('bebida') && productoCategoriaLower.includes('bebida')) {
            return true;
        }
        if (categoryLower.includes('postre') && productoCategoriaLower.includes('postre')) {
            return true;
        }

        return false;
    });

    // 2. Generar el HTML
    for (let producto of productsToDisplay) {
        // **[CLAVE DE CORRECCIÓN]** Leemos la cantidad del carrito global, no del DOM que desapareció.
        const currentCount = shoppingCart[producto.id] || 0;

        let usuarioHtml = '<div class="colapin2">' +
            '<div class="cardc d-flex align-items-center justify-content-between">' +

            '<div class="card__icon-col">' +
            '<span class="producto-icono">' + getIconoProducto(producto.categoria) + '</span>' +
            '</div>' +

            '<div class="card__info-col flex-grow-1 mx-2">' +
            '<h3 class="m-0 font-weight-bold text-primary">' + producto.nombre + '</h3>' +
            '<p class="text-muted small m-0">' + producto.descripcion + '</p>' +
            '</div>' +

            '<div class="card__price-col mr-3">' +
            '<h5 class="m-0 font-weight-bold">$' + producto.precio + '</h5>' +
            '</div>' +

            '<div class="card__counter-col">' +
            '<div class="card__counter">' +
            '<button class="card__btn" onclick="javascript: menos(' + producto.id + ');" id="-' + producto.id + '">-</button>' +
            // **[CLAVE DE CORRECCIÓN]** Usamos el valor del carrito para mostrar.
            '<div class="card__counter-score" id="c' + producto.id + '">' + currentCount + '</div>' +
            '<button class="card__btn card__btn-plus" onclick="javascript: mas(' + producto.id + ');" id="+' + producto.id + '">+</button>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '</div>';

        listadoHtml += usuarioHtml;
    }
    document.getElementById("Carrito").innerHTML = listadoHtml;
}

// --- FUNCIONES DE POPUP Y CARRITO ---

async function mostrarPopup() {
    let popup = document.getElementById("popup");

    popup.classList.add('qo-popup-backdrop');
    popup.style.display = "flex";

    document.getElementById("boton-abrir").style.display = "none";
    document.getElementById("btnf").style.display = "none";

    const proximoNumeroPedido = await getNextNumeroPedido();

    let popupContentHtml = '';
    let subtotalCalculado = 0;

    // ... (Código de cabecera HTML, igual al que tenías) ...
    popupContentHtml += `
        <div class="popup-header">
            <h2>Pedido N°${proximoNumeroPedido}</h2>
            <button class="btn-mesa" onclick="javascript: relacionarMesaPedido(${proximoNumeroPedido});">
                N° de MESA: - <span id="numero-mesa-display">0</span> <i class="fas fa-plus"></i>
            </button>
        </div>
        <div class="resumen-title">Resumen:</div>
        
        <div class="qo-summary-scroll-area">
    `;


    // --- 2. GENERACIÓN DE TARJETAS DE PRODUCTOS SELECCIONADOS ---
    // Recorremos ALLPRODUCTS, no la respuesta del fetch, para usar el array global
    for (let producto of allProducts) {
        // **[CLAVE DE CORRECCIÓN]** Usamos el carrito global
        let cantidad = shoppingCart[producto.id] || 0;

        if (cantidad > 0) {
            const precioUnitario = parseFloat(producto.precio.replace ? producto.precio.replace(/[$.]/g, '') : producto.precio);
            subtotalCalculado += precioUnitario * cantidad;

            popupContentHtml += `
                <div class="qo-summary-item d-flex align-items-center justify-content-between">
                    
                    <div class="item-info d-flex align-items-center">
                        <span class="item-icon">${getIconoProducto(producto.categoria)}</span> 
                        <div>
                            <p class="item-nombre m-0">${producto.nombre}</p>
                            <p class="item-precio-qty m-0 small">$${producto.precio} x${cantidad}</p> 
                        </div>
                    </div>
                    
                    <div class="item-actions d-flex align-items-center">
                        <div class="card__counter qo-counter-compact mx-3">
                            <button class="card__btn" onclick="javascript: menos(${producto.id});">-</button>
                            <div class="card__counter-score">${cantidad}</div>
                            <button class="card__btn card__btn-plus" onclick="javascript: mas(${producto.id});">+</button>
                        </div>
                        
                        <button class="btn-eliminar-item" onclick="javascript: eliminarProductoCarrito(${producto.id});">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Cierre del contenedor de scroll
    popupContentHtml += `</div>`;

    // --- 3. PIE DE PÁGINA: Resumen de Totales y Botones de Acción ---
    const totalPagar = subtotalCalculado.toFixed(2);
    // ... (Código de pie de página HTML, igual al que tenías) ...
    popupContentHtml += `
        <div class="popup-footer-resumen">
            <div class="resumen-line">
                <span class="resumen-label">Subtotal:</span>
                <span class="resumen-value">$ ${subtotalCalculado.toFixed(2)}</span>
            </div>
            <div class="resumen-line">
                <span class="resumen-label">Descuento:</span>
                <span class="resumen-value">$ 0.00</span>
            </div>
            <div class="resumen-line total-line">
                <span class="resumen-label font-weight-bold">Total a pagar:</span>
                <span class="resumen-value font-weight-bold">$ ${totalPagar}</span>
            </div>
        </div>
        
        <div class="popup-actions">
            <button class="qo-btn-back" onclick="javascript: cerrarPopup();">ATRAS</button>
            <button class="qo-btn-finish" onclick="javascript: crearPedido();">TERMINAR PEDIDO</button>
        </div>
    `;

    popup.innerHTML = `<div class="qo-popup-summary-content">${popupContentHtml}</div>`;
}


function cerrarPopup() {
    let popup = document.getElementById("popup");

    popup.classList.remove('qo-popup-backdrop');
    popup.style.display = "none";

    document.getElementById("boton-abrir").style.display = "block";
    document.getElementById("btnf").style.display = "block";
}


// --- FUNCIONES DE MANIPULACIÓN DE CANTIDAD ---

function menos(a) {
    // **[CLAVE DE CORRECCIÓN]** Manipulamos el carrito global y el DOM
    let content = shoppingCart[a] || 0;
    if (content > 0) {
        content = content - 1;
    }
    shoppingCart[a] = content;

    // Si el contador del producto existe en el DOM, lo actualizamos.
    const counterElement = document.getElementById("c" + a);
    if (counterElement) {
        counterElement.innerHTML = content;
    }

    // Si el popup está visible, recárgalo para que la lista se actualice
    if (document.getElementById("popup").style.display === "flex") {
        mostrarPopup();
    }
}

function mas(a) {
    // **[CLAVE DE CORRECCIÓN]** Manipulamos el carrito global y el DOM
    let content = shoppingCart[a] || 0;
    content = content + 1;
    shoppingCart[a] = content;

    // Si el contador del producto existe en el DOM, lo actualizamos.
    const counterElement = document.getElementById("c" + a);
    if (counterElement) {
        counterElement.innerHTML = content;
    }

    // Si el popup está visible, recárgalo para que la lista se actualice
    if (document.getElementById("popup").style.display === "flex") {
        mostrarPopup();
    }
}

function eliminarProductoCarrito(id) {
    // **[CLAVE DE CORRECCIÓN]** Poner el contador del producto a 0 en el carrito global
    shoppingCart[id] = 0;

    // Y actualizar el DOM si es visible
    const counterElement = document.getElementById("c" + id);
    if (counterElement) {
        counterElement.innerHTML = "0";
    }

    // Vuelve a cargar el popup para que el producto desaparezca de la lista
    mostrarPopup();
}

// ... (Resto de las funciones: relacionarMesaPedido y crearPedido, que siguen pendientes) ...

function relacionarMesaPedido(pedidoId) {
    alert(`Lógica para seleccionar mesa y relacionarla con Pedido N°${pedidoId}`);
}


async function crearPedido() {
    try {
        const pedidoData = {
            empleado: { id: 1 },
            Lista_Productos: [],
            Lista_Mesas: []
        };

        // Productos
        for (let producto of allProducts) {
            const cantidad = shoppingCart[producto.id] || 0;
            if (cantidad > 0) {
                pedidoData.Lista_Productos.push({
                    id: producto.id,
                    cantidad: cantidad  // ← Agrega esto
                });
            }
        }

        // Mesa
        const mesaSeleccionada = document.getElementById("numero-mesa-display").textContent;
        if (mesaSeleccionada && mesaSeleccionada !== "0") {
            pedidoData.Lista_Mesas.push({ id: parseInt(mesaSeleccionada) });
        }

        console.log("Enviando pedidoData:", pedidoData);

        const response = await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedidoData)
        });

        console.log("Status POST /pedidos:", response.status);

        const data = await response.json();
        console.log("Respuesta backend:", data);

        if (data.message === "Guardado") {
            alert("✅ Pedido guardado correctamente en la base de datos");
        } else {
            alert("❌ Error al guardar pedido: " + (data.message || "Error desconocido"));
        }
    } catch (error) {
        console.error("Error al crear pedido:", error);
        alert("Ocurrió un error al intentar guardar el pedido.");
    }

   
}