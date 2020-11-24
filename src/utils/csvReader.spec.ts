import { AnalyticsData, TrafficType } from "../types";
import {
  convertTimeToSeconds,
  formatDate,
  getTrafficType,
  processData,
} from "./csvReader";

describe("convert time to seconds", () => {
  it("should convert time in string format HH:MM:SS to total time in seconds", () => {
    const time = "01:20:45";

    const result = convertTimeToSeconds(time);

    const expectedResult = 4845;

    expect(result).toBe(expectedResult);
  });
});

describe("format date", () => {
  it("should return a date given a string in the format YYYY(MM-1)DD", () => {
    const date = "20220809";

    const result = formatDate(date);

    const expectedResult = new Date("August 9, 2022 00:00:00");

    expect(result).toEqual(expectedResult);
  });

  it("should handle undefined date", () => {
    const date: undefined = undefined;

    const result = formatDate(date);

    const expectedResult = new Date("January 1, 1970 10:00:00");

    expect(result).toEqual(expectedResult);
  });
});

describe("traffic type", () => {
  it("should return the correct enumeration of traffic type", () => {
    const trafficType = "referral";

    const result = getTrafficType(trafficType);

    const expectedResult = TrafficType.Referral;

    expect(result).toBe(expectedResult);
  });

  it(`should return traffic type of 'unknown' if traffic type does not match any of the enums`, () => {
    const trafficType = "aaa";

    const result = getTrafficType(trafficType);

    const expectedResult = TrafficType.Unknown;

    expect(result).toBe(expectedResult);
  });

  it(`should return traffic type of 'unknown' if traffic type is undefined`, () => {
    const trafficType: undefined = undefined;

    const result = getTrafficType(trafficType);

    const expectedResult = TrafficType.Unknown;

    expect(result).toBe(expectedResult);
  });
});

describe("process data", () => {
  it("should process the csv data into AnalyticsData structure", () => {
    const csv: string = `Date,Traffic Type,Users,Sessions,Pages / Session,Avg. Session Duration,Pageviews
    20201028,organic,340,372,1.40,00:01:10,522
    20201029,paid,323,366,1.66,00:01:46,606`;

    const result: AnalyticsData[] = processData(csv);

    const expectedResult: AnalyticsData[] = [
      {
        date: new Date("October 28, 2020 00:00:00"),
        trafficType: TrafficType.Organic,
        user: 340,
        session: 372,
        pagesPerSession: 1.4,
        averageSessionDuration: 70,
        pageViews: 522,
      },
      {
        date: new Date("October 29, 2020 00:00:00"),
        trafficType: TrafficType.Paid,
        user: 323,
        session: 366,
        pagesPerSession: 1.66,
        averageSessionDuration: 106,
        pageViews: 606,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
