document.addEventListener("DOMContentLoaded",()=>{
    const products=[
        {id:1 , name:"Product1" , price : 29.9},
        {id:2 , name:"Product2" , price : 19.9},
        {id:3 , name:"Product3" , price : 59.9}
    ];
     

    const cart=JSON.parse(localStorage.getItem('cart')) || [];
    
    const productList=document.getElementById('product-list');
    const cartItems=document.getElementById("cart-items");
    //const emptyCartMessage=document.getElementById("empty-cart");
    const cartTotalMessage=document.getElementById('cart-total');
    const totalPrice=document.getElementById('total-price');
    const checkOutBtn=document.getElementById('checkout-btn');

    
    products.forEach((product)=>renderProduct(product));
    renderCart();
    function renderProduct(product){
       const div=document.createElement('div');
       div.classList.add('product');
       div.innerHTML=`
       <span>Product ${product.id} - ${product.price.toFixed(2)}</span>
       <button id="${product.id}">Add to Cart</button>
        `;
        div.querySelector('button').addEventListener('click',(e)=>{
            const idx=parseInt(e.target.getAttribute('id'));
            console.log(idx);
            addToCart(idx);
        })
        productList.appendChild(div);
    }
     
    function addToCart(idx){
        const product = products.find((p) => p.id === idx);
    cart.push(product);
    saveCart();
    renderCart();
    }
 
    function renderCart(){
        cartItems.innerText='';
         let totalPr=0;

        if(cart.length>0){
           // emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('cart-product')
                div.innerHTML = `
                <span >Product ${item.id} - $${item.price.toFixed(2)}</span>
                <button id="${item.id}"> delete</button>
                `;
                div.querySelector('button').addEventListener('click',(e)=>{
                     const productId=parseInt(e.target.getAttribute('id'));
                     console.log(productId);
                     deleteFromCart(productId);
                });
                cartItems.appendChild(div);
                totalPr += item.price;
            });
            totalPrice.innerText = `$${totalPr.toFixed(2)}`;
    }
    else{
        //emptyCartMessage.classList.remove('hidden');
        cartTotalMessage.classList.add('hidden');
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.innerText = 'Your cart is empty.';
        cartItems.appendChild(emptyCartMessage);
        
    }
    }
    function printTotal(){
        totalPrice.innerText=`$${total}`;
    }
    checkOutBtn.addEventListener('click',()=>{
        // cart.length=0;
        alert("checkout Successfully");
        renderCart();

    });
     
    function deleteFromCart(productId){
        const productIndex = cart.findIndex(item => item.id === productId);
        console.log(productIndex);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);  
            saveCart();                    
            renderCart();                  
        }
    }
    function saveCart(){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
});

