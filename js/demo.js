/*globals require, document, CodeMirror, alert*/
require.config({
    paths: {
        "crel": "../lib/crel"
    }
});
//declare editor as global so I can update it later.. if I had time to fully learn require I could probably put my script in here :-/
var editor,
    doConvert;
require(["../src/json.human"], function (JsonHuman) {
    "use strict";
    var textarea = document.getElementById("input"),
        output = document.getElementById("output"),
        raw = document.getElementById("output-raw"),
        button = document.getElementById("convert");

    editor = CodeMirror.fromTextArea(textarea, {
            mode: "application/json",
            json: true
        });

    function convert(input, output) {
        var node = JsonHuman.format(input);

        output.innerHTML = "";
        output.appendChild(node);
        raw.textContent = output.innerHTML;
    }

    doConvert = function() {
        var json;
        try {
            json = JSON.parse(editor.getValue());
        } catch (error) {
            alert("Error parsing json:\n" + error.stack);
            return;
        }

        convert(json, output);
    }

    button.addEventListener("click", doConvert);
    doConvert();
});
