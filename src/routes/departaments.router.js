const express = require('express')
const router = express.Router()
const departamentsJSON = require('../../json/departaments.json')

// Request HTTP API RESTFUL
/*Endpoint: http://localhost:4000/api/v1/departaments */
router.get('/', (req,res)=>{
  res.json(departamentsJSON)
})

/*Endpoint: http://localhost:4000/api/v1/departaments/5 */
router.get('/:departamentId', (req, res) => {
  const { departamentId } = req.params
  const departaments_municipalities = departamentsJSON.filter(
    (departament)=>
      departament['c_digo_dane_del_departamento'] === departamentId
  );
  res.json(departaments_municipalities);

})

/*Departamentos con nombre de más de 8 caracteres */
/*Endpoint: http://localhost:4000/api/v1/departaments/name/1 */
router.get('/name/1', (req, res) => {
  const tamanoNombre = 8
  const departaments = departamentsJSON.filter(
    (departament) =>
      departament['departamento'].length > "8"
  )
  res.json(departaments)
})

/*1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20
endpoint : http://localhost:4000/api/v1/departaments/range/name
*/
router.get('/range/name', (req, res)=>{
  const departaments_name = departamentsJSON.filter(
    (departament)=>{
      return departament['c_digo_dane_del_departamento'] > '15' && departament['c_digo_dane_del_departamento'] < '20';
    }
    );

    res.json(departaments_name);
  });

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON
endpoint : http://localhost:4000/api/v1/departaments/code?departamentId=17
*/
router.get('/code', (req, res)=>{
  const {departamentId} = req.query;

  if (departamentId) {
      const departaments_municipales = departamentsJSON.filter(
        (departament)=>departament['c_digo_dane_del_departamento'] === departamentId
        );
        res.json(departaments_municipales);
      }else{
        res.json(departamentsJSON)
      }
  });

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas
endpoint : http://localhost:4000/api/v1/departaments/municipio?municipioName=Abejorral
*/
router.get('/municipio', (req, res)=>{
  const {municipioName} = req.query;

  if (municipioName !== ""){
      const municipios = departamentsJSON.filter(
        (departament)=>departament['municipio'] === municipioName
        );
        res.json(municipios);
      }else{
      const municipios_caldas = departamentsJSON.filter(
          (departament)=>departament['c_digo_dane_del_departamento'] === "18"
          );
          res.json(municipios_caldas);
      }
    });

  /*4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C"
endpoint : http://localhost:4000/api/v1/departaments/letra/C
*/
  router.get('/letra/:letra', (req, res)=>{
    const { letra } = req.params;
    const departaments = departamentsJSON.filter(
      (departament)=>
        departament['departamento'].charAt(0) === letra);
      res.json(departaments);
    })

module.exports = router