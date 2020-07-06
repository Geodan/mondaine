var map;
var assetdata = { 'type': 'FeatureCollection', 'features': [] };
var current_asset_id = ''

function initmap(){

	map = new mapboxgl.Map({
		container: 'map',
		style: 'https://api.maptiler.com/maps/positron/style.json?key=DnTMUKM1IaBfW6AjV7bn',
		zoom: 15.5,
		center: [6.661585209069443, 51.91879773273479]
	});
  
  
  
	map.on('load', function () {
		
	});

	map.on('styledata', function () {
	
   map.addSource('assets', {
      type: 'geojson',
      data: assetdata
    });
	map.addLayer({
        "id": "asset_point",
        'type': 'circle',
        "source": "assets",
        'paint': {
            'circle-radius': 6,
			'circle-color': '#B42222'
        },
		'filter': ['==', '$type', 'Point']
	});
	map.addLayer({
        "id": "asset_line",
        "type": "line",
        "source": "assets",
        'paint': {
            'line-color': '#888',
			'line-width': 8
        },
		'filter': ['==', '$type', 'LineString']
	});
    map.addLayer({
        "id": "asset_poly",
        "type": "fill",
        "source": "assets",
        'paint': {
            'fill-color': '#0CFDFE',
			'fill-opacity': 0.5
        },
		'filter': ['==', '$type', 'Polygon']
	});
 
	});
 
 var GD_types = ['Consumer', 'Producer', 'Transport', 'Storage'];
 function showPopup (e) {
   var prop = e.features[0].properties;
   current_asset_id = prop.id;
   var htmlstring = '<h3>Asset</h3><p>ID:<br>' + prop.id + 
     '<br>GD type: <div id="sel_popup"></div>' +
     '<br>ESDL type: ' + prop.ESDL_type + '</p>';
   new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(htmlstring).addTo(map);
   var select = document.createElement("select");
    document.getElementById('sel_popup').appendChild(select);
    //Create and append the options
    for (var i = 0; i < GD_types.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = GD_types[i];
        select.appendChild(option);
    }
    select.value = GD_types.indexOf(prop.GD_type);
    select.addEventListener('change', function() {
      var ind = assetdata.features.findIndex(function (f) {return f.properties.id == current_asset_id;});
      assetdata.features[ind].properties.GD_type = GD_types[this.value];
      map.getSource('assets').setData(assetdata);
    });
 }
 
 map.on('click', 'asset_point', showPopup);
 map.on('click', 'asset_line', showPopup);
 map.on('click', 'asset_poly', showPopup);


	var layerList = document.getElementById('menu');
	var inputs = layerList.getElementsByTagName('input');

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = switchLayer;
	}
 
 var Draw = new MapboxDraw({
  	displayControlsDefault: false,
  	controls: {
  		point: true,
  		line_string: true,
  		polygon: true
  	}
  });

map.addControl(Draw, 'top-right');

function add2layer() {
  new_asset = Draw.getAll().features[0];
  new_asset.properties = {id: uuidv4(), GD_type: 'Consumer', ESDL_type: ''};
	assetdata.features.push(new_asset);
	map.getSource('assets').setData(assetdata);
	Draw.deleteAll();
}

map.on('draw.create', add2layer);

}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
 
function switchLayer(layer) {
	map.setStyle('https://api.maptiler.com/maps/' + layer.target.id + '/style.json?key=DnTMUKM1IaBfW6AjV7bn');
}
 
