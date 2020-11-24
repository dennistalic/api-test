import { Server } from "http";
import { create } from "./route";
import { AnalyticsDataService } from "./state/AnalyticsDataService";

const hostname = '127.0.0.1';
const port = 4000;

const analyticsDataService = new AnalyticsDataService()
const server: Server = create(analyticsDataService);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});