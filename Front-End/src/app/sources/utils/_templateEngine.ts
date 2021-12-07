import * as ko from 'knockout';

class TemplateSource implements ko.TemplateSource {
    constructor(template: string, private _data: { [key: string]: any }, private _templates: { [key: string]: any}) {
        this.templateName = template;
    }
        templateName: any;
        data(key, value?) {
            this._data[this.templateName] = this._data[this.templateName] || {};
            if(arguments.length === 1) {
                return this._data[this.templateName][key];
            }
            this._data[this.templateName][key] = value;
        }
        text(value?) {
            if(arguments.length === 0) {
                var template = this._templates[this.templateName];
                if(!template)
                    throw new Error('Cannot find template with ID ' + this.templateName);
                return template;
            }
            this._templates[this.templateName] = value;
        }
}

export function getTemplate(id: string) {
    var id = id[0] === '#' ? id.substr(1) : id;
    var item = document.querySelector('#'+id);
    return item && item.innerHTML || TemplatesEngine.templates[id];
}

export class TemplatesEngine {
        private static _instance: TemplatesEngine;
        private _data: { [key: string]: any };
        private _templates: { [key: string]: string }
        private _hasTemplate = (name: string, findEverywhere) => {
            return findEverywhere && !!document.getElementById(name) || this._templates.hasOwnProperty(name);
        };
        constructor() {
            this._data = {};
            this._templates = {};
        }
        private static get Instance() {
            return this._instance || (this._instance = new this());
        }
        public static get templates() {
            return TemplatesEngine.Instance._templates;
        }
        static addTemplate(templateName: string, templateMarkup: string) {
            TemplatesEngine.templates[templateName] = templateMarkup;
        }
        public static addTemplates(templates) {
            ko.utils.extend(TemplatesEngine.templates, templates);
        }
        public static getExistingTemplate(name, findEverywhere = true) {
            return TemplatesEngine.Instance._hasTemplate(name, findEverywhere) ? name : undefined;
        }
}

var makeTemplateSource = ko.templateEngine.prototype['makeTemplateSource'];
ko.templateEngine.prototype['makeTemplateSource'] = function(template, doc: Document) {
    if(typeof template === 'string' && TemplatesEngine.getExistingTemplate(template, false) && !document.getElementById(template)) {
        return new TemplateSource(template, TemplatesEngine['_instance']['_data'], TemplatesEngine.templates);
    } else {
        return makeTemplateSource.apply(this, [template, doc]);
    }
};
