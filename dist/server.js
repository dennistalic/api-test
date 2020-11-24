"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const AnalyticsDataService_1 = require("./state/AnalyticsDataService");
const hostname = '127.0.0.1';
const port = 4000;
const analyticsDataService = new AnalyticsDataService_1.AnalyticsDataService();
const server = route_1.create(analyticsDataService);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
