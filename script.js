const products = [
    {id: 1, name:"Radio", Image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO2uhve7ufrYx1o1kK30OZhMflprAWbd_M-Q&s", price: 680},
    {id: 2, name: "Webcam",Image :"https://images-eu.ssl-images-amazon.com/images/I/81dsWgzXLrL._AC_UL450_SR450,320_.jpg", price: 680},
    {id: 3, name: "Laptop", Image: "https://m.media-amazon.com/images/I/41I1ibUjZbL._SX300_SY300_QL70_FMwebp_.jpg",price:5000},
    {id: 4, name: "Laptop", Image: "https://www.khoslaonline.com/wp-content/uploads/2023/06/ONE-PLUS-NORD-CE-2-LITE-5G-BLUE-TIDE-6GB128GB.png", price: 12456},
    {id: 5, name: "Smart Watch", Image:"https://www.jiomart.com/images/product/original/rvnjwxmr8l/punnkfunnk-kids-smart-watch-1-44-tft-display-4g-sim-card-phone-with-long-lasting-voice-call-kids-gps-music-player-alarm-clock-games-ip67-waterproof-blue-product-images-orvnjwxmr8l-p608090268-0-202402191738.jpg?im=Resize=(420,420)", price: 1399},
    {id: 6, name: "Cycle", Image : "https://m.media-amazon.com/images/I/519WwqEWnEL._SX300_SY300_QL70_FMwebp_.jpg", price: 33789},
    {id: 7, name: "Toy", Image : "https://m.media-amazon.com/images/I/41u-Ov1zdSL._SX300_SY300_QL70_FMwebp_.jpg",price:876},
    {id: 8, name: "Mobile", Image: "https://m.media-amazon.com/images/I/71sAxaLCvHL._AC_UY218_.jpg", price: 30999},
]
    //Render Products

    function renderProducts(products, productList){
    const container = document. getElementById(productList);
    container.innerHTML="";
    products. forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList. add("product-item");
    productDiv.innerHTML=`
    <img src= "${product.Image}"/>
    <h3>${product.name}</h3>
    <h2>${product.price}</h2>
    <button onclick ="addToCart(${product.id})">Add to Cart</button>
    `
    container. appendChild (productDiv);

    
})
    }
    //search functionality
    function searchProducts(query){
        const filterProducts = products.filter(product =>
            product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
        renderProducts(filterProducts,"productList");  
    }
    // Add Event listner to button
    document.getElementById("searchButton")?.addEventListener("click",() => {
        const query = document.getElementById("productSearch").value;
        searchProducts(query);

        
    })

    //Sorting
    function sortProducts(criteria){
        if(criteria === "price"){
            return products.sort((a,b) => a.price-b.price);
        }
        return products;
    }

    //Add Event listeners
    document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
        const sortedProducts = sortProducts(event.target.value);
        renderProducts(sortedProducts,"productList");
    })

// Add to cart
function addToCart(productId){
const product = products.find(p => p.id === productId);
let cart = JSON.parse(localStorage.getItem("cart"))||[];
cart.push(product);
localStorage.setItem("cart",JSON.stringify(cart));
alert(`${product.name} is added to cart`)
renderCart();
}
function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0) {
    
    container.innerHTML="<h1>Your Cart is Empty</h1>"
    
    }
    
    cart.forEach(item => {
    
    const cartDiv = document.createElement("div");
    
    cartDiv.classList.add("cart-item");
    
    cartDiv.innerHTML=`
    
    <img src="${item.Image}"/>
    <h3>${item.name}</h3>
     <h2>${item.price}</h2>
     <buttons onclick="removeFromCart(${item.id})">Remove</button>
    `
    container.appendChild(cartDiv);
    
    })
    renderSubtotal(cart);
}

//Remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !==productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}
//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}
    
    if(document.getElementById("productList")) renderProducts (products, "productList");
    
    if(document.getElementById("cartItems")) renderCart();
    
    
    