import {
    doc,
    getDoc,
    getFirestore,
    collection,getDocs
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { app, dbFirestore } from "../../contains/config.firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "../../contains/config.firebase.js";

let productSection = document.querySelectorAll("#products-section > div");
let cart = localStorage.getItem("cart") != undefined ? JSON.parse(localStorage.getItem("cart")) : null;
let db = getFirestore(app);

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
});

async function getUser() {
    let querySnapshot = await getDocs(collection(dbFirestore, "users"));
    console.log("user> ", querySnapshot.docs);
    querySnapshot.docs.forEach((each, index) => {
        console.log("item> ", each.data());
    })
};
onAuthStateChanged(auth, async (user) => {
    if (user) {
        let uid = user.uid;
        console.log(user);
        let docRef = doc(dbFirestore, "users", uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = docSnap.data();
            console.log(docSnap.data().name);
        }
    }
    else {
        // User is signed out
        // ...
    }
});
getUser();