const fs = require('fs');
const path = require('path');

function readFiles(dirname, extention, onFileContent, onError, toDir, firstLevelOnly) {
    if(toDir === undefined) 
        toDir = true;
    fs.readdirSync(dirname).forEach(function(filename) {
        var currentFilePath = path.join(dirname, filename)
        var stat = fs.lstatSync(currentFilePath);
        if(stat.isDirectory() && toDir && !firstLevelOnly) {
            readFiles(currentFilePath, extention, onFileContent, onError)
        } else if(path.extname(currentFilePath) === extention) {
            var content = fs.readFileSync(currentFilePath, {
                encoding: 'utf-8'
            });
            onFileContent(filename, content, currentFilePath);
        }
    });
}

module.exports = {
    readFiles: readFiles,
    generateTemplates: function(path, isExternal, joinedTemplates) {
        var content = 'import { TemplatesEngine } from \'./utils/_templateEngine\';\n\n';
        content += "TemplatesEngine.addTemplates({\n" + joinedTemplates + "});\n\n";
        content += "var cache = \'" + new Date().getTime() + "\';\n";
        fs.writeFileSync(path, content);
    },
    getIdFromFilePath: function(filepath) {
        return filepath.split('/').pop().split('.')[0]
    }
};
