export interface CityModel {
    id: number;
    name: string;
    temperature: number;
    airPressure: number;
    humidity: number;
    picture: string;
    coords: google.maps.LatLngLiteral;
}

export var citiesInfo: CityModel[] = [{
    id: 1,
    name: 'Sait-Petersburg',
    temperature: 10,
    airPressure: 764,
    humidity: 80,
    picture: 'https://pp.userapi.com/c623419/v623419420/326a5/vBn6qfGGrro.jpg',
    coords: { lat: 59.57, lng: 30.19 }
}, {
    id: 2,
    name: 'New York',
    temperature: 15,
    airPressure: 700,
    humidity: 69,
    picture: 'https://www.tripsavvy.com/thmb/tprq2yCdB7EURb66Y_qOI-7_x7A=/2121x1414/filters:fill(auto,1)/nyc-chinatown-view-5c2e485e4cedfd00019e15fc.jpg',
    coords: { lat: 40.71, lng: -74.00 }
}, {
    id: 3,
    name: 'Moscow',
    temperature: 12,
    airPressure: 755,
    humidity: 62,
    picture: 'http://images.chistoprudov.ru/lj/roofs/moscow_comp1/26.jpg',
    coords: { lat: 55.45, lng: 37.36 }
}];
