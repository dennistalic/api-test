import { AnalyticsData, TrafficType } from "../types";
import { v4 as uuid } from "uuid";

export class AnalyticsDataService {
  private id: string = "";
  private analyticsData: AnalyticsData[] = [];

  store(analyticsData: AnalyticsData[]): void {
    this.analyticsData = analyticsData;
    this.id = uuid();
  }

  getData(): AnalyticsData[] {
    return this.analyticsData;
  }

  getId(): string {
    return this.id;
  }

  getAverageViewsByTrafficType(trafficType: TrafficType): number {
    const analyticsDataByTrafficType: AnalyticsData[] = this.analyticsData.filter(
      (data: AnalyticsData) => data.trafficType == trafficType
    );

    return analyticsDataByTrafficType.reduce(
      (accumulator, data: AnalyticsData) => {
        return (accumulator += data.pageViews);
      },
      0
    );
  }
}
