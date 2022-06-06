	var strefa = L.layerGroup();
	
	var polygon = L.polygon([
		[51.115951, 17.034725],
		[51.115759, 17.036583],
		[51.115586, 17.037739],
		[51.115788, 17.039383],
		[51.116396, 17.040198],
		[51.116514, 17.039839],
		[51.116540, 17.038354],
		[51.116508, 17.037826],
		[51.116542, 17.036705],
		[51.116503, 17.035986],
		[51.116360, 17.035484],
		[51.115995, 17.034722]
	]).addTo(strefa).bindPopup('Tutaj można legalnie pić alkohol');
	
	var zielonaIkona = L.icon({
    iconUrl: 'zabaikon.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

	var fioletowaIkona = L.icon({
    iconUrl: 'budynikon.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

	var pomaranczIkona = L.icon({
    iconUrl: 'miejsceikon.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
	

	var budynki = L.layerGroup();
	
	var gmach = L.marker([51.11393, 17.03455], {icon: fioletowaIkona}).bindPopup('<p style="text-align:center">Gmach Główny<p>Sale: 223, 309, 311, 315,<br>320, 325, 328, 332, 336.').addTo(budynki);
	var kuznicza = L.marker([51.11199, 17.03376], {icon: fioletowaIkona}).bindPopup('<p style="text-align:center">Kuźnicza 49/55</p>Sale: 220, 229, 321, 326, 327').addTo(budynki);
	var cybul = L.marker([51.11625, 17.02942], {icon: fioletowaIkona}).bindPopup('<p style="text-align:center">Cybulskiego 30 i 32<p>Sale: 151, 153, 182').addTo(budynki);
	var kosibuwa = L.marker([51.10528, 17.08929], {icon: fioletowaIkona}).bindPopup('<p style="text-align:center">Zakład Klimatologii i Ochrony Atmosfery UWr <br> (Kosibówka)</p>Sale: 12, 13, 20').addTo(budynki);
	
	var sklepy = L.layerGroup();
	
	var zabagmach = L.marker([51.11326, 17.03288], {icon: zielonaIkona}).bindPopup('Żabka - mały wielki sklep! <br> Aktualna gazetka: <a href="https://www.zabka.pl/gazetka-promocyjna" target="_blank">klik</a>').addTo(sklepy);
	var zabakuznicza = L.marker([51.11097, 17.03355], {icon: zielonaIkona}).bindPopup('Żabka - mały wielki sklep! <br> Aktualna gazetka: <a href="https://www.zabka.pl/gazetka-promocyjna" target="_blank">klik</a>').addTo(sklepy);
	var zabacybulskiego = L.marker([51.11688, 17.03200], {icon: zielonaIkona}).bindPopup('Żabka - mały wielki sklep! <br> Aktualna gazetka: <a href="https://www.zabka.pl/gazetka-promocyjna" target="_blank">klik</a>').addTo(sklepy);	
	var zabakosibuwa = L.marker([51.10307, 17.09493], {icon: zielonaIkona}).bindPopup('Żabka - mały wielki sklep! <br> Aktualna gazetka: <a href="https://www.zabka.pl/gazetka-promocyjna" target="_blank">klik</a>').addTo(sklepy);	

	var miejscaspotkan = L.layerGroup();
	
	var waly = L.marker([51.134638, 17.043741], {icon: pomaranczIkona}).bindPopup('Wały nad Odrą, jest tu też beach bar.').addTo(miejscaspotkan);
	var slodowa = L.marker([51.116157, 17.037575], {icon: pomaranczIkona}).bindPopup('Wyspa Słodowa, prawodpodobnie najbardziej <br> popularne miejsce spotkań we Wrocławiu.').addTo(miejscaspotkan);
	var xd = L.marker([51.112343, 17.043182], {icon: pomaranczIkona}).bindPopup('Bulwar X.D.').addTo(miejscaspotkan);
	var kominy = L.marker([51.120180, 17.025992], {icon: pomaranczIkona}).bindPopup('Tzw. kominy').addTo(miejscaspotkan);
	
	var map = L.map('map', {
		center: [51.110695, 17.051391],
		zoom: 13,
		layers: [budynki, strefa, sklepy]
	});
	
	var mapa = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);
	
	var baseLayers = {
	'Mapa': mapa,
	};

	
	var overlays = {
	'Budynki uczelni': budynki,
	'Strefa legalnego spożywania alkoholu': strefa,
	'Miejsca spotkań studentów i nie tylko': miejscaspotkan
	};
	
	var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
	layerControl.addOverlay(sklepy, 'Sklepy');
	
		function onLocationFound(e) {
		var radius = e.accuracy / 2;

		var locationMarker = L.marker(e.latlng).addTo(map)
			.bindPopup('Jesteś w odległości ' + radius + ' metrów od tego punktu. <br> Współrzędne punktu to: <br> Szerokość geograficzna: N ' + e.latlng.lat + '<br>Długość geograficzna: E ' + e.latlng.lng ).openPopup();

		var locationCircle = L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	
	

	map.locate({setView: true, maxZoom: 13});