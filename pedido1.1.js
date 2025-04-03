const carro = new Carrito();
// all variables
const carrito = document.getElementById('carrito');
const allContainerCart = document.getElementById('pb-50');
const containerBuyCart = document.querySelector('#minicart-product-list');
const procesarPedidoBtn = document.getElementById('procesar-pedido');
const amountProduct = document.querySelector('#cart-item');


/* let wishlistCount = document.querySelector('.wishlist-item-count'); */



// functions

cargarEventos();

function cargarEventos(){

    //Se ejecuta cuando se presionar agregar carrito
    allContainerCart.addEventListener('click', (e)=>{carro.comprarProducto(e)});

    //Cuando se elimina productos del carrito
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});
    
    carro.carroTotal();
    
    //Al cargar document se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    
    

    //Enviar pedido a otra pagina
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});


}



