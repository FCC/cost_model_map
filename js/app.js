$(document).ready(function () {
  // help text
  map.on('zoomend', function() {
    if (map.getZoom() >= 9) {
      $('#help-text').text("You can now click / touch tracts to display details.")
        .addClass('good');
    } else {
      $('#help-text').text("Zoom in to display tract level details on click / touch below.")
        .removeClass('good');
    }
  });
});

var map = L.mapbox.map('map', 'fcc.map-kzt95hy6,fcc.pj3mobt9', { attributionControl: false,gridControl: false, maxZoom:10 })
            .setView([38.82, -94.96], 4);
map.scrollWheelZoom.disable();

var hash = L.hash(map);

L.control.fullscreen().addTo(map);
var activeLayerGroup = new L.LayerGroup();
var cam411_TL = L.mapbox.tileLayer('fcc.h9d1v2t9')
                  .on('load',function(){ cam411_TL.removeEventListener(); })
var cam411_GL = L.mapbox.gridLayer('fcc.h9d1v2t9');
var cam411_GC = L.mapbox.gridControl(cam411_GL, { follow: true });
var tileName = "cam411";

activeLayerGroup.addLayer(cam411_TL);
activeLayerGroup.addLayer(cam411_GL);
activeLayerGroup.addLayer(cam411_GC);
activeLayerGroup.addTo(map);

var cam411_10_768_TL = L.mapbox.tileLayer('fcc.hjl40a4i');
var cam411_10_768_GL = L.mapbox.gridLayer('fcc.hjl40a4i');
var cam411_10_768_GC = L.mapbox.gridControl(cam411_10_768_GL, { follow: true });

// Display the map data in the sidebar
map.gridLayer.on('click',function(o) {
  var data;
  if (o.data != undefined) {
     data = o.data;   
    // Populate location other stats (teaser fields from map)
    $('#stat-cnty').text(data.county_name);
    $('#stat-state').text(data.state);    
    $('#stat-tract').text(data.tract);
    // Additional Cost Stats (teaser fields from map)   
    $('#stat-pclocbtwn').text(data.pc_locations_between);
    $('#stat-pclocabv').text(data.pc_locations_above_ttc);
    $('#stat-pcannsup').text(formatComma(data.pc_annual_support));
  } else { // Reset the text labels
    $('#stat-tract, #stat-cnty, #stat-pcannsup, #stat-pclocbtwn, #stat-pclocabv').text('---');
    $('#stat-state').text('--');
    //$('#dl-numLocs').find('span').text('-----');  
  }
});      

// Format dummy data with commas
function formatComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 