import { IncomingMessage } from "http";

export function log(request: IncomingMessage): void {
  console.log("Request type: " + request.method + " Endpoint: " + request.url);
}
