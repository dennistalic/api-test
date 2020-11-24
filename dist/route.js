"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_1 = require("http");
const url_1 = require("url");
const controller_1 = require("./controller");
const logger_1 = require("./utils/logger");
function create(analyticsDataService) {
    return http_1.createServer((request, response) => {
        const requestedUrl = url_1.parse(request.url, true);
        // GET /avgpageview?trafficType={trafficType}
        if (requestedUrl.pathname.startsWith("/avgpageview") && request.method === "GET") {
            logger_1.log(request);
            controller_1.getAveragePageViewByTrafficType(request, response, analyticsDataService);
        }
        // POST
        if (request.method === "POST") {
            logger_1.log(request);
            controller_1.handleFile(request, response, analyticsDataService);
        }
    });
}
exports.create = create;
