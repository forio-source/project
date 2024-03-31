let productSection = document.querySelectorAll("#products-section > div");
let cart = localStorage.getItem("cart") != undefined ? JSON.parse(localStorage.getItem("cart")) : null;

productSection.forEach(each => {
    let products = each.childNodes;
    products.forEach(option => {
        if (option.nodeType == 1) {
            let name = option.querySelector("h5").innerText;
            let image = option.querySelector("img").src;
            let btn = option.querySelector("button");

            if (cart != null) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].name == name) {
                        btn.classList.add("claimed");
                    }
                }
            } 

            btn.addEventListener("click", () => {
                console.log();
                if (!btn.className.includes("claimed")) {
                    let cartData = localStorage.getItem("cart") != undefined ? JSON.parse(localStorage.getItem("cart")) : [];
                    let obj = {name: name, image: image, price: btn.childNodes[btn.childNodes.length - 2].nodeValue};
                    cartData.push(obj);
                    localStorage.setItem("cart", JSON.stringify(cartData));
                    btn.classList.add("claimed");
                }
                else {
                    btn.classList.remove("claimed");
                    let cartData = JSON.parse(localStorage.getItem("cart"));
                    for (let i = 0; i < cartData.length; i++) {
                        if (cartData[i].name == name) {
                            cartData.splice(i, 1);
                        }
                    }
                    localStorage.setItem("cart", JSON.stringify(cartData));
                }
            })
        }
    })
})