"use strict";
// Modified from https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
Object.defineProperty(exports, "__esModule", { value: true });
const LINE_BREAKS = /\r\n|\n/;
function processData(data) {
    const dataAsLines = data.split(LINE_BREAKS);
    const headings = dataAsLines[0].split(",");
    const lines = [];
    for (let i = 1; i < dataAsLines.length; i++) {
        const rowElements = dataAsLines[i].split(",");
        // create our data type, the time rows need editing
        if (rowElements.length == headings.length) {
            const tarr = [];
            for (let j = 0; j < headings.length; j++) {
                tarr.push(headings[j] + ":" + rowElements[j]);
            }
            console.log('DEBUG tarr', tarr);
            console.log('DEBUG lines', lines);
            lines.push({ tarr });
        }
    }
    console.log("DEBUG LINES ", lines);
    return lines;
}
exports.processData = processData;
