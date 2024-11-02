$(document).ready(function() {
	revisarLogin();
});



async function revisarLogin() {
 
	 const response = await fetch('empleado/{id}', {
     method: 'GET',
     headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
     
    });
    const pedidos = await response.json();
    
    let listadoHtml='';
    let pasada=0;
    for(let pedido of pedidos){
		pasada++
		let usuarioHtml='<div class="cardt "><a href="#collapseCardT1" class="d-card cardt-header collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardT1"><h6 class="m-0 font-weight-bold text-primary">Pedido N°'+pedido.numero+'</h6></a><div class="collapse " id="collapseCardT1"><div class="cardt-body">'+pedido.Lista_Productos+'</div></div></div><tr><td>'
		
		listadoHtml+=usuarioHtml;
	}
	document.getElementById("Pedidos").innerHTML = listadoHtml;
    
  
}