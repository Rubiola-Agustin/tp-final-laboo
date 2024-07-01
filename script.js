const API ="https://api.yumserver.com/15273/products";

function verProductos() {
	fetch(API)
    .then((response) => response.json())
    .then(guardarProductos)
    .catch((error) => console.log("Error: ", error));
}

function guardarProductos(productos) {
    let space = ` `;
    let idcod;
    console.log(productos);
    for (let index = 0; index < productos.length; index++) {
      idcod = productos[index].idcod;
      space += `
              <tr>
                  <td>${productos[index].fecha}</td>
                  <td>${productos[index].titulo}</td>
                  <td>$${productos[index].precioPeso}</td>
                  <td>$${productos[index].precioDolar}</td>
                  <td><button class='editar' onclick="abrirFormulario('${idcod}')">Editar</button></td>
                  <td><button class='eliminar' onclick= abrirDialogEliminar('${idcod}')>Eliminar</button></td>
              </tr>
          `;
    }
    document.getElementById("muestreo").innerHTML = space;
  }

  function buscar() {
    let input = document.getElementById("busqueda").value.toLowerCase();
    console.log(input);
  
    let contenedor = document.getElementById("muestreo");
    let contar = contenedor.children;
    console.log(contenedor);
    console.log(contar);
  
    for (let i = 0; i < contar.length; i++) {
      if (contar[i].children[1].textContent.toLowerCase().includes(input)) {
        contar[i].style.display = "";
      } else{
        contar[i].style.display = "none";
      }
    }
  }


function abrirFormulario(idcod) {
    console.log(idcod);
    let dialog = document.getElementById("formularioEditar");
    dialog.showModal();
    document.getElementById("id").value = idcod;
  }

  function abrirDialogEliminar(idcod) {
    console.log(idcod);
    document.getElementById("dialogEliminar").showModal();
    document.getElementById("idEliminar").textContent = idcod;
  }
  
  function eliminarProducto() {
    let idcodEliminar = document.getElementById("idEliminar").textContent;
  
    fetch(API, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idcod: idcodEliminar,
      }),
    })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        return response.text();
      }
    })
      .then((data) => console.log(data))
      .catch((error) => console.log("Error: ", error));
  
    document.getElementById("dialogEliminar").close();
  }
  
  function cerrarDialog(id) {
    document.getElementById(id).close();
  }
  

  function editarProducto() {
    let productoEditado = {
      idcod: document.getElementById("id").value,
      titulo: document.getElementById("tituloProductoEditado").value,
      precioPeso: document.getElementById("precioPesoEditado").value,
      precioDolar: document.getElementById("precioDolarEditado").value,
      fecha: document.getElementById("fechaEditada").value,
    };
    fetch(API, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoEditado),
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          return response.text();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("Error: ", error));

      document.getElementById("editarForm").close();
    }

