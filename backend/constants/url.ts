import { env } from './env';

export const url = {
  createPolygon: `http://api.agromonitoring.com/agro/1.0/polygons?appid=${env.APP_ID}`,
  fetchSateliteData: `http://api.agromonitoring.com/agro/1.0/image/search?appid=${env.APP_ID}`,
  fetchSoilData: `http://api.agromonitoring.com/agro/1.0/soil?appid=${env.APP_ID}`,
  fetchPolygonData: `http://api.agromonitoring.com/agro/1.0/polygons?appid=${env.APP_ID}`,
};
