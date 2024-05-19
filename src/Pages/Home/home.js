import {
    doc,
    getDoc,
    getFirestore,
    collection,getDocs
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { app, dbFirestore } from "../../contains/config.firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "../../contains/config.firebase.js";

// let productSection = document.querySelectorAll("#products-section > div");
let cart = localStorage.getItem("cart") != undefined ? JSON.parse(localStorage.getItem("cart")) : null;
let token = (localStorage.getItem("accessToken"));
let db = getDatabase(app);
let productInfo = document.getElementById("product-info");
let productImg = productInfo.querySelector("img");
let productName = productInfo.querySelector("h2");
let productDescription = productInfo.querySelector("p");
let products = document.querySelector("#products-section > div");
let login = document.getElementById("login");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        let uid = user.uid;
        let docSnap = await getDoc(doc(dbFirestore, "users", uid));
        if (docSnap.exists()) {
            const data = docSnap.data();
            login.innerText = data.name;
            login.addEventListener("click", () => {data.id == "eol50qWbODReNOB7JI1DLS8pBKi1" ? link('/src/Pages/Admin/Dashboard/dashboard.html') : link('/src/Pages/Login/login.html')});
        }
    };
});
onValue(ref(db, "product/"), (snap) => {
    const data = snap.val();
    for (const key in data) {
        let dataOfKey = data[key];
        let div = document.createElement("div");
        console.log(dataOfKey)
        div.innerHTML = `
            <img src="${dataOfKey.image}" alt="">
            <h5>${dataOfKey.name}</h5>
            <button class="btn style1">${dataOfKey.price}đ</button>
        `;
        let btn = div.querySelector("button");

        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name == dataOfKey.name) {
                    btn.classList.add("claimed");
                };
            };
        };

        div.addEventListener('click', (e) => {
            if (e.target != btn) {
                productInfo.classList.add("active");
                productName.innerText = dataOfKey.name;
                productImg.src = dataOfKey.image;
                productDescription.innerText = dataOfKey.description || "No description";
            }
        });
        btn.addEventListener("click", () => {
            if (!btn.className.includes("claimed")) {
                let cartData = localStorage.getItem("cart") != undefined ? JSON.parse(localStorage.getItem("cart")) : [];
                let obj = {name: dataOfKey.name};
                cartData.push(obj);
                localStorage.setItem("cart", JSON.stringify(cartData));
                btn.classList.add("claimed");
            }
            else {
                btn.classList.remove("claimed");
                let cartData = JSON.parse(localStorage.getItem("cart"));
                for (let i = 0; i < cartData.length; i++) {
                    if (cartData[i].name == dataOfKey.name) {
                        cartData.splice(i, 1);
                    };
                };
                localStorage.setItem("cart", JSON.stringify(cartData));
            }
        });
        products.appendChild(div);
    };
});