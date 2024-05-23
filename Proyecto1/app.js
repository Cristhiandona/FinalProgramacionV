
const API_URL = 'http://localhost:3000/products';
let products = [];
let deleteId = null;

window.addEventListener('DOMContentLoaded', () => {
  getProducts();
})

const getProducts = () => {
  fetch(API_URL)
  .then(response => response.json())
  .catch(error => {
    alertManager('error', 'Ocurrió un problema al cargar los productos');
  })
  .then(data => {
    products = data.data;
    renderResult(products);
  })
}

const productsList = document.querySelector('#productsList');

const renderResult = (products) => {
  let listHTML = "";
  products.forEach(product => {
    listHTML += `
      <div class="card">
        <div>Id: ${product.id}</div>
        <div>Nombre: ${product.name}</div>
        <div>Categoria: ${product.category}</div>
        <div>Descripcion: ${product.description}</div>
        <div>Precio: ${product.price}</div>
        <div>Fecha Creacion: ${product.createdAt}</div>
        <div>Fecha Actualizacion: ${product.updatedAt}</div>
        <div class="options">
          <button type="button" class="caution" onclick="openModalConfirm(${product.id})">Eliminar</button>
        </div>
      </div>
    `
  })
  productsList.innerHTML = listHTML;
}

const createProduct = () => {
  const formData = new FormData(document.querySelector('#formAdd'));

  if(!formData.get('name') || !formData.get('category') || !formData.get('description') || !formData.get('price') || !formData.get('createdAt') || !formData.get('updatedAt'))  {
    document.querySelector('#msgFormAdd').innerHTML = '* Faltan Campos por Diligenciar';
    return;
  }
  document.querySelector('#msgFormAdd').innerHTML = '';

  const product = {
    Id: formData.get('id'),
    Nombre: formData.get('name'),
    Categoria: formData.get('category'),
    Descripcion: formData.get('description'),
    Precio: formData.get('price'),
    Fechadecreacion: formData.get('createdAt'),
    FechadeActualizacion: formData.get('updatedAt'),
  }

  console.log(product)

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => {
    alertManager('error', error);
    document.querySelector('#formAdd').reset();
  })
  .then(response => {
    alertManager('success', response.mensaje)
    getProducts();
  })
}

const deleteProduct = (id) => {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .catch(error => {
    alertManager('error', error);
  })
  .then(response => {
    alertManager('success', response.mensaje);
    closeModalConfirm();
    getProducts();
    deleteId = null;
  })
}
const confirmDelete = (res) => {
  if(res){
    deleteProduct(deleteId);
  } else {
    closeModalConfirm();
  }
}

// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');

btnAdd.onclick = () => openModalAdd();

window.onclick = function(event) {
  if (event.target == modalAdd) {
    //modalAdd.style.display = "none";
  }
}

const closeModalAdd = () => {
  modalAdd.style.display = 'none';
}

const openModalAdd = () => {
  modalAdd.style.display = 'block';
}

// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById('modalConfirm');

window.onclick = function(event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  }
}

const closeModalConfirm = () => {
  modalConfirm.style.display = 'none';
}

const openModalConfirm = (id) => {
  deleteId = id;
  modalConfirm.style.display = 'block';
}

/** ALERT */
const alertManager = (typeMsg, message) => {
  const alert = document.querySelector('#alert');

  alert.innerHTML = message || 'Se produjo cambios';
  alert.classList.add(typeMsg);
  alert.style.display = 'block';

  setTimeout(() => {
    alert.style.display = 'none';
    alert.classList.remove(typeMsg);
  }, 3500);
}