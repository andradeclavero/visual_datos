module.exports = { 
    // Se define un método local, para leer contenido Web
    leerExcel: function (ARCHIVO, HOJA, callback) {
      const readXlsxFile = require('read-excel-file/node')
  
      readXlsxFile(ARCHIVO, { sheet: HOJA })
      .then((data) => {
        // console.log(data)
        let datos_extraidos = data.slice(2,10).map((item)=>{
          return { 
            "type": "Feature", 
            "properties": { 
              "clasif": item[0],
              "nombre": item[1],
              "caract": item[2],
              "distrib": item[3],
            }, 
            "geometry": { 
              "type": "Point", 
              "coordinates": item [4] 
            } 
          }
        })
  
        let geojson = {
          "type": "FeatureCollection",
          "features": datos_extraidos
        }
  
        callback(null, geojson)
      })
      .catch((error) => {
        console.log("Se produjo un error al leer el archivo: " + ARCHIVO, error)
        callback(error)
      })
    },
  
    // Se define un método local, para escribir CSV
    escribirJSON: function (data){
      const fs = require('fs');
  
      fs.writeFile('mapa.geojson', JSON.stringify(data), 'utf8', function(){
        console.log('Archivo json creado correctamente.')
      })
    }
  }