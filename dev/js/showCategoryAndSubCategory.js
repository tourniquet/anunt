// showad.html

var changeCategoryName = function() {
	var category = document.getElementById('showCategory').innerHTML;		
	var subCategory = document.getElementById('showSubCategory').innerHTML;
	
	var changeCategory = document.getElementById('showCategory');
	var changeSubCategory = document.getElementById('showSubCategory');


	switch(category) {
		case 'realEstate':
			changeCategory.innerHTML = 'Imobiliare';
			break;
		case 'transport':
			changeCategory.innerHTML = 'Transport';
			break;
		case 'repairs':
			changeCategory.innerHTML = 'Construcţii şi reparaţii';
			break;
		case 'furniture':
			changeCategory.innerHTML = 'Mobilă şi interior';
			break;
		case 'household':
			changeCategory.innerHTML = 'Tehnică de uz casnic';
			break;
		case 'jobs':
			changeCategory.innerHTML = 'Oferte de lucru';
			break;
		case 'computers':
			changeCategory.innerHTML = 'Calculatoare şi periferice';
			break;
		case 'phones':
			changeCategory.innerHTML = 'Telefoane';
			break;
		case 'clothingfootwear':
			changeCategory.innerHTML = 'Haine şi încălţăminte';
			break;
		case 'services':
			changeCategory.innerHTML = 'Servicii';
			break;
		case 'other':
			changeCategory.innerHTML = 'Altele';
			break;
	}

		switch(subCategory) {
			case 'apartaments':
				changeSubCategory.innerHTML = 'Apartamente';
				break;
			case 'houses':
				changeSubCategory.innerHTML = 'Case şi vile';
				break;
			case 'lands':
				changeSubCategory.innerHTML = 'Terenuri';
				break;
			case 'comercialEstate':
				changeSubCategory.innerHTML = 'Imobil comercial';
				break;
			case 'garages':
				changeSubCategory.innerHTML = 'Garajuri';
				break;
			case 'cars':
				changeSubCategory.innerHTML = 'Automobile';
				break;
			case 'buses':
				changeSubCategory.innerHTML = 'Microbuze';
				break;
			case 'trucks':
				changeSubCategory.innerHTML = 'Camioane';
				break;
			case 'motorcycles':
				changeSubCategory.innerHTML = 'Motociclete şi ATV-uri';
				break;
			case 'bikes':
				changeSubCategory.innerHTML = 'Biciclete';
				break;
			case 'autoRepairs':
				changeSubCategory.innerHTML = 'Reparaţii, autoservice';
				break;
			case 'transportation':
				changeSubCategory.innerHTML = 'Servicii transport';
				break;
			case 'buildingMaterials':
				changeSubCategory.innerHTML = 'Materiale de construcţie';
				break;
			case 'equipment':
				changeSubCategory.innerHTML = 'Scule şi utilaje';
				break;
			case 'bathroom':
				changeSubCategory.innerHTML = 'Tehnică sanitară';
				break;
			case 'doors':
				changeSubCategory.innerHTML = 'Uşi, ferestre';
				break;
			case 'services':
				changeSubCategory.innerHTML = 'Servicii';
				break;
			case 'upholstery':
				changeSubCategory.innerHTML = 'Mobilă moale';
				break;
			case 'kitchen':
				changeSubCategory.innerHTML = 'Dulapuri şi bucătării';
				break;
			case 'office':
				changeSubCategory.innerHTML = 'Mobilă de birou';
				break;
			case 'interiorDesign':
				changeSubCategory.innerHTML = 'Design interior';
				break;
			case 'fridge':
				changeSubCategory.innerHTML = 'Frigidere';
				break;
			case 'hob':
				changeSubCategory.innerHTML = 'Plite';
				break;
			case 'weight':
				changeSubCategory.innerHTML = 'Cîntare';
				break;
			case 'heater':
				changeSubCategory.innerHTML = 'Boilere';
				break;
			case 'offer':
				changeSubCategory.innerHTML = 'Oferte de lucru';
				break;
			case 'requests':
				changeSubCategory.innerHTML = 'Cereri de lucru';
				break;
			case 'desktop':
				changeSubCategory.innerHTML = 'Compiutere';
				break;
			case 'notebooks':
				changeSubCategory.innerHTML = 'Notebookuri';
				break;
			case 'tablets':
				changeSubCategory.innerHTML = 'Tablete';
				break;
			case 'peripherial':
				changeSubCategory.innerHTML = 'Periferice';
				break;
			case 'repairs':
				changeSubCategory.innerHTML = 'Reparaţii';
				break;
			case 'phones':
				changeSubCategory.innerHTML = 'Telefoane mobile';
				break;
			case 'accessories':
				changeSubCategory.innerHTML = 'Accesorii';
				break;
			case 'clothing':
				changeSubCategory.innerHTML = 'Haine';
				break;
			case 'footwear':
				changeSubCategory.innerHTML = 'Încălţăminte';
				break;
			case 'other':
				changeSubCategory.innerHTML = 'Altele';
				break;
	}
};

window.onload = changeCategoryName;