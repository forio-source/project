import { modal } from "../../../contains/modal.js";

let deleteUserBtn = document.querySelectorAll(".delete");
function deleteUser() {
    console.log("Deleted");
}
deleteUserBtn.forEach(each => each.addEventListener("click", deleteUser))