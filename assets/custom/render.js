
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#22FFEE',
        fillOpacity: 0,
        fillColor: '#f22a77'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function highlightFeatureRegion(e) {
    var layer = e.target;
    var feature= layer.feature;
    layer.setStyle({
        weight: 3,
        color: '#22FFEE',
        fillOpacity: 0,
        fillColor: '#f22a77'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}
function highlightFeatureState(e) {
    var layer = e.target;
    // var feature= layer.feature;
    // console.log(layer);
    layer.setStyle({
        weight: 3,
        color: '#22FFEE',
        fillOpacity: 0,
        fillColor: '#f22a77' // getLegendColor(feature.properties.AveragePerState)
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetStateHighlight(e) {
    stateLayer.resetStyle(e.target);
}

function resetDisStateHighlight(e) {
    dis_stateLayer.resetStyle(e.target);
}

function resetDisRegionHighlight(e) {
    dis_regionsLayer.resetStyle(e.target);
}
function resetRegionHighlight(e) {
    regionsLayer.resetStyle(e.target);
}
function resetCityHighlight(e) {
    citiesLayer.resetStyle(e.target);
}
function resetSpHighlight(e) {
    spLayer.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function stateClicked(e) {

    let uf = e.sourceTarget.feature.properties.uf;
    // console.log(uf);
    updateValueToMesoregion(uf);
    // console.log(retValue);
    
    map.removeLayer(stateLayer);
    if(dis_stateLayer)
        map.removeLayer(dis_stateLayer);

    let center = e.target.getBounds().getCenter();
    map.setView([center.lat, center.lng], 7);
}

function regionClicked(e) {
    let regionId = parseInt(e.sourceTarget.feature.properties.mesoregion_id);
    let uf = e.sourceTarget.feature.uf
    updateValueToCity(uf, regionId);
    map.removeLayer(regionsLayer); 
    
    // let center = e.target.getBounds().getCenter();
    // map.setView([center.lat, center.lng], 8);
}

function cityClicked(e) {
    console.log(e.sourceTarget.feature.properties);
    let uf = e.sourceTarget.feature.uf;
    let mesoregion_id = parseInt(e.sourceTarget.feature.mesoregion_id);
    let city_id = parseInt(e.sourceTarget.feature.properties.id);
    updateValueToSao(uf, mesoregion_id, city_id);
    
}

function onEachFeatureState(feature, layer) {
    
    layer.on({
        mouseover: highlightFeatureState,
        mouseout: resetStateHighlight,
        click: stateClicked
    });
    // console.log(feature.properties.uf);
    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

}
function onEachFeatureDisState(feature, layer) {
    layer.on({
        // mouseover: highlightFeatureState,
        // mouseout: resetDisStateHighlight,
        click: stateClicked
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
function onEachFeatureDisRegion(feature, layer) {
    layer.on({
        // mouseover: highlightFeatureRegion,
        // mouseout: resetDisRegionHighlight,
        click: regionClicked
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
function onEachFeatureDisCity(feature, layer) {
    layer.on({
        // mouseover: highlightFeatureRegion,
        // mouseout: resetDisRegionHighlight,
        // click: regionClicked
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}

function onEachFeatureRegion(feature, layer) {
    layer.on({
        mouseover: highlightFeatureRegion,
        mouseout: resetRegionHighlight,
        click: regionClicked
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}

function onEachFeatureCity(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetCityHighlight,
        click: cityClicked
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}

function onEachFeatureSao(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetSpHighlight,
    });

    var popup = L.popup();
    let strContent = '<p style="text-align: center;"><b>' + feature.properties.name + '<br>Price: ' + feature.properties.price_m2 + '</b></p>';
    popup.setContent(strContent);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });
}
