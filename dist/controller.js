"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFile = exports.getAveragePageViewByTrafficType = void 0;
const url_1 = require("url");
const csvReader_1 = require("./utils/csvReader");
const RETURN_PARSED = true;
function getAveragePageViewByTrafficType(request, response, analyticsDataService) {
    const requestedUrl = url_1.parse(request.url, RETURN_PARSED);
    const trafficType = csvReader_1.getTrafficType(requestedUrl.query.trafficType);
    const resultMessage = [
        {
            message: `Here are the average pageviews by ${trafficType} traffic type`,
        },
        analyticsDataService.getAverageViewsByTrafficType(trafficType),
    ];
    response.statusCode = 200;
    response.setHeader("content-Type", "Application/json");
    response.end(JSON.stringify(resultMessage));
}
exports.getAveragePageViewByTrafficType = getAveragePageViewByTrafficType;
function handleFile(request, response, analyticsDataService) {
    let body = "";
    request.on("data", (chunk) => {
        body += chunk;
    });
    const analyticsData = csvReader_1.processData(body);
    analyticsDataService.store(analyticsData);
    request.on("end", function () {
        const responseMessage = [
            {
                text: "Data added successfully",
            },
            analyticsDataService.getId,
        ];
        response.statusCode = 201;
        response.setHeader("content-Type", "Application/json");
        response.end(JSON.stringify(responseMessage));
    });
}
exports.handleFile = handleFile;
