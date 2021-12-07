import notify from 'devextreme/ui/notify';
import RadioGroup from 'devextreme/ui/radio_group';
import * as ko from 'knockout';

export const settingEntities = ['Rainfall', 'Sun', 'Groundfrost', 'Hurs', 'Sea level preassure', 'Vape preassure', 'Snow lying', 'Average day temperature', 'Average wind speed'];

export class SettingsPopup {
    constructor(public context) {
        this.visible = ko.observable(false);
        var categories = settingEntities.map(x => {
            var value = ko.observable(true);
            return {
                text: x,
                value: value,
                onValueChanged(e) {
                    if(categories.every(x => !x.value())) {
                        notify({ message: 'You should choose at least one categoty!' }, 'error', 5000);
                        value(e.previousValue);
                    }
                }
            };
        });
        this.categories = categories;
    }
    width = 400;
    height = 480;
    container = '.page-viewport';
    showTitle = true;
    title = 'Settings';

    dragEnabled = false;
    closeOnOutsideClick = true;
    showCloseButton = false;

    toolbarItems = [{
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'after',
        options: {
            text: 'Ok',
            onClick: () => {
                this.visible(false);
                this.context.categories(this.categories.map(x => x.value() && x.text));
            }
        }
    }]
    visible: ko.Observable<boolean>;
    categories: Array<any>;
}
