"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrafficType = exports.formatDate = exports.convertTimeToSeconds = exports.processData = void 0;
const types_1 = require("../types");
const LINE_BREAKS = /\r\n|\n/;
function processData(data) {
    const dataAsLines = data.split(LINE_BREAKS);
    dataAsLines.shift();
    const analyticsData = dataAsLines.map((dataLine) => {
        const elements = dataLine.trim().split(",");
        return {
            date: formatDate(elements[0]),
            trafficType: getTrafficType(elements[1]),
            user: Number(elements[2]),
            session: Number(elements[3]),
            pagesPerSession: Number(elements[4]),
            averageSessionDuration: convertTimeToSeconds(elements[5]),
            pageViews: Number(elements[6]),
        };
    });
    return analyticsData;
}
exports.processData = processData;
/**
 * Takes time as string in the format HH:MM:SS and converts to the number of seconds
 * @param {string} time
 */
function convertTimeToSeconds(time) {
    const timeComponents = time.trim().split(":");
    const hoursInSeconds = Number(timeComponents[0]) * 60 * 60;
    const minutesInSeconds = Number(timeComponents[1]) * 60;
    const seconds = Number(timeComponents[2]);
    return hoursInSeconds + minutesInSeconds + seconds;
}
exports.convertTimeToSeconds = convertTimeToSeconds;
/**
 * Takes date as string and returns Date object
 * Note month is specified as 0-11 rather than 1-12
 * Example:
 *  Expected input paramter: "20200701"
 *  Expected output: Fri Jun 01 2020 00:00:00 GMT+1100 (Australian Eastern Daylight Time) {}
 * @param {string} date
 */
function formatDate(date) {
    if (date) {
        return new Date(Number(date.slice(0, 4)), Number(date.slice(4, 6)) - 1, Number(date.slice(6, 8)));
    }
    return new Date(0);
}
exports.formatDate = formatDate;
function getTrafficType(trafficType) {
    switch (trafficType) {
        case types_1.TrafficType.AdVendorPage:
            return types_1.TrafficType.AdVendorPage;
        case types_1.TrafficType.Direct:
            return types_1.TrafficType.Direct;
        case types_1.TrafficType.DisplayRetargeting:
            return types_1.TrafficType.DisplayRetargeting;
        case types_1.TrafficType.Email:
            return types_1.TrafficType.Email;
        case types_1.TrafficType.Organic:
            return types_1.TrafficType.Organic;
        case types_1.TrafficType.Paid:
            return types_1.TrafficType.Paid;
        case types_1.TrafficType.Referral:
            return types_1.TrafficType.Referral;
        case types_1.TrafficType.Social:
            return types_1.TrafficType.Social;
        case types_1.TrafficType.Sponsored:
            return types_1.TrafficType.Sponsored;
        default:
            return types_1.TrafficType.Unknown;
    }
}
exports.getTrafficType = getTrafficType;
