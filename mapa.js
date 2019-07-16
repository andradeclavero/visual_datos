// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 3
const MAP_CENTER = [-33.4444, -70.6535]

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// Se establece una constante como referencia para mostrar "Información Adicional"
const mas_info = document.getElementById("mas_info")

function MostrarDato(feature, layer) {
  // Se valida si el objeto tiene la propiedad "properties"
  if (feature.properties) {
    let dato_a_mostrar = `<p>
      <h5>Clima: ${feature.properties.nombre}</h5><br/>
    </p>`
    layer.bindPopup(dato_a_mostrar);
    layer.on({
      click: (event)=>{
        // Se obtienen los datos desde las propiedades del JSON
        let Clima = event.target.feature.properties.clasif
        let Nombre = event.target.feature.properties.nombre
        let Caract = event.target.feature.properties.caract
        let Distrib = event.target.feature.properties.distrib

        // Se genera el HTML para representar la acción de Click sobre un marcador
        let html_clima = `
          <div class="alert alert-primary" role="alert">
            <p>
              Nomenclatura de clasificación: ${Clima} <br/>
              Nombre del clima: <span class="badge badge-pill ${Nombre}" <br/>
              Características: <span class="badge badge-pill ${Caract}" <br/>
              Distribución: <span class="badge badge-pill ${Distrib}" 
            </p>
          </div>
        `
        // Se "escribe" el HTML en la página
        mas_info.innerHTML = html_clima
      }
    })
  }
}


// Se agrega data al Mapa
d3.json('./mapa.json')
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato

    }).addTo(map)
  })