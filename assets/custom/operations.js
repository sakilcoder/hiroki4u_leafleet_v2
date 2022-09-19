let legendColors = [
    '#008854',
    '#13BE00', 
    // '#76E000', 
    '#ADE500', 
    '#DFFE00', 
    '#FFF730', 
    '#FBE432', 
    // '#FED500', 
    '#FFA520', 
    '#FF7B16', 
    '#FD0A06', 
    '#C80000'
];

function getLegendColor(d) {
    return d > legendValues[9] ? legendColors[9] :
                d > legendValues[8] ? legendColors[8] :
                    d > legendValues[7] ? legendColors[7] :
                        d > legendValues[6] ? legendColors[6] :
                            d > legendValues[5] ? legendColors[5] :
                                d > legendValues[4] ? legendColors[4] :
                                    d > legendValues[3] ? legendColors[3] :
                                        d > legendValues[2] ? legendColors[2] :
                                            d > legendValues[1] ? legendColors[1] : legendColors[0];
}

// function getStateColor(d) {
//     return d > 4000 ? '#C80000' :
//         d > 3000 ? '#FFA520' :
//             d > 2500 ? '#FBE432' :
//                 d > 2000 ? '#13BE00' : '#008854';
// }

// function getRegionColor(d) {
//     return d > 4000 ? '#C80000' :
//         d > 3000 ? '#FFA520' :
//             d > 2200 ? '#FBE432' :
//                 d > 1000 ? '#13BE00' : '#008854';
// }

let removeLayers = function(){
    if(stateLayer)
            map.removeLayer(stateLayer);
    if(regionsLayer)
        map.removeLayer(regionsLayer);
    if(citiesLayer)
        map.removeLayer(citiesLayer);
    if(spLayer)
        map.removeLayer(spLayer);
    if(dis_stateLayer)   
        map.removeLayer(dis_stateLayer);
    if(dis_regionsLayer)
        map.removeLayer(dis_regionsLayer);
    if(dis_cityLayer)
        map.removeLayer(dis_cityLayer);
}

let GetLegendValues = function(data){
    if(data == null){
        return;
    }
    data=data.features;
    let prices = [];
    minMax = [];
    legendValues = [];
    for (let i = 0; i < data.length; i++) {
        prices.push(data[i].properties.price_m2);
    }
    minMax.push(Math.min.apply(Math, prices));
    minMax.push(Math.max.apply(Math, prices));

    let everyIncrement = Math.ceil((minMax[1] - minMax[0])/10);

    let currentValue = minMax[0];
    legendValues.push(currentValue);

    for(i=0;i<10;i++){
        currentValue = Math.ceil(currentValue + everyIncrement);
        legendValues.push(currentValue);
    }
    strMinPrice = minMax[0] + ' R$'
    strMaxPrice = minMax[1] + ' R$'
    // console.log([prices, minMax, everyIncrement, legendValues]);
    legend.update();
}

let updateValueToStatesGeojson = function () {
    map.spin(true);

    // var parameters = L.Util.extend(defaultParameters);
    // var URL = owsrootUrl + L.Util.getParamString(parameters);
    // console.log(URL);
    // $.ajax({
    //     url : URL,
    //     dataType : 'jsonp',
    //     jsonpCallback : 'getJson',
    //     success : function (states) {
    //         console.log(states);
    //         stateLayer = L.geoJson(states, {
    //             style: styleState,
    //             onEachFeature: onEachFeatureState
    //         }).addTo(map);
    //         map.fitBounds(stateLayer.getBounds());
    //         setTimeout(function () {
    //             map.spin(false);
    //         }, 1000);
    //     },
    //     error: function (xhr, ajaxOptions, thrownError) {
    //         console.log(xhr.status);
    //         console.log(thrownError);
    //     }
    // });

    if(stateLayer && states.features.length>0){
        GetLegendValues(states);    
        removeLayers();
        stateLayer = L.geoJson(states, {
            style: styleState,
            onEachFeature: onEachFeatureState
        }).addTo(map);
        map.fitBounds(stateLayer.getBounds());
        setTimeout(function () {
            map.spin(false);
        }, 1000);
    }else{
        $.get(statesUrl, function(data, status){
            states = JSON.parse(data);
            GetLegendValues(states);    
            removeLayers();
            stateLayer = L.geoJson(states, {
                style: styleState,
                onEachFeature: onEachFeatureState
            }).addTo(map);
            map.fitBounds(stateLayer.getBounds());
            setTimeout(function () {
                map.spin(false);
            }, 1000);
        
        });
    }
    
    
}

let updateValueToMesoregion = function(uf){
    map.spin(true);
    
    let url = mesoregionsUrl+uf;
    $.get(url, function(data, status){
        filteredreg = JSON.parse(data);
        if(filteredreg.features== null){
            stateLayer.addTo(map);
            setTimeout(function () {
                map.spin(false);
            }, 1000);
            return;
        }
        // console.log(filteredreg);
        GetLegendValues(filteredreg);

        removeLayers();  
        dis_stateLayer = L.geoJson(states, {
            style: styleDisState,
            onEachFeature: onEachFeatureDisState
        }).addTo(map);

        regionsLayer = L.geoJson(filteredreg, {
            style: styleRegion,
            onEachFeature: onEachFeatureRegion
        }).addTo(map);
        map.fitBounds(regionsLayer.getBounds());
        
        setTimeout(function () {
            map.spin(false);
        }, 1000);
    });
}

let updateValueToCity = function(uf, regionId){
    map.spin(true);
        
    let url = citiesByMesoregionUrl + uf + '/'+ regionId;
    $.get(url, function(data, status){
        filtered_city = JSON.parse(data);
        console.log(filtered_city);
        GetLegendValues(filtered_city);
        
        removeLayers();
        map.addLayer(dis_stateLayer);
        dis_regionsLayer = L.geoJson(filteredreg, {
            style: styleDisRegion,
            onEachFeature: onEachFeatureDisRegion
        }).addTo(map);

        citiesLayer = L.geoJson(filtered_city, {
            style: styleCity,
            onEachFeature: onEachFeatureCity
        }).addTo(map);
        map.fitBounds(citiesLayer.getBounds());
        
        setTimeout(function () {
            map.spin(false);
        }, 1000);
    });
}

let updateValueToSao = function(uf, mesoregion_id, city_id){
    map.spin(true);
    let url = neighbourhoodByCityUrl + uf + '/' + mesoregion_id + '/' + city_id;
    $.get(url, function(data, status){
        neighbourhood = JSON.parse(data);
        console.log(neighbourhood);
        if(neighbourhood.features != null){
            
            // map.removeLayer(citiesLayer); 
            GetLegendValues(neighbourhood);

            removeLayers();
            map.addLayer(dis_stateLayer);
            map.addLayer(dis_regionsLayer);
            dis_cityLayer = L.geoJson(filtered_city, {
                style: styleDisCity,
                onEachFeature: onEachFeatureDisCity
            }).addTo(map);
            spLayer = L.geoJson(neighbourhood, {
                style: styleSao,
                onEachFeature: onEachFeatureSao
            }).addTo(map);
            map.fitBounds(spLayer.getBounds());

            
        }
        setTimeout(function () {
            map.spin(false);
        }, 100);
        
    });
}



