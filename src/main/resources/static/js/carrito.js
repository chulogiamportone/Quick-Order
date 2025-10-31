$(document).ready(function() {
	cargarProductos()
});

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remueve la clase 'active' de cualquier botón que la tenga
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agrega la clase 'active' al botón que fue clickeado
            this.classList.add('active');

            // Aquí puedes añadir más lógica, como filtrar productos
            console.log('Categoría seleccionada:', this.dataset.category);
        });
    });
}); 

async function cargarProductos() {
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});
	const productos = await response.json();
	let listadoHtml = '';

	for (let producto of productos.data) {
		let usuarioHtml = '<div class="colapin2">' +
    '<div class="cardc d-flex align-items-center justify-content-between">' + // Aplicamos Flexbox
        
        // 1. Columna del Ícono (Simulado aquí, deberías reemplazar con tu ícono)
        '<div class="card__icon-col">' +
            // Reemplaza esto con tu ícono de pizza/producto
            '<span class="producto-icono">🍕</span>' + 
        '</div>' +

        // 2. Columna del Nombre y Descripción (Estructura vertical)
        '<div class="card__info-col flex-grow-1 mx-2">' + // Ocupa espacio flexible
            '<h3 class="m-0 font-weight-bold text-primary">' + producto.nombre + '</h3>' + 
            // ASUMO QUE LA DESCRIPCIÓN ESTÁ EN OTRA PROPIEDAD 'producto.descripcion'
            '<p class="text-muted small m-0">' + producto.descripcion + '</p>' + 
        '</div>' +
        
        // 3. Columna del Valor del Producto
        '<div class="card__price-col mr-3">' +
            // Asumiendo que 'producto.precio' ahora solo contiene el valor
            '<h5 class="m-0 font-weight-bold">$' + producto.precio + '</h5>' + 
        '</div>' +

        // 4. Columna del Contador
        '<div class="card__counter-col">' +
            '<div class="card__counter">' +
                '<button class="card__btn" onclick="javascript: menos(' + producto.id + ');" id="-' + producto.id + '">-</button>' +
                '<div class="card__counter-score" id="c' + producto.id + '">0</div>' +
                '<button class="card__btn card__btn-plus" onclick="javascript: mas(' + producto.id + ');" id="+' + producto.id + '">+</button>' +
            '</div>' +
        '</div>' +

    '</div>' + // Cierre de la cardt
'</div>' // Cierre de colapin2

		listadoHtml += usuarioHtml;
	}
	document.getElementById("Carrito").innerHTML = listadoHtml;
}

async function mostrarPopup() {
	let popup=document.getElementById("popup");
	popup.style.display = "block";
	document.getElementById("boton-abrir").style.display = "none";
	document.getElementById("btnf").style.display = "none";
	const response = await fetch('productos', {
		method: 'GET',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	});
	const productos = await response.json();
	let listadoHtml = '';
	listadoHtml+='<button id="boton-cerrar" onclick="javascript: cerrarPopup();">Cerrar</button>'
	for (let producto of productos.data) {
		let content = document.getElementById("c" + producto.id).innerHTML;
		if (content != "0") {
			listadoHtml +='<div style="display=block;" ><div class="colapin2"><div class="cardt ">' +
			'<a  onclick="javascript: mostrarPopup2(' + producto.id + ');" class="d-card cardt-header " role="button">' +
			'<h6 class="m-0 font-weight-bold text-primary">Pedido N°' + producto.numero + '.                       $' +
			producto.precio + '    x'+content+'</h6></a></div></div>'
		}
	}
	popup.innerHTML = listadoHtml;
}

function cerrarPopup() {
	document.getElementById("popup").style.display = "none";
	document.getElementById("boton-abrir").style.display = "block";
	document.getElementById("btnf").style.display = "block";
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

	let content = document.getElementById("c" + a).innerHTML;
	if (content != "0") {
		content--;
	}
	document.getElementById("c" + a).innerHTML = content;
}

function mas(a) {
	let content = document.getElementById("c" + a).innerHTML;
	content++;
	document.getElementById("c" + a).innerHTML = content;
}

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remueve la clase 'active' de cualquier botón que la tenga
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agrega la clase 'active' al botón que fue clickeado
            this.classList.add('active');

            // Aquí puedes añadir más lógica, como filtrar productos
            console.log('Categoría seleccionada:', this.dataset.category);
        });
    });
});





