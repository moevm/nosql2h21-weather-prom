import { TemplatesEngine } from './utils/_templateEngine';

TemplatesEngine.addTemplates({
    'chart-page': '<div data-bind="dxChart: $data.data"></div>',
    'date-picker': '<div class="dailyMounthy"> <!-- ko with: $data.data --> <div class="button-group" data-bind="dxButtonGroup: buttonGroup"></div> <div class="date-box" data-bind="dxDateBox: $data"></div> <!-- /ko --> </div>',
    'settings-popup': '<div data-bind="dxPopup: $data"> <div class="settings-categories"> <!-- ko foreach: $data.categories --> <div id="settings-checkbox" data-bind="dxCheckBox: $data"></div> <!-- /ko --> </div> </div>',
    'table-page': '<div data-bind="dxDataGrid: { dataSource: $data.data }"></div>',
});
