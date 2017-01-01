/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = $("meta[name=base]").attr("content");

var projectData = null;
var ready = false;
var projectLoaded = false;

var idProject = 0;

var uploadedXML = '';

$(document).ready(function () {
    idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        window.location = baseUrl;
    } else {
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
            console.log(data);
            projectData = data;
            showInfo(data);
            projectLoaded = true;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init(data['board'], []);
            }
        });
    }

    $('#save-project').on('click', function () {
        saveProject();
    });
    $('#save-project-as').on('click', function () {
        saveProjectAs();
    });
    $('#download-project').on('click', function () {
        downloadCode();
    });
    $('#upload-project').on('click', function () {
        uploadCode();
    });
    $('#clear-workspace').on('click', function () {
        clearWorkspace();
    });

});

showInfo = function (data) {
    console.log(data);
    $(".project-name").text(data['name']);
    if (!data['yours']) {
        $(".project-owner").text("(" + data['user'] + ")");
    }
};

saveProject = function () {
    var code = window.frames["content_blocks"].getXml();
    projectData['code'] = code;
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        var previousOwner = projectData['yours'];
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
        utils.showMessage(Blockly.Msg.DIALOG_PROJECT_SAVED, Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT);
        if (!previousOwner) {
            window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
        }
    });
};

saveProjectAs = function () {
    utils.prompt("Save as", "Save project as", projectData['name'], function (value) {
        if (value) {
            var code = window.frames["content_blocks"].getXml();
            projectData['code'] = code;
            projectData['name'] = value;
            $.post(baseUrl + 'rest/project/code-as', projectData, function (data) {
                var previousOwner = projectData['yours'];
                projectData = data;
                projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
                utils.showMessage(Blockly.Msg.DIALOG_PROJECT_SAVED, Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT);
                // Reloading project with new id
                window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
            });
        }
    });
};

blocklyReady = function () {
    if (projectLoaded) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
    } else {
        ready = true;
    }
};

loadProject = function () {
    if (projectData !== null) {
        window.frames["content_blocks"].load(projectData['code']);
    }
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return Blockly.Msg.DIALOG_CHANGED_SINCE;
    }
};

checkLeave = function () {
    var currentXml = window.frames["content_blocks"].getXml();
    //console.log(projectData['code']);
    //console.log(currentXml);
    if (projectData === null) {
        if (currentXml === '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
            return false;
        } else {
            return true;
        }
    } else {
        if (projectData['code'] === currentXml) {
            return false;
        } else {
            return true;
        }
    }
};

function getUrlParameters(parameter, staticURL, decode) {
    /*
     Function: getUrlParameters
     Description: Get the value of URL parameters either from
     current URL or static URL
     Author: Tirumal
     URL: www.code-tricks.com
     */
    var currLocation = (staticURL.length) ? staticURL : window.location.search;

    var parArr = [];
    if (currLocation !== undefined && currLocation.split("?")[1] !== undefined) {
        parArr = currLocation.split("?")[1].split("&");
    }
    var returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool)
        return false;
}

setInterval(function () {
    $.get(baseUrl + 'ping');
}, 60000);

function downloadCode() {
    var projXMLcode = projectData['code'];
        projXMLcode = projXMLcode.substring(42,projXMLcode.length);
        projXMLcode = projXMLcode.substring(0,(projXMLcode.length - 6));

    // extract the SVG from the iFrame that contains it
    var x = document.getElementsByName("content_blocks");
        var y = (x[0].contentWindow || x[0].contentDocument);
        if (y.document)y = y.document;
        
    // get the paths of the blocks themselves and the size/position of the blocks
    var projSVG = y.getElementsByClassName('blocklyBlockCanvas');
    var projSVGcode = projSVG[0].outerHTML.replace(/&nbsp;/g, ' ');
    var projSize = projSVG[0].getBoundingClientRect();
    var projH = (parseInt(projSize.height) + parseInt(projSize.top) + 100).toString();
    var projW = (parseInt(projSize.width) + parseInt(projSize.left) + 236).toString();
    
    // put all of the pieces together into a downloadable file
    var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var    blob = new Blob([data], {type: "octet/stream"});
        var    url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        };
    }());
    
    // a header with the necessary svg XML header and style information to make the blocks render correctly
    var SVGheader = '';
    SVGheader += '<svg blocklyprop="blocklypropproject" xmlns="http://www.w3.org/2000/svg" ';
    SVGheader += 'xmlns:html="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" ';
    SVGheader += 'version="1.1" class="blocklySvg"><style>.blocklySvg { background-color: #fff; ';
    SVGheader += 'overflow: auto; width:' + projW + 'px; height:' + projH + 'px;} .blocklyWidgetDiv {display: none; position: absolute; ';
    SVGheader += 'z-index: 999;} .blocklyPathLight { fill: none; stroke-linecap: round; ';
    SVGheader += 'stroke-width: 2;} .blocklyDisabled>.blocklyPath { fill-opacity: .5; ';
    SVGheader += 'stroke-opacity: .5;} .blocklyDisabled>.blocklyPathLight, .blocklyDisabled>';
    SVGheader += '.blocklyPathDark {display: none;} .blocklyText {cursor: default; fill: ';
    SVGheader += '#fff; font-family: sans-serif; font-size: 11pt;} .blocklyNonEditableText>text { ';
    SVGheader += 'pointer-events: none;} .blocklyNonEditableText>rect, .blocklyEditableText>rect ';
    SVGheader += '{fill: #fff; fill-opacity: .6;} .blocklyNonEditableText>text, .blocklyEditableText>';
    SVGheader += 'text {fill: #000;} .blocklyBubbleText {fill: #000;} .blocklySvg text {user';
    SVGheader += '-select: none; -moz-user-select: none; -webkit-user-select: none; cursor: ';
    SVGheader += 'inherit;} .blocklyHidden {display: none;} .blocklyFieldDropdown:not(.blocklyHidden) ';
    SVGheader += '{display: block;} .bkginfo {cursor: default; fill: rgba(0, 0, 0, 0.3); font-family: ';
    SVGheader += 'sans-serif; font-size: 10pt;}</style>';
    
    // a footer to generate a watermark with the project's information at the bottom-right corner of the SVG 
    var SVGfooter = '';
    SVGfooter += '<rect x="100%" y="100%" rx="7" ry="7" width="218" height="84" style="fill:rgba(255,255,255,0.4);" transform="translate(-232,-100)" />';
    SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-83)" style="font-weight:bold;">Parallax BlocklyProp Project</text>';
    SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-68)">User: ' + '' + '</text>';
    SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-53)">Title: ' + projectData['name'] + '</text>';
    SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-38)">ID: ' + idProject + '</text>';
    SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-23)">Device: ' + projectData['board'] + '</text>';
    
    // Assemble both the SVG (image) of the blocks and the blocks' XML definition
    saveData(SVGheader + projSVGcode + SVGfooter + projXMLcode + '</svg>', 'Project' + idProject + '.svg');
};

function uploadCode() {
    $('#upload-dialog').modal('show');
};

function uploadHandler(files) {
    document.getElementById("selectfile-verify-notvalid").style.visibility = "hidden";
    document.getElementById("selectfile-verify-valid").style.visibility = "hidden";

    var UploadReader = new FileReader();
    UploadReader.onload = function() {
        var parsed = new DOMParser().parseFromString(this.result, "text/xml");
        var xmlString = (new XMLSerializer()).serializeToString(parsed);
        if(files[0].type === 'image/svg+xml' && xmlString.indexOf("<svg blocklyprop=\"blocklypropproject\"" === 0)) {
            document.getElementById("selectfile-verify-valid").style.visibility = "visible";
            document.getElementById("selectfile-replace").disabled = false;
            document.getElementById("selectfile-append").disabled = false;
            uploadedXML = xmlString;
        } else {
            document.getElementById("selectfile-verify-notvalid").style.visibility = "visible";
            document.getElementById("selectfile-replace").disabled = true;
            document.getElementById("selectfile-append").disabled = true;
            uploadedXML = '';
        }
    };
    UploadReader.readAsText(files[0]);
    
    if(uploadedXML !== '') {
        uploadedXML = uploadedXML.substring(uploadedXML.indexOf("<block"), (uploadedXML.length - 6));
        uploadedXML = '<xml xmlns="http://www.w3.org/1999/xhtml">' + uploadedXML + '</xml>';
        alert(uploadedXML);
    };

};

function replaceCode() {
    $('#upload-dialog').modal('hide');
    if(uploadedXML !== '') {
        var newCode = uploadedXML;
        newCode = newCode.substring(42,newCode.length);
        newCode = newCode.substring(0,(newCode.length - 6));

        window.frames["content_blocks"].location.reload();
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
        projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml">' + newCode + '</xml>';
        window.frames["content_blocks"].load(projectData['code']);
        uploadedXML ='';
    }
};

function appendCode() {
    $('#upload-dialog').modal('hide');
    if(uploadedXML !== '') {
        var projCode = projectData['code'];
        projCode = projCode.substring(42,projCode.length);
        projCode = projCode.substring(0,(projCode.length - 6));
        
        var newCode = uploadedXML;
        newCode = newCode.substring(42,newCode.length);
        newCode = newCode.substring(0,(newCode.length - 6));
        
        window.frames["content_blocks"].location.reload();
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
        projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml">' + projCode + newCode + '</xml>';
        window.frames["content_blocks"].load(projectData['code']);
        uploadedXML ='';
    }
};

function clearWorkspace() {
        utils.confirm(Blockly.Msg.DIALOG_CLEAR_WORKSPACE, Blockly.Msg.DIALOG_CLEAR_WORKSPACE_WARNING, function (value) {
        if (value) {
            window.frames["content_blocks"].location.reload();
            window.frames["content_blocks"].setProfile(projectData['board']);
            window.frames["content_blocks"].init(projectData['board'], []);
            projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
            window.frames["content_blocks"].load(projectData['code']);
        }
    });
};

