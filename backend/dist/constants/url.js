"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const env_1 = require("./env");
exports.url = {
    createPolygon: `http://api.agromonitoring.com/agro/1.0/polygons?appid=${env_1.env.APP_ID}`,
    fetchSateliteData: `http://api.agromonitoring.com/agro/1.0/image/search?appid=${env_1.env.APP_ID}`,
    fetchSoilData: `http://api.agromonitoring.com/agro/1.0/soil?appid=${env_1.env.APP_ID}`,
    fetchPolygonData: `http://api.agromonitoring.com/agro/1.0/polygons?appid=${env_1.env.APP_ID}`,
};
//# sourceMappingURL=url.js.map