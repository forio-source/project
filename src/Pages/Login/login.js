import { app, auth, dbFirestore } from "../../contains/config.firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const login = document.getElementById("login");
const register = document.getElementById("register");

async function registerUser(e) {
  e.preventDefault();
  const { target } = e;
  const email = target.email.value;
  const password = target.password.value;
  const name = target.name.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    alert("ok");
    localStorage.setItem("accessToken", user.accessToken);

    try {
      const docRef = await addDoc(
        collection(dbFirestore, "users"), {
          name: name,
          email: email,
          id: user.uid,
        }
      );
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    alert(error.message);
  }
}
register.addEventListener("submit", async (e) => {
  await registerUser(e);
});
