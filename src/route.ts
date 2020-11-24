import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import { getAveragePageViewByTrafficType, handleFile } from "./controller";
import { AnalyticsDataService } from "./state/AnalyticsDataService";
import { log } from "./utils/logger";

export function create(analyticsDataService: AnalyticsDataService): Server {
  return createServer((request: IncomingMessage, response: ServerResponse) => {
    const requestedUrl: UrlWithParsedQuery = parse(request.url, true);

    // GET /avgpageview?trafficType={trafficType}
    if (requestedUrl.pathname.startsWith("/avgpageview") && request.method === "GET") {
      log(request);
      getAveragePageViewByTrafficType(request, response, analyticsDataService)
    }

    // POST
    if (request.method === "POST") {
      log(request);
      handleFile(request, response, analyticsDataService);
    }
  });
}
