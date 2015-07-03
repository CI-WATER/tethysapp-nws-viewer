// Add all layers to the map

// Global variables
var play = true;

// Declare urls for the arcgis servers
var url_hazards = 'http://gis.srh.noaa.gov/arcgis/rest/services/' + 'cpc_weather_hazards/MapServer';
var url_gauges = 'http://gis.srh.noaa.gov/arcgis/rest/services/' + 'ahps_gauges/MapServer';
var url_flood = 'http://gis.srh.noaa.gov/arcgis/rest/services/' + 'FOP/MapServer';
var url_precip = 'http://gis.srh.noaa.gov/arcgis/rest/services/' + 'QPF/MapServer';

// Add arc gis layer
var hazardsLayer = new ol.layer.Tile({
  source: new ol.source.TileArcGISRest({
  	url: url_hazards
  }),
  visible: false,
});

var gaugesLayer = new ol.layer.Tile({
  source: new ol.source.TileArcGISRest({
    url: url_gauges
  }),
  visible: false,
});

var floodLayer = new ol.layer.Tile({
  source: new ol.source.TileArcGISRest({
    url: url_flood
  }),
  visible: false,
});

var precipLayer = new ol.layer.Tile({
  source: new ol.source.TileArcGISRest({
    url: url_precip
  }),
  visible: false,
});

// Function to turn layers visibility off
function turnOffLayer(layer) {
  return layer.setVisible(false);
}

// Function to turn layers visibility on
function turnOnLayer(layer) {
  return layer.setVisible(true);
}

// Function to add layers to map plot
function addLayers() {
  // Declare map plot
  var map_plot = TETHYS_MAP_VIEW.getMap();

  // Add all layers to map
  map_plot.addLayer(hazardsLayer);
  map_plot.addLayer(gaugesLayer);
  map_plot.addLayer(floodLayer);
  map_plot.addLayer(precipLayer);
}

// Function to turn visibility on and off with set intervals
function animateLayersOff(layer, time) {
  return setInterval(function() {turnOffLayer(layer)}, time);
}

// Function to turn visibility on and off with set intervals
function animateLayersOn(layer, time) {
  return setInterval(function() {turnOnLayer(layer)}, time);
}

// function to animate the different layers
function animationLoop (layers, timeStep, loop) {
  loop = typeof loop !== 'undefined' ? loop : false;

  if(!play) {
    return;
  }

  // find length of array
  var arrayLength = layers.length;
  var activeLayer = null;

  function advance(i) {
    // set i to zero if it's not defined
    i = i || 0;
    // set active layer to false if i is not zero. For first layer
    if (i !== 0) {
      activeLayer.setVisible(false);
    } else {
      layers[arrayLength - 1].setVisible(false);
    }
    // set active layer to first layer in array
    activeLayer = layers[i];
    // set first layer to
    activeLayer.setVisible(true);
    
    if(!play) {
      activeLayer.setVisible(false);
      return;
    }

    // if statement 
    if (i < arrayLength - 1) {
      i++;
      setTimeout(function() { advance(i); }, timeStep);
    } else if (loop) {
      i = 0;
      setTimeout(function() { advance(i); }, timeStep);
    }
  }
  // call the function
  advance();  
}

// Add animation with the time steps I specify
$(document).ready(function() {
  addLayers();
});

// define the layer array for the map
var layerArray = [hazardsLayer, gaugesLayer, floodLayer, precipLayer];

// function to hide the dismiss box when the 'x' is clicked
$(function(){
    $("[data-hide]").on("click", function(){
        $(this).closest("." + $(this).attr("data-hide")).hide();
    });
});

// Add animation loop function to "Start Animation" button when clicked
$('#animateBtn button').click(function() {
  var timeStep = $('#timeInc').val();
  if (timeStep !== "") {
    play = true;
    animationLoop(layerArray, timeStep * 1000, true);
  } else{
    $('#timeStepAlert').show();
  };
});

// Click event for the stop animation button
$('#stopAnimation button').click(function() {
  play = false;
});

// On Change event for slider
$("input[type='range']").on('change', function() {
  // find the value of the slider
  var timeSliderVal = $('#timeStepSlider').val();
  console.log(timeSliderVal);
  if (timeSliderVal !== "") {
    play = true;
    animationLoop(layerArray, timeSliderVal * 1000, true);
  } else {
    $('timeStepAlert').show();
  };
});


