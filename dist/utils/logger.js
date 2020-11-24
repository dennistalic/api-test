"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function log(request) {
    console.log("Request type: " + request.method + " Endpoint: " + request.url);
}
exports.log = log;
