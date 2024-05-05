import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { app } from "../../../contains/config.firebase.js";
const form = document.querySelector("form");
const db = getDatabase(app);
const list = document.getElementById("list");
const listBody = list.querySelector("tbody")

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { target } = e;
    let name = target.productName.value;
    let price = Number(target.productPrice.value);
    let inStock = Number(target.inStock.value);
    let image = target.productImage.files[0];
    let description = target.productDescription.value;

    try {
        await set(ref(db, `product/${crypto.randomUUID()}`), {name, price, inStock, onSale: true, image: image ?? "https://mpmco.com/wp-content/uploads/2018/02/placeholder.jpg", description});
        location.reload();
    } catch (error) {
        console.error(error);
    }
});

onValue(ref(db, "product/"), (snap) => {
    const data = snap.val();
    for (const key in data) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td contenteditable>${data[key].name}</td>
            <td contenteditable>${data[key].price} USD</td>
            <td contenteditable>${data[key].inStock}</td>
            <td><input type="checkbox" ${data[key].onSale ? "checked" : ""}></td>
            <td style="cursor: pointer" name="delete">Delete</td>
            `;
        if (data[key].inStock == 0) {console.log(`"${data[key].name}" is ran out of stock`);}
        tr.querySelector("[contenteditable]:nth-child(1)").addEventListener("keyup", async (e) => {
            let { target } = e;
            if (e.key == "Enter") {
                await set(ref(db, `product/${key}`), {name: target.innerText, price: data[key].price, inStock: data[key].inStock, onSale: data[key].onSale, image: data[key].image, description: data[key].description});
                location.reload();
            }
        });
        tr.querySelector("[contenteditable]:nth-child(2)").addEventListener("keyup", async (e) => {
            let { target } = e;
            target.style.color = "";
            if (target.innerText == "") {
                console.error("Valid number is required");
                target.style.color = "tomato";
            }
            else if (isNaN(target.innerText)) {
                console.error("This is not a number");
                target.style.color = "tomato";
            }
            else if (target.innerText < 0) {
                console.error("Number cannot be negative");
                target.style.color = "tomato";
            }
            else if (e.key == "Enter") {
                await set(ref(db, `product/${key}`), {name: data[key].name, price: target.innerText, inStock: data[key].inStock, onSale: data[key].onSale, image: data[key].image, description: data[key].description});
                location.reload();
            }
        });
        tr.querySelector("[contenteditable]:nth-child(3)").addEventListener("keyup", async (e) => {
            let { target } = e;
            target.style.color = "";
            if (target.innerText == "") {
                console.error("Valid number is required");
                target.style.color = "tomato";
            }
            else if (isNaN(target.innerText)) {
                console.error("This is not a number");
                target.style.color = "tomato";
            }
            else if (target.innerText < 0) {
                console.error("Number cannot be negative");
                target.style.color = "tomato";
            }
            else if (e.key == "Enter") {
                await set(ref(db, `product/${key}`), {name: data[key].name, price: data[key].price, inStock: target.innerText, onSale: data[key].onSale, image: data[key].image, description: data[key].description});
                location.reload();
            }
        });
        tr.querySelector("input").addEventListener("click", async (e) => {
            if (e.target.checked) {data[key].onSale = true}
            else {data[key].onSale = false}
            await set(ref(db, `product/${key}`), {name: data[key].name, price: data[key].price, inStock: data[key].inStock, onSale: data[key].onSale, image: data[key].image, description: data[key].description});
            location.reload();
        });
        tr.querySelector("[name='delete']").addEventListener("click", async (e) => {
            if (confirm(`Do you want to delete "${data[key].name}"?`)) {
                remove(ref(db, `product/${key}`));
                location.reload();
            }
        });
        listBody.appendChild(tr);
    }
})