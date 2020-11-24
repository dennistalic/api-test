export interface AnalyticsData {
  date: Date;
  trafficType: TrafficType;
  user: number;
  session: number;
  pagesPerSession: number;
  averageSessionDuration: number;
  pageViews: number;
}

export enum TrafficType {
  AdVendorPage = "AdVendorPage",
  Direct = "direct",
  DisplayRetargeting = "display-retargeting",
  Email = "email",
  Organic = "organic",
  Paid = "paid",
  Referral = "referral",
  Social = "social",
  Sponsored = "sponsored",
  Unknown = "unknown"
}
