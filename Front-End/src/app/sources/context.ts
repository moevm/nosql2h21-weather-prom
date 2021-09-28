import * as ko from 'knockout';
import { Loader as MapLoader } from '@googlemaps/js-api-loader';
import { IPageComponent } from './components/pageComponent';
import { MapPageModel } from './components/map/mapModel';
import { PageToolbar } from './components/toolbar';
import { citiesInfo } from './utils/_initData';

export class BindingContext {
    constructor() {
        this.toolbar = new PageToolbar(this);
        this.mapPage = new MapPageModel();
        this.tablePage = {
            templateName: 'table-page',
            data: citiesInfo
        };
        if(!this.currentPage()) {
            this.currentPage(this.tablePage);
        }
    }
    tablePage: any;
    mapLoader: MapLoader;
    googleMap: google.maps.Map;
    currentPage: ko.Observable<IPageComponent> = ko.observable();
    mapPage: MapPageModel;
    toolbar: any;
    swithToMap() {
        this.currentPage(this.mapPage);
    }
    swithToTable() {
        this.currentPage(this.tablePage);
    }
}

window.onload = () => {
    ko.applyBindings(new BindingContext(), document.getElementsByClassName('page-wrapper')[0]);
};
