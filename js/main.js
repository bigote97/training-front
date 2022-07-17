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

fetch(url + '/listar')
.then(response => response.json())
.then(data => {
	console.log(data);
	document.title = data.Title
	createTable(data.plantas)
})
.catch(error => {
	console.error(error);
})

window.addEventListener('DOMContentLoaded', (event) => {
	listadoPlantas = JSON.parse(localStorage.getItem("plantas") || "[]");
});

function createTable(datos) {
	let tabla = document.createElement('table')
	tabla.className = 'table'
	tabla.innerHTML = `
		<thead>
			<tr>
				<th scope="col">Tipo</th>
				<th scope="col">Nombre</th>
				<th scope="col">Cosecha</th>
				<th scope="col">Siembra</th>
			</tr>
			<tbody id='tableBody'>
			</tbody>
		</thead>
	`
	addChild(listado, tabla)
	datos.forEach(dato => {
		let fila = document.createElement('tr')
		fila.innerHTML += `
			<tr>
				<td>${dato.type}</td>
				<td>${dato.name}</td>
				<td>${dato.cosecha}</td>
				<td>${dato.siembra}</td>
			</tr>
		`
		const body = document.getElementById('tableBody')
		addChild(body, fila)
	})
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
		'type': plantType,
		'name': plantName,
		'cosecha': plantCosecha,
		'siembra': plantSiembra
	}
	console.log(planta)
	storagePlantas(planta)
})

plantSearch.addEventListener('click', () => {
	let searchInput = document.getElementById('searchInput').value;
	listadoPlantas.forEach(planta => {
		let resultElement = document.createElement('div');
		resultElement.textContent = planta.name + ', ' + planta.type;
		addChild(plantSearch, resultElement);
	});
})