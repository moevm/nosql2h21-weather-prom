import * as ko from 'knockout';
import { settingEntities } from './settings';

export class Chart {
    constructor() {
        settingEntities.forEach(x => this.series.push({ valueField: x, name: x }));
    }
    valueAxis = {
        valueType: 'numeric'
    };
    commonSeriesSettings = {
        argumentField: 'time',
        type: 'line',
    };
    export = {
        enabled: true,
    };
    dataSource: ko.Observable;
    series = [];
    argumentAxis = {
        valueMarginsEnabled: true,
        discreteAxisDivisionMode: 'crossLabels',
        grid: {
            visible: true,
        },
    };
}
