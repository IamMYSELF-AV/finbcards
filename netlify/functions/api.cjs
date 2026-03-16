"use strict";

const serverless = require("serverless-http");
const app = require("../../backend/server.cjs");

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  if (event && typeof event.path === "string") {
    const prefix = "/.netlify/functions/api";
    if (event.path.startsWith(prefix)) {
      event.path = "/api" + event.path.slice(prefix.length);
    }
  }

  return handler(event, context);
};
