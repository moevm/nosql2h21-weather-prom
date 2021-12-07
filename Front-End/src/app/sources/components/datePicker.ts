import * as ko from 'knockout';
import notify from 'devextreme/ui/notify';

export enum DateType {
    Daily, Monthly
}

export class DatePicker {
    constructor(public context) {
        this.buttonGroup.onItemClick = (e) => {
            this.switchType(<any>DateType[e.itemData.text]);
            context.datePicker && context.datePicker.valueHasMutated();
        };
    }
    switchType(type: DateType) {
        switch(type) {
            case DateType.Daily:
                this.calendarOptions.maxZoomLevel = 'weak';
                this.calendarOptions.minZoomLevel = 'century';
                this.displayFormat = undefined;
                this.buttonGroup.selectedItemKeys = ['Daily'];
                break;
            case DateType.Monthly:
                this.calendarOptions.maxZoomLevel = 'decade';
                this.calendarOptions.minZoomLevel = 'century';
                this.displayFormat = 'year';
                this.buttonGroup.selectedItemKeys = ['Monthly'];
        }
    }
    buttonGroup = {
        items: [
            { text: 'Daily' },
            { text: 'Monthly' }
        ],
        stylingMode: 'outlined',
        selectedItemKeys: ['Daily'],
        onItemClick(e) {
            notify({ message: `The "${e.itemData.text}" button was clicked`, width: 320 }, 'success', 1000);
        },
    }
    onValueChanged = (data) => {
        notify({ message: `Data - ${new Date(data.value).toLocaleDateString()}`, width: 320 }, 'success', 1000);
    }
    applyValueMode = 'useButtons';
    type = 'date';
    value = ko.observable(new Date);
    displayFormat: string;
    calendarOptions = <any>{ };
}
