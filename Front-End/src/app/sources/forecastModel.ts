import * as ko from 'knockout';
import { CityModel, citiesInfo } from './utils/_initData';

export class ForeCastModel {
    cities = ko.observableArray();
    city: ko.Observable<CityModel> = ko.observable();
    positionOf = ko.observable('');
    visiblePopup = ko.observable(false);

    constructor(private _googleMap: google.maps.Map) {
        this.cities(citiesInfo);
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
            at: 'top',
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
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                text: 'Show on Map',
                onClick: () => {
                    this.showOnMap();
                    this.visiblePopup(false);
                }
            }
        }]
    };

    showOnMap() {
        this._googleMap.setCenter(this.city().coords);
    }

    showInfo(data) {
        this.city(data.model);
        this.positionOf(`#image${this.city().id}`);
        this.visiblePopup(true);
    }
}

