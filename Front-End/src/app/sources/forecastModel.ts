import * as ko from 'knockout';

export interface CityModel {
    id: number;
    name: string;
    temperature: number;
    airPressure: number;
    humidity: number;
    picture: string;
}

export class ForeCastModel {
    cities = ko.observableArray();
    city: ko.Observable<CityModel> = ko.observable();
    positionOf = ko.observable('');
    visiblePopup = ko.observable(false);

    constructor(cityCount: number) {
        this.cities(citiesInfo.slice(0, cityCount));
    }

    popupOptions = {
        width: 300,
        height: 280,
        container: '.page-viewport',
        contentTemplate: 'info',
        showTitle: true,
        title: () => this.city().name,
        visible: this.visiblePopup,
        dragEnabled: false,
        closeOnOutsideClick: true,
        showCloseButton: false,
        position: {
            at: 'bottom',
            my: 'center',
            of: this.positionOf,
        },
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick: () => this.visiblePopup(false)
            }
        }]
    };

    showInfo(data) {
        this.city(data.model);
        this.positionOf(`#image${this.city().id}`);
        this.visiblePopup(true);
    }
}

var citiesInfo = [{
    'id': 1,
    'name': 'Sait-Petersburg',
    'temperature': '10',
    'airPressure': '764',
    'humidity': '80',
    'picture': 'https://pp.userapi.com/c623419/v623419420/326a5/vBn6qfGGrro.jpg',
}, {
    'id': 2,
    'name': 'New York',
    'temperature': '15',
    'airPressure': '700',
    'humidity': '69',
    'picture': 'https://www.tripsavvy.com/thmb/tprq2yCdB7EURb66Y_qOI-7_x7A=/2121x1414/filters:fill(auto,1)/nyc-chinatown-view-5c2e485e4cedfd00019e15fc.jpg',
}, {
    'id': 3,
    'name': 'Moscow',
    'temperature': '12',
    'airPressure': '755',
    'humidity': '62',
    'picture': 'http://images.chistoprudov.ru/lj/roofs/moscow_comp1/26.jpg',
}];
