import * as ko from 'knockout';
import * as $ from 'jquery';
import { PageToolbar } from './components/toolbar';
import { DatePicker } from './components/datePicker';
import { settingEntities, SettingsPopup } from './components/settings';
import { Chart } from './components/chart';

export const settingDisplayMapper = {
    'Rainfall': 'rainfall',
    'Sun': 'sun',
    'Groundfrost': 'groundfrost',
    'Hurs': 'hurs',
    'Sea level preassure': 'psl',
    'Vape preassure': 'pv',
    'Snow lying': 'snow_lying',
    'Average day temperature': 'tas',
    'Average wind speed': 'sfc_wind'
};

export class BindingContext {
    constructor() {
        this.datePicker(new DatePicker(this));
        this.toolbar = new PageToolbar(this);
        this.settingsPopup = new SettingsPopup(this);
        this.tablePage = {
            templateName: 'table-page',
            data: this.dataContext
        };
        this.chart = new Chart();
        this.chart.dataSource = this.dataContext;
        [this.categories, this.region, this.timeLine].forEach((x: any) => x.subscribe(value => this.updateInfo()));
        this.categories(settingEntities);
        if(!this.currentPage()) {
            this.currentPage({
                templateName: 'table-page',
                data: this.dataContext
            });
        }
    }
    chart: any;
    tablePage: any;
    dailyMonthlyButtonGroup: any;
    currentPage = ko.observable();
    settingsPopup: SettingsPopup;
    datePicker = ko.observable();
    toolbar: any;
    dataContext = ko.observable([]);
    categories = ko.observable([]);
    region = ko.observable('Wales');
    timeLine = ko.observable('mon');

    swithPage(index: number) {
        if(index === 0) {
            this.currentPage({
                templateName: 'table-page',
                data: this.dataContext
            });
        } else {
            this.currentPage({
                templateName: 'chart-page',
                data: this.chart
            });
        }
    }
    updateInfo() {
        var end = new Date();
        var start = new Date();
        start.setHours(end.getHours() - 1);
        this.dataContext([]);
        this.categories().forEach(category => category && this.loadData(category, start, end));
    }
    loadData(category: string, start, end) {
        $.get(`http://localhost:9090/api/v1/query_range?query=${settingDisplayMapper[category]}`
            + `{time_unit="${this.timeLine()}",region="${this.region()}"}&start=${start.toISOString()}&end=${end.toISOString()}&step=10s`).done(data => {
            var metrix: Array<any> = data.data.result[0] && data.data.result[0].values;
            var currentData = this.dataContext() || [];
            if(metrix) {
                for(var i = 0; i < metrix.length; i++) {
                    if(!currentData[i]) {
                        var newData = {
                            'time': new Date(Date.UTC(70, 0, 1, null, null, metrix[i][0])).toLocaleTimeString()
                        };
                        newData[category] = metrix[i][1];
                        currentData.push(newData);
                    } else {
                        currentData[i][category] = metrix[i][1];
                    }
                }
                this.dataContext(currentData);
            }
        });
    }
}

window.onload = () => {
    ko.applyBindings(new BindingContext(), document.getElementsByClassName('page-wrapper')[0]);
};
