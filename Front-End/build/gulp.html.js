
const path = require('path');
const utils = require("./utils");

function getHtmlScript(fileName, content) {
    if(content.indexOf('</script>') == -1) {
        return "<script type='text/html' id='dxrd-" + utils.getIdFromFilePath(fileName) + "'>\r\n" + content + "</script>\r\n";
    }
    return content;
}

function processHtml(fileName, content) {
    content = getHtmlScript(fileName, content);
    var result = "";
    var sections = content.split("</script>");
    sections.forEach(function(x) {
        var tag = /(<script).*?>/.exec(x);
        if(tag) {
            tag = tag[0];
            var id = /(id="([^"]+)")/.exec(tag);
            if(id) {
                id = id[0].split('"')[1];
            } else {
                id = /(id='([^']+)')/.exec(tag)[0].split("'")[1];
            }
            var htmlValue = x.split(tag)[1]
                .replace(/\n|\r/g, "")
                .replace(/'/g, "\\'")
                .replace(/\\\\'/g, "\\\\\\'").trim();

            result += "    '" + id + "': " + "'" + (htmlValue || " ").replace(/[\s]{4,}/g, " ") + "',\n";
        }
    });
    return result;
}
module.exports = {
    createHtmlTask: function (projectPath) {
        return new Promise(function(resolve, reject) {
            try{
                var folder = path.join(projectPath, './html');
                var destinationFile = path.join(projectPath, "./sources/templates.ts");
                var joinedHtml = "";
                utils.readFiles(folder, ".html", function(fileName, content) {
                    joinedHtml += processHtml(fileName, content);
                }, function() { });
                utils.generateTemplates(destinationFile, false, joinedHtml);
                resolve();
            } catch {
                reject();
            }

        });
    }
}
