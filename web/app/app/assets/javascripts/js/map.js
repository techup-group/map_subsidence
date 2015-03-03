/*global ol, $ */

var styleCache = {};
var styleFunction = function() {
    var radius = 10;
    var style = styleCache[radius];
    if (!style) {
        style = [new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 153, 0, 0.4)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 204, 0, 0.2)',
                    width: 1
                })
            })
        })];
        styleCache[radius] = style;
    }
    return style;
};

var vector = new ol.layer.Vector({
    source: new ol.source.GeoJSON({
        extractStyles: false,
        projection: 'EPSG:3857',
        url: 'gis_data/map.json'
    }),
    style: styleFunction
});

var raster = new ol.layer.Tile({
    source: new ol.source.Stamen({
        layer: 'toner'
    })
});

var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
        center: ol.proj.transform([-81.8074655,28.1989316], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

var info = $('#info');
info.tooltip({
    animation: false,
    trigger: 'manual'
});

var displayFeatureInfo = function(pixel) {
    info.css({
        left: pixel[0] + 'px',
        top: (pixel[1] - 15) + 'px'
    });
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });
    if (feature) {
        info.tooltip('hide')
            .attr('data-original-title', feature.get('name'))
            .tooltip('fixTitle')
            .tooltip('show');
    } else {
        info.tooltip('hide');
    }
};

$(map.getViewport()).on('mousemove', function(evt) {
    displayFeatureInfo(map.getEventPixel(evt.originalEvent));
});

map.on('click', function(evt) {
    displayFeatureInfo(evt.pixel);
});
