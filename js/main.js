let url = 'http://localhost:5000'
let listadoPlantas = [];

let homeButton = document.getElementById('homeButton');
let searchButton = document.getElementById('searchButton');
let listadoButton = document.getElementById('listadoButton');
let agregarButton = document.getElementById('agregarButton');

let home = document.getElementById('home');
let plantSearch = document.getElementById('plantSearch');
let listado = document.getElementById('listado');
let agregar = document.getElementById('agregar');
let plantSearcher = document.getElementById('plantSearcher');
let formAgregarSender = document.getElementById('formAgregarSender');

const listar = () => {
	fetch(url + '/listar')
	.then(response => response.json())
	.then(data => {
		document.title = data.Title
		console.log(data)
		createTable(data.listadoPlantas, listado)
	})
	.catch(error => {
		console.error(error);
	})
}

window.addEventListener('DOMContentLoaded', (event) => {
	listadoPlantas = JSON.parse(localStorage.getItem("plantas") || "[]");
});

function createTable(datos, section) {
	while (section.firstChild) {
		section.removeChild(section.firstChild);
	}
	let tabla = document.createElement('table')
	tabla.setAttribute("id", `${section.id}Table`);
	tabla.className = 'table'
	tabla.innerHTML = `
		<thead>
			<tr>
				<th scope="col">ID</th>
				<th scope="col">Tipo</th>
				<th scope="col">Nombre</th>
				<th scope="col">Cosecha</th>
				<th scope="col">Siembra</th>
				<th scope="col">Editar</th>
			</tr>
			<tbody id='tableBody'>
			</tbody>
		</thead>
	`
	addChild(section, tabla)
	datos.forEach(dato => {
		let fila = document.createElement('tr')
		fila.innerHTML += `
			<tr>
				<td>${dato._id}</td>
				<td>${dato.tipo}</td>
				<td>${dato.name}</td>
				<td>${dato.cosecha}</td>
				<td>${dato.siembra}</td>
			</tr>
		`
		const thEdit = document.createElement('th')		
		thEdit.innerHTML = `<td><img class="pencil-icon" src="../images/pencil-icon.svg"></td>`
		thEdit.onclick = function () {
			editPlanta(dato._id);
		};
		const tableBody = document.getElementById('tableBody')
		addChild(tableBody, fila)
		addChild(fila, thEdit)
	})
}

function editPlanta(idPlanta) {
	fetch(`${url}/editar`, {
		method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		body: JSON.stringify({'id': idPlanta})
	  }).then(function(response) {
		return response.json();
	  }).then(function(data) {
		console.log('log:', data);
	  });
}

function storagePlantas(planta) {
	listadoPlantas = JSON.parse(localStorage.getItem("plantas") || "[]");
	listadoPlantas.push(planta)
	localStorage.setItem("plantas", JSON.stringify(listadoPlantas));
}

function addChild(parent, child) {
	parent.appendChild(child)
}

homeButton.addEventListener('click', () => {
	plantSearch.style.display = 'none';
	listado.style.display = 'none';
	agregar.style.display = 'none';
	home.style.display = 'block';
})

searchButton.addEventListener('click', () => {
	home.style.display = 'none';
	listado.style.display = 'none';
	agregar.style.display = 'none';
	plantSearch.style.display = 'block';
})

listadoButton.addEventListener('click', () => {
	listar()
	plantSearch.style.display = 'none';
	home.style.display = 'none';
	agregar.style.display = 'none';
	listado.style.display = 'block';
})

agregarButton.addEventListener('click', () => {
	plantSearch.style.display = 'none';
	listado.style.display = 'none';
	home.style.display = 'none';
	agregar.style.display = 'block';
})

formAgregarSender.addEventListener('click', (event) => {
	let plantType = document.getElementById('typeSelector').value;
	let plantName = document.getElementById('plantName').value;
	let plantSiembra = document.getElementById('plantSiembra').value;
	let plantCosecha = document.getElementById('plantCosecha').value;
	let planta = {
		'tipo': plantType,
		'name': plantName,
		'cosecha': plantCosecha,
		'siembra': plantSiembra
	}
	storagePlantas(planta)
	fetch(`${url}/nueva`, {
    method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
    body: JSON.stringify(planta)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('log:', data);
  });
})

plantSearcher.addEventListener('click', () => {
	let searchInput = document.getElementById('searchInput').value;
	fetch(`${url}/buscar/${searchInput}`
	).then(function(response) {
    return response.json();
  }).then(function(data) {
		// let tableData = []
		// tableData.push(data.plantaEncotrada)
		createTable(data.plantaEncotrada, plantSearch)
  });
})