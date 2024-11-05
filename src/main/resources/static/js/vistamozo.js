//fx que se ejecuta cuando la pág está cargada
$(document).ready(function() {
	cargarProductos() //llama a la fx cargar productos
});

//Almacena los productos y sus cantidades en un carrito temporal
const carrito = {};

//fx cargar productos
async function cargarProductos() {
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});

	const productos = await response.json();

    const productList = document.getElementById('product-list');

	for (let producto of productos.data) {
		const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <span class="product-name">${producto.nombre}</span>
            <div class="cantidad">
                <button onclick="updateQuantity('${producto.nombre}', -1)">-</button>
                <span id="quantity-${producto.nombre}">0</span>
                <button onclick="updateQuantity('${producto.nombre}', 1)">+</button>
            </div>
        `;
        productList.appendChild(productItem);
	}
}

function mostrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
}

function cerrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

function toggleMenu() {
    // Obtén una referencia al menú que deseas mostrar u ocultar
    const menu = document.getElementById("menuDesplegable");

    // Verifica si el menú está actualmente oculto (display: none)
    if (menu.style.display === "none") {
        // Si está oculto, lo mostramos
        menu.style.display = "block";
    } else {
        // Si está visible, lo ocultamos
        menu.style.display = "none";
    }
}