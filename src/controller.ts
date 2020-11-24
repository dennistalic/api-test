import { IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import { AnalyticsDataService } from "./state/AnalyticsDataService";
import { AnalyticsData, TrafficType } from "./types";
import { getTrafficType, processData } from "./utils/csvReader";

const RETURN_PARSED = true;

export function getAveragePageViewByTrafficType(
  request: IncomingMessage,
  response: ServerResponse,
  analyticsDataService: AnalyticsDataService
) {
  const requestedUrl: UrlWithParsedQuery = parse(request.url, RETURN_PARSED);

  const trafficType: TrafficType = getTrafficType(
    requestedUrl.query.trafficType as string
  );

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

export function handleFile(
  request: IncomingMessage,
  response: ServerResponse,
  analyticsDataService: AnalyticsDataService
) {
  let body: string = "";

  request.on("data", (chunk: string) => {
    body += chunk;
  });

  const analyticsData: AnalyticsData[] = processData(body);
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
