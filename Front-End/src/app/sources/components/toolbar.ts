import * as ko from 'knockout';
import notify from 'devextreme/ui/notify';

export class PageToolbar {
    height = ko.observable(40);
    constructor(context) {
        this.items = [
            {
                location: 'before',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    text: 'Map View',
                    onClick: function() {
                        context.swithToMap();
                    }
                }
            }, {
                location: 'before',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    text: 'Chart View',
                    onClick: function() {

                    }
                }
            },
            {
                location: 'before',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    text: 'Table View',
                    onClick: function() {
                        context.swithToTable();
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'export',
                    onClick: function() {
                        notify('Export button has been clicked!');
                    }
                }
            }, {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'download',
                    onClick: function() {
                        notify('Import button has been clicked!');
                    }
                }
            }
        ];
    }
    items: any[];
}