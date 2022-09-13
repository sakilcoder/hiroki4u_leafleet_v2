// let statesUrl = 'https://api.imovelmetro.com.br/imo_states'; // DateKey, StateID, StateName, MinPerState, MaxPerState, AveragePerState
// let mesoregionsUrl = 'https://api.imovelmetro.com.br/imo_mesoregions'; // Date Key, Estado, Mesoregion ID, Mesoregion name, # cases, Min per Mesoregion, Max per Mesoregion, Average per Mesoregion
// let mesoregironsByStateUrl = 'https://api.imovelmetro.com.br/imo_mesoregions/'; //provide state id at end
// let citiesByMesoregionUrl = 'https://api.imovelmetro.com.br/imo_cities/'; // Data Key, id, name, state_id, mesoregion_id, price_m2 //provide mesoregion id at end
// let saopauloUrl = 'https://api.imovelmetro.com.br/sp_saopaulo'; // (city_id: 5345, meso: 3515, state: 26) id, name, state_id, region_id, price_m2, mesoregion_id -26,54,2

let statesUrl = 'https://api.imovelmetro.com.br/br'; // states
let mesoregionsUrl = 'https://api.imovelmetro.com.br/br/'; //{uf}  ---regions by state uf
let citiesByMesoregionUrl = 'https://api.imovelmetro.com.br/br/'; //{uf}/{mesoregion_id}   --cities by mesoregion_id and state uf
let neighbourhoodByCityUrl = 'https://api.imovelmetro.com.br/br/'; //{uf}/{mesoregion_id}/{city_id}
let neighbourhoodProps = 'https://api.imovelmetro.com.br/br/'; // {uf}/{mesoregion_id}/{city_id}/{neighbourhood_id}

// ------------------ example apis -------------

// http://api.imovelmetro.com.br/br
// https://api.imovelmetro.com.br/br/sp
// https://api.imovelmetro.com.br/br/sp/3515
// https://api.imovelmetro.com.br/br/sp/3515/5345
// https://api.imovelmetro.com.br/br/sp/3515/5345/e6e13147-7286-4e9e-9d56-33279298a667

