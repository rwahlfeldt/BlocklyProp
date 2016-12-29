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
        utils.showMessage("Project saved", "The project has been saved");
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
                utils.showMessage("Project saved", "The project has been saved");
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
        return "The project has been changed since the last save.";
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
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(projectData['code']));
    pom.setAttribute('download', 'Project' + idProject + '.xml');

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
};

function uploadCode() {

        $('#upload-dialog').modal('show');

};


function uploadHandler(files) {
    document.getElementById("selectfile-verify-notvalid").style.visibility = "hidden";
    document.getElementById("selectfile-verify-valid").style.visibility = "hidden";

    //var files = uploadedFile.target.files;
    var UploadReader = new FileReader();
    UploadReader.onload = function() {
        var parsed = new DOMParser().parseFromString(this.result, "text/xml");
        var xmlString = (new XMLSerializer()).serializeToString(parsed);
        if(files[0].type === 'text/xml' && xmlString.indexOf("<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block" === 0)) {
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

};

function replaceCode() {
    $('#upload-dialog').modal('hide');
    if(uploadedXML !== '') {
        window.frames["content_blocks"].location.reload();
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
        projectData['code'] = uploadedXML;
        window.frames["content_blocks"].load(projectData['code']);
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
    }
};

function clearWorkspace() {
        utils.confirm("Clear workspace", "Are you sure you want to clear your workspace?  This action cannot be undone!", function (value) {
        if (value) {
            window.frames["content_blocks"].location.reload();
            window.frames["content_blocks"].setProfile(projectData['board']);
            window.frames["content_blocks"].init(projectData['board'], []);
            projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
            window.frames["content_blocks"].load(projectData['code']);
        }
    });
};

