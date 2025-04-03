class Carrito {

    //Añadir producto al carrito
     comprarProducto(e){
        e.preventDefault();     
        //Delegado para agregar al carrito
        if (e.target.classList.contains('add-to-cart')) {  
            const product = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
             //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(product);
            
        }    
        this.carritoCounter();
        
    }
    
    //Leer datos del producto
    leerDatosProducto(product){
        const infoProduct = {         
            image: product.querySelector('.product-image a img').src,    
            title: product.querySelector('.product_name').textContent,        
            price: product.querySelector('.new-price').textContent,               
            id: product.querySelector('.add-actions ul li a').getAttribute('data-id'),
            amount:1    
        }
        
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProduct.id){
                productosLS = productoLS.id;
                
            }
            
        });

        if(productosLS === infoProduct.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            this.insertarCarrito(infoProduct);
            
        }
    //PARA MONITOREAR SI EL CODIGO FUNCIONA COMO SE ESPERA 
    
        /* console.log(infoProduct); */
        /* console.log(Carrito.length); */
    }

    //muestra producto seleccionado en carrito
    insertarCarrito(product){
        const {title, price, image, amount, id} = product;
        const row = document.createElement('li');
        row.innerHTML = `
        <a href="single-product.html" class="minicart-product-image">
            <img src="${image}" alt="cart products">
        </a>
        <div class="minicart-product-details">
            <h6><a href="single-product.html">${title}</a></h6>
            <h5 class="cart-price">${price}</h5>
            <h6>cantidad:${amount}</h6>
        </div>
            <button class="close" ><i class="fa fa-close" data-id="${id}"></i></button>
        `;
        containerBuyCart.appendChild(row);        
        this.guardarProductosLocalStorage(product);
        this.carroTotal();
        
    }    
    
    //Eliminar el producto del carrito en el DOM
    eliminarProducto(e){
        e.preventDefault(); 
        let product, productoID;
        if (e.target.classList.contains('fa-close')) {
            e.target.parentElement.parentElement.remove();
            product = e.target.parentElement.parentElement;
            productoID = product.querySelector('i').getAttribute('data-id');
        }
            
            this.eliminarProductoLocalStorage(productoID);  
            this.onRemoveButton();                  
            this.carroTotal();
            this.calcularTotal();             
            
            
        }
    
    //Almacenar en el LS
    guardarProductosLocalStorage(product){
        let allContainerCart;
        //Toma valor de un arreglo con datos del LS
        allContainerCart = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        allContainerCart.push(product);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(allContainerCart));
                
    }

      //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;

        //Comprobar si hay algo en LS
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }  
    
//Mostrar los productos guardados en el LS
leerLocalStorage(){
    
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (product){
        //Construir plantilla
        const {title, price, image, amount, id} = product;
        const row = document.createElement('li');
        row.innerHTML = `
        <a href="single-product.html" class="minicart-product-image">
            <img src="${image}" alt="cart products">
        </a>
        <div class="minicart-product-details">
            <h6><a href="single-product.html">${title}</a></h6>
            <h5 class="cart-price">${price}</h5>
            <h6>cantidad:${amount}</h6>
        </div>
            <button class="close" ><i class="fa fa-close" data-id="${id}"></i></button>
        `;
        containerBuyCart.appendChild(row);
        
    });
    
} 

//Mostrar los productos guardados en el LS en shopping-cart.html
leerLocalStorageCompra(){

    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (product){
        const {title, price, image, amount, id} = product;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="li-product-remove"><i class="fa fa-close" data-id="${id}"></i></td>
                <td class="minicart-product-image"><a href="#">
                    <img src="${image}" alt="Li's Product Image"></img></a>                
                </td>
            <td class="li-product-name"><a href="#">${title}</a></td>
            <td class="li-product-price"><span class="amount">${price}</span></td>
            <td class="quantity">
                <label>Cantidad</label>
                <div class="cart-plus-minus">
                    <input class="cart-plus-minus-box" min="0" value=${amount} type="number"></input>
                    <div class="dec qtybutton"><i class="fa fa-angle-down"></i></div>
                    <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
                </div>
            </td> 
            <td class="product-subtotal"><span class="amount" id='subtotales'>${price * amount}</span></td>
            
        `;
        listaCompra.appendChild(row);
    });
    
}
//Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);                
            }            
        }
    
    );

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
        
    }
    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
        
}
//Procesar pedido
procesarPedido(e){
    e.preventDefault();

    if(this.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío, agrega algún producto',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        location.href = "shopping-cart.html";
    }
}

//Mostrar montos carroTotal y minicarroTotal  
carroTotal(){
    let productosLS;
    let total = 0, minicart = 0, minicarroTotal = 0;
    productosLS = this.obtenerProductosLocalStorage();
for(let i = 0; i < productosLS.length; i++){
    let element = Number(productosLS[i].price * productosLS[i].amount);
    total = total + element;
    
    
}
    minicart = parseFloat(total).toFixed(2);
    minicarroTotal = parseFloat(total).toFixed(2);

    document.querySelector('div h1 strong.minicart-total').innerHTML = "$ " + minicart;
    document.querySelector('span.item-text').innerHTML = "$ " + minicarroTotal;
    
        
}

//Calcular montos
calcularTotal(){
    let productosLS;
    let total = 0, IVA = 0, subtotal = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for(let i = 0; i < productosLS.length; i++){
        let element = Number(productosLS[i].price * productosLS[i].amount);
        total = total + element;
        
    }
    
    IVA = parseFloat(total * 0.19).toFixed(2);
    subtotal = parseFloat(total-IVA);
    

    document.getElementById('subtotal').innerHTML = "$ " + subtotal.toFixed(2);
    document.getElementById('IVA').innerHTML = "$ " + IVA;
    document.getElementById('total').innerHTML = "$ " + total.toFixed(2);
    

}

obtenerEvento(e) {
    e.preventDefault();
    let id, amount, product, productosLS;
    if (e.target.classList.contains('cart-plus-minus-box')) {
        product = e.target.parentElement.parentElement.parentElement;
        id = product.querySelector('i').getAttribute('data-id');
        amount = product.querySelector('input').value;

        let actualizarMontos = document.querySelectorAll('#subtotales');
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === id) {
                productoLS.amount = amount;                    
                actualizarMontos[index].innerHTML = Number(amount * productosLS[index].price);
            }    
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
        
    }
    else {
        console.log("click afuera");
        
    }
    
}

carritoCounter() {
    
    let prdCount = localStorage.getItem('carritoCounter');
        prdCount = parseInt(prdCount);
            /* console.log(typeof prdCount); */
        if (prdCount){
            localStorage.setItem('carritoCounter', prdCount + 1);
            amountProduct.textContent = prdCount + 1;
        }else{
            localStorage.setItem('carritoCounter', 1);
            amountProduct.textContent = prdCount = 1;
    }
    
    
    }

displayCart(){
    let prdCount = localStorage.getItem('carritoCounter');
        if (prdCount){
        amountProduct.textContent = prdCount;
    }
    
}

onRemoveButton() {
    
    let prdCount = localStorage.getItem('carritoCounter');
        prdCount = parseInt(prdCount);
            /* console.log(typeof prdCount); */
        if (prdCount){
            localStorage.setItem('carritoCounter', prdCount - 1);
            amountProduct.textContent = prdCount - 1;
        }else{
            localStorage.setItem('carritoCounter', 1);
            amountProduct.textContent = prdCount = 1;
    }
    
    
    }

displayCart;


}



