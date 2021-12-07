import * as ko from 'knockout';
import exportFromJSON from 'export-from-json';

export class PageToolbar {
    height = ko.observable(40);
    constructor(public context) {
        document.getElementById('importJSON').addEventListener('change', this.uploadFile, false);
        this.items = [
            {
                location: 'before',
                widget: 'dxButtonGroup',
                locateInMenu: 'auto',
                options: {
                    items: [
                        { text: 'Table View' },
                        { text: 'Chart View' }
                    ],
                    stylingMode: 'outlined',
                    selectedItemKeys: ['Table View'],
                    onItemClick(e) {
                        context.swithPage(e.itemIndex);
                    }
                }
            },
            /**
            {
                template: getTemplate('date-picker'),
                data: context.datePicker,
                location: 'center',
                locateInMenu: 'auto',
            },*/
            {
                template: 'Region',
                location: 'center',
                locateInMenu: 'auto',
            },
            {
                widget: 'dxSelectBox',
                options: {
                    dataSource: ['East Midlands', 'East of England',
                        'Isle of Man', 'London', 'North East England', 'North Scotland', 'North West England',
                        'Northern Ireland', 'Wales'],
                    value: 'Wales',
                    onValueChanged: function (e) {
                        context.region(e.value);
                    }
                },
                location: 'center',
                locateInMenu: 'auto',
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'preferences',
                    onClick: function () {
                        context.settingsPopup.visible(true);
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'export',
                    onClick: function () {
                        window['$']('#importJSON').trigger('click');
                    }
                }
            }, {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'download',
                    onClick: function () {
                        var data = <any> context.dataContext();
                        const fileName = 'download';
                        const exportType = exportFromJSON.types.json;
                        exportFromJSON({ data, fileName, exportType });
                    }
                }
            }
        ];
    }
    uploadFile = (event) => {
        var file = event.target.files[0];
        if(file) {
            var reader = new FileReader();
            var toolbar: any = this;
            reader.onload = function (e) {
                var contents = e.target.result;
                toolbar.context.dataContext(JSON.parse(<any>contents));
            };
            reader.readAsText(file);
        }
    }
    items: any[];
}
