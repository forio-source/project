import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, dbFirestore } from "/src/contains/config.firebase.js";

let users = document.querySelector("tbody");

onAuthStateChanged(auth, async () => {
    let docs = await getDocs(collection(dbFirestore, "users"));
    docs.docs.forEach(Doc => {
        let tr = document.createElement("tr");
        Doc = Doc.data();
        tr.className = Doc.disabled ? "disabled" : "";
        tr.innerHTML = `
            <td>${Doc.name}</td>
            <td>${Doc.email}</td>
            <td>
                <button class="btn style1">Disable</button>
                <button class="btn style2">Delete</button>
            </td>
        `;
        let disableUser = tr.querySelector("button.style1");
        let deleteUser = tr.querySelector("button.style2");
        disableUser.addEventListener("click", async () => {
            await setDoc(
                doc(dbFirestore, "users", Doc.id), {
                    disabled: (tr.className != "disabled"),
                },
                { merge: true }
            );
            tr.classList.toggle("disabled");
        })
        users.appendChild(tr);
    })
});
