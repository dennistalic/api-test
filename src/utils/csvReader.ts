import { AnalyticsData, TrafficType } from "../types";

const LINE_BREAKS: RegExp = /\r\n|\n/;

export function processData(data: string): AnalyticsData[] {
  const dataAsLines: string[] = data.split(LINE_BREAKS);
  dataAsLines.shift();

  const analyticsData: AnalyticsData[] = dataAsLines.map(
    (dataLine: string): AnalyticsData => {
      const elements: string[] = dataLine.trim().split(",");

      return {
        date: formatDate(elements[0]),
        trafficType: getTrafficType(elements[1]),
        user: Number(elements[2]),
        session: Number(elements[3]),
        pagesPerSession: Number(elements[4]),
        averageSessionDuration: convertTimeToSeconds(elements[5]),
        pageViews: Number(elements[6]),
      };
    }
  );

  return analyticsData;
}

/**
 * Takes time as string in the format HH:MM:SS and converts to the number of seconds
 * @param {string} time
 */
export function convertTimeToSeconds(time: string): number {
  const timeComponents = time.trim().split(":");

  const hoursInSeconds = Number(timeComponents[0]) * 60 * 60;
  const minutesInSeconds = Number(timeComponents[1]) * 60;
  const seconds = Number(timeComponents[2]);

  return hoursInSeconds + minutesInSeconds + seconds;
}

/**
 * Takes date as string and returns Date object
 * Note month is specified as 0-11 rather than 1-12
 * Example:
 *  Expected input paramter: "20200701"
 *  Expected output: Fri Jun 01 2020 00:00:00 GMT+1100 (Australian Eastern Daylight Time) {}
 * @param {string} date
 */
export function formatDate(date: string): Date {
  if (date) {
    return new Date(
      Number(date.slice(0, 4)),
      Number(date.slice(4, 6)) - 1,
      Number(date.slice(6, 8))
    );
  }
  return new Date(0);
}

export function getTrafficType(trafficType: string): TrafficType {
  switch (trafficType) {
    case TrafficType.AdVendorPage:
      return TrafficType.AdVendorPage;
    case TrafficType.Direct:
      return TrafficType.Direct;
    case TrafficType.DisplayRetargeting:
      return TrafficType.DisplayRetargeting;
    case TrafficType.Email:
      return TrafficType.Email;
    case TrafficType.Organic:
      return TrafficType.Organic;
    case TrafficType.Paid:
      return TrafficType.Paid;
    case TrafficType.Referral:
      return TrafficType.Referral;
    case TrafficType.Social:
      return TrafficType.Social;
    case TrafficType.Sponsored:
      return TrafficType.Sponsored;
    default:
      return TrafficType.Unknown;
  }
}
