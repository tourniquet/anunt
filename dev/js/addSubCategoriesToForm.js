const addOptions = function (category) {
  var getcategoryStatus = document.getElementById('form-ad-category').value
  var addSubCategoryOptions = document.getElementById('form-ad-subcategory')

  switch (getcategoryStatus) {
    case 'realEstate':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="apartaments">Apartamente</option>
        <option value="houses">Case şi vile</option>
        <option value="lands">Terenuri</option>
        <option value="comercialEstate">Imobil comercial</option>
        <option value="garages">Garajuri</option>```
      break
    case 'transport':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="cars">Automobile</option>
        <option value="buses">Microbuze</option>
        <option value="trucks">Camioane</option>
        <option value="motorcycles">Motociclete şi ATV-uri</option>
        <option value="bikes">Biciclete</option>
        <option value="autoRepairs">Reparaţii, autoservice</option>
        <option value="transportation">Servicii transport</option>
        <option value="other">Alte tipuri</option>```
      break
    case 'repairs':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="buildingMaterials">Materiale de construcţie</option>
        <option value="equipment">Scule şi utilaje</option>
        <option value="bathroom">Tehnică sanitară</option>
        <option value="doors">Uși, ferestre, ventilare</option>
        <option value="services">Servicii</option>```
      break
    case 'furniture':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="upholstery">Mobilă moale</option>
        <option value="kitchen">Dulapuri şi bucătării</option>
        <option value="office">Mobilă de birou</option>
        <option value="interiorDesign">Design interior</option>
        <option value="other">Altele</option>```
      break
    case 'household':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="fridge">Frigidere</option>
        <option value="hob">Plite</option>
        <option value="weight">Cîntare</option>
        <option value="heater">Boilere</option>
        <option value="ohter">Altele</option>```
      break
    case 'jobs':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="offer">Oferte de lucru</option>
        <option value="requests">Cereri de lucru</option>```
      break
    case 'computers':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="desktop">Compiutere</option>
        <option value="notebooks">Notebookuri</option>
        <option value="tablets">Tablete</option>
        <option value="peripheral">Periferice</option>
        <option value="repairs">Reparaţii</option>
        <option value="other">Altele</option>```
      break
    case 'phones':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="phones">Telefoane mobile</option>
        <option value="accessories">Accesorii</option>
        <option value="repairs">Reparaţii</option>
        <option value="other">Altele</option>```
      break
    case 'clothingfootwear':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="clothing">Haine</option>
        <option value="footwear">Încălţăminte</option>
        <option value="other">Altele</option>```
      break
    case 'services':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="other">Altele</option>```
      break
    case 'other':
      addSubCategoryOptions.innerHTML = ```
        <option value="">selectaţi subcategoria</option>
        <option value="other">Altele</option>```
      break
  }
}
