import { app, auth, dbFirestore } from "../../contains/config.firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  doc,
  setDoc,
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
      await setDoc(
        doc(dbFirestore, "users", user.uid), {
          name: name,
          email: email,
          id: user.uid,
        }
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    alert(error.message);
  }
}
async function loginUser(e) {
  e.preventDefault();
  console.log(e.target)
  const { target } = e;
  console.log(target)
  const email = target.email.value;
  const password = target.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    alert("ok");
    localStorage.setItem("accessToken", user.accessToken);

    if (user.accessToken != undefined) {
      window.location = "/src/Pages/Home/home.html"
    }
  }
  catch (error) {
    alert(error.message)
  }
}

register.addEventListener("submit", async (e) => {
  await registerUser(e);
});
login.addEventListener("submit", async (e) => {
  await loginUser(e);
});