// category.html

/* jslint es5: true, multistr: true */

var addSubCategoryToCategories = function (category) {
  var getPath = window.location.pathname.split('/');
  var addSubCategory = document.getElementById('menuList');

  switch (getPath[2]) {
    case 'realEstate':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/realEstate/apartaments">Apartamente</a></li>\
				<li><a href="/realEstate/houses">Case şi vile</a></li>\
				<li><a href="/realEstate/lands">Terenuri</a></li>\
				<li><a href="/realEstate/comercialEstate">Imobil comercial</a></li>\
				<li><a href="/realEstate/garages">Garajuri</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'transport':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/transport/cars">Automobile</a></li>\
				<li><a href="/transport/buses">Microbuze</a></li>\
				<li><a href="/transport/trucks">Camioane</a></li>\
				<li><a href="/transport/motorcycles">Motociclete şi ATV-uri</a></li>\
				<li><a href="/transport/bikes">Biciclete</a></li>\
				<li><a href="/transport/autoRepairs">Reparaţii, autoservice</a></li>\
				<li><a href="/transport/transportation">Servicii transport</a></li>\
				<li><a href="/transport/other">Alte tipuri</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'repairs':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/repairs/buildingMaterials">Materiale de construcţie</a></li>\
				<li><a href="/repairs/equipment">Scule şi utilaje</a></li>\
				<li><a href="/repairs/bathroom">Tehnică sanitară</a></li>\
				<li><a href="/repairs/doors">Uşi, ferestre</a></li>\
				<li><a href="/repairs/services">Servicii</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'furniture':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/furniture/upholstery">Mobilă moale</a></li>\
				<li><a href="/furniture/kitchen">Dulapuri şi bucătării</a></li>\
				<li><a href="/furniture/office">Mobilă de birou</a></li>\
				<li><a href="/furniture/interiorDesign">Design interior</a></li>\
				<li><a href="/furniture/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'household':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/household/fridge">Frigidere</a></li>\
				<li><a href="/household/hob">Plite</a></li>\
				<li><a href="/household/weight">Cîntare</a></li>\
				<li><a href="/household/heater">Boilere</a></li>\
				<li><a href="/household/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'jobs':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/jobs/offer">Oferte de lucru</a></li>\
				<li><a href="/jobs/requests">Cereri de lucru</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'computers':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/computers/desktop">Compiutere</a></li>\
				<li><a href="/computers/notebooks">Notebookuri</a></li>\
				<li><a href="/computers/tablets">Tablete</a></li>\
				<li><a href="/computers/peripheral">Periferice</a></li>\
				<li><a href="/computers/repairs">Reparaţii</a></li>\
				<li><a href="/computers/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'phones':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/phones/phones">Telefoane mobile</a></li>\
				<li><a href="/phones/accessories">Accesorii</a></li>\
				<li><a href="/phones/repairs">Reparaţii</a></li>\
				<li><a href="/phones/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'clothingfootwear':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/clothingfootwear/clothing">Haine</a></li>\
				<li><a href="/clothingfootwear/footwear">Încălţăminte</a></li>\
				<li><a href="/clothingfootwear/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'services':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/services/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
    case 'other':
      addSubCategory.innerHTML = '\
				<li><a href="/" id="allAds">Pagina principală</a></li>\
				<li><p></p></li>\
				<li><a href="/other/other">Altele</a></li>\
				<li><p></p></li>\
				<li><a href="/newad"><span class="btn btn-danger btn-sm">Postează anunţ</span></a></li>';
      break;
  }
};