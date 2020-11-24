"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsDataService = void 0;
const uuid_1 = require("uuid");
class AnalyticsDataService {
    constructor() {
        this.id = "";
        this.analyticsData = [];
    }
    store(analyticsData) {
        this.analyticsData = analyticsData;
        this.id = uuid_1.v4();
    }
    getData() {
        return this.analyticsData;
    }
    getId() {
        return this.id;
    }
    getAverageViewsByTrafficType(trafficType) {
        const analyticsDataByTrafficType = this.analyticsData.filter((data) => data.trafficType == trafficType);
        return analyticsDataByTrafficType.reduce((accumulator, data) => {
            return (accumulator += data.pageViews);
        }, 0);
    }
}
exports.AnalyticsDataService = AnalyticsDataService;
