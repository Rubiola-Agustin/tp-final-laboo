const API = "https://api.yumserver.com/15273/products";
function agregarProductos() {
  let nuevoProducto = {
    titulo: document
      .getElementById("tituloProducto")
      .value.trim()
      .toLowerCase(),
    precioPeso: document.getElementById("precioPeso").value.trim(),
    precioDolar: document.getElementById("precioDolar").value.trim(),
    fecha: document.getElementById("fecha").value.trim(),
  };

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "OK") {
        location.href = "index.html";
      } else {
        alert(data);
      }
    })
    .catch((error) => console.log("Error: ", error));
}
