

// all variables
    let allContainerCart = document.querySelector('.pb-50');
    let containerBuyCart = document.querySelector('.minicart-product-list');
    let priceTotal = document.querySelector('span.item-text');
    let priceTotal2 = document.querySelector('div h1 strong.minicart-total');
    let amountProduct = document.querySelector('#cart-item');
    let wishlistCount = document.querySelector('.wishlist-item-count');
    let procesarCompra = document.querySelector("#procesarCompra");


    let buyThings = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCard = 0;
    let countProduct = JSON.parse(localStorage.getItem("carritoLength")) || 0;
    

// functions
    loadEventlistener();
    function loadEventlistener(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);

    }
//Agregar Producto
    function addProduct(e){
    e.preventDefault();      
    if (e.target.matches('.add-to-cart')) {  
        const selectProduct = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        readTheContent(selectProduct)
       //console.log(e.target.parentElement); 
    saveLocal ();

    }    
    
    }
// Eliminar producto 
    function deleteProduct(e) {
    e.preventDefault(); 
    if (e.target.matches('.fa-close')) {
        const deleteId = e.target.getAttribute('data-id');
        saveLocal ();

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
        
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        priceTotal2.innerHTML = 0;
        amountProduct.innerHTML = 0;
    
    }
    loadHtml();
    }

function readTheContent(product){
    const infoProduct = {         
        image: product.querySelector('.product-image a img').src,    
        title: product.querySelector('.product_name').textContent,        
        price: product.querySelector('.new-price').textContent,               
        id: product.querySelector('.add-actions ul li a').getAttribute('data-id'),
        amount:1

    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml(); 
    /* console.log(infoProduct); */
    }

//muestra producto seleccionado en carrito
    function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {title, price, image, amount, id} = product;
        const row = document.createElement ('li');
        row.classList.add('item'); 
        row.innerHTML = `
        <a href="single-product.html" class="minicart-product-image">
            <img src="${image}" alt="cart products">
        </a>
        <div class="minicart-product-details">
            <h6><a href="single-product.html">${title}</a></h6>
            <h5 class="cart-price">${price}</h5>
            <h6>cantidad:${amount}</h6>
        </div>
        <button class="close" ><i class="fa fa-close"data-id="${id}"></i></button>
        
        `;

        containerBuyCart.appendChild(row);        
        priceTotal.innerHTML = totalCard;
        priceTotal2.innerHTML = totalCard;
        amountProduct.innerHTML = countProduct; 
    });

    saveLocal (); 
    }       
    function clearHtml(){
    containerBuyCart.innerHTML = '';
    }


//GUARDAR productos en el LOCALSTORE (LS)

    // setItem
    const saveLocal= ()=> {
    localStorage.setItem("carrito", JSON.stringify(buyThings));
    }
   

    const carritoLength = buyThings.length;
        localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    

