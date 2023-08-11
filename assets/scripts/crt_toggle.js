const toggleCrt = document.getElementById("toggleCrt");
const div = document.getElementsByClassName("crt")[0];

toggleCrt.addEventListener("click", () => {
  div.className = !div.className ? "crt" : "";
});
