import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { target } = e;
    let name = target.productName.value;
    let price = Number(target.productPrice.value);
    let image = target.productImage.files[0];
    let description = target.productDescription.value;

    const db = getDatabase();
    try {
        await set(ref(db, `product/${crypto.randomUUID()}`), {name, price, image: image ?? null, description});
        console.log('Successfully')
    } catch (error) {
        console.log(error);
    }
})