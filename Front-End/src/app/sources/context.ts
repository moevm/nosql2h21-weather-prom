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
        this.chart = new Chart();
        this.grid = this.createDataGrid();
        this.chart.dataSource = this.dataContext;
        [this.categories, this.region, this.timeLine].forEach((x: any) => x.subscribe(value => this.updateInfo()));
        this.categories(settingEntities);
        if(!this.currentPage()) {
            this.currentPage({
                templateName: 'table-page',
                data: this.grid
            });
        }
    }
    grid: any;
    chart: any;
    dailyMonthlyButtonGroup: any;
    currentPage = ko.observable();
    settingsPopup: SettingsPopup;
    datePicker = ko.observable();
    toolbar: any;
    dataContext = ko.observable([]);
    categories = ko.observable([]);
    region = ko.observable('Wales');
    timeLine = ko.observable('mon');

    createDataGrid() {
        var grid = {
            templateName: 'table-page',
            dataSource: this.dataContext,
            headerFilter: { visible: true },
            sorting: {
                mode: 'multiple',
            },
            columns: ko.computed({
                read: () => {
                    var columns = [];
                    this.categories().forEach(category => {
                        if(this.dataContext().every(x => !x[category])) {
                            return;
                        }
                        category && columns.push({
                            dataField: category,
                            caption: category,
                            headerFilter: {
                                groupInterval: 10
                            },
                        });
                    });
                    columns.unshift({
                        dataField: 'time',
                        caption: 'Time',
                        sortOrder: 'desc',
                    });
                    return columns;
                }

            })
        };
        return grid;
    }

    swithPage(index: number) {
        if(index === 0) {
            this.currentPage({
                templateName: 'table-page',
                data: this.grid
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
                        newData[category] = Number.parseFloat(metrix[i][1]);
                        currentData.push(newData);
                    } else {
                        if(category == 'Rainfall') {
                            console.log();
                        }
                        currentData[i][category] = Number.parseFloat(metrix[i][1]);
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
