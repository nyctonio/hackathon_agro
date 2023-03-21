import express from 'express';
const router = express.Router();
import axios from 'axios';
import { url } from '../../constants/url';
import moment from 'moment';
import { env } from '../../constants';
import prisma from '../../lib/prisma';

router.get('/', async (req, res) => {
  let { email } = req.query;
  let userdata = await prisma.user.findUnique({
    where: { email: email.toString() },
  });
  console.log('userdata is ', userdata);

  res.render('map', { userId: userdata.id });
});

const polygonDataHandler = (polygonData: Array<object>) => {
  try {
    let finalData = [];
    polygonData.map((data: any) => {
      let tempObj = {
        id: data.id,
        name: data.name,
        coordinates: data.geo_json.geometry.coordinates,
        area: {
          hectares: data.area.toFixed(2),
          acres: (data.area * 2.47105).toFixed(2),
          squareMeter: (data.area * 10000).toFixed(2),
          squareFoot: (data.area * 107639).toFixed(2),
        },
      };
      console.log('temp obj is ', tempObj);
      finalData.push(tempObj);
    });

    return finalData;
  } catch (e) {
    console.log('error in filtering', e);
    return null;
  }
};

router.get('/get-weather-forecast/:polygonId', async (req, res) => {
  try {
    console.log('in request');
    let polygon = await axios.get(
      `http://api.agromonitoring.com/agro/1.0/polygons/${req.params.polygonId}?appid=${env.APP_ID}`
    );
    let polygonData = polygon.data;

    let weatherData = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${polygonData.center[1]}&lon=${polygonData.center[0]}&appid=${env.APP_ID}`
    );

    let finalWeatherData = weatherData.data;

    let finaldata = [];

    finalWeatherData.map((weather: any) => {
      let date = new Date(weather.dt * 1000);
      weather = {
        ...weather,
        date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      };
      finaldata.push(weather);
    });

    console.log('polygon data is ', polygonData);
    return res.send({ status: true, data: finaldata });
  } catch (e) {
    console.log('error in fetching ', e);
    return res.send({ status: false, e: e.message });
  }
});

router.get('/get-user-polygon/:email', async (req, res) => {
  try {
    const email = req.params.email;
    console.log('email is ', email);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        polygonId: true,
      },
    });

    let polygonData = await axios.get(url.fetchPolygonData);

    let finalData = polygonData.data.filter((a) => {
      return user.polygonId.find((b) => b.polygonId === a.id);
    });

    let formattedData = polygonDataHandler(finalData);

    return res.send({ status: true, data: formattedData });
  } catch (err) {
    console.log('error in getting user polygon ', err);
    return res.send({ status: false, err: 'error' });
  }
});

router.post('/create-field', async (req, res) => {
  try {
    console.log('body is ', req.body);
    let { name, coordinates, userId } = req.body;

    let newField: any = await axios.post(url.createPolygon, {
      name,
      geo_json: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates,
        },
      },
    });

    let polyId = newField.data.id || '';
    let newPolygon = await prisma.polygonId.create({
      data: { polygonId: polyId, user: { connect: { id: userId } } },
    });

    return res.send({ status: true, data: newField.data });
  } catch (e) {
    console.log('error in creating field ', e);
    return res.send({ status: false, e: e.message });
  }
});

router.get('/get-satellite-data/:polygonId/:endDate', async (req, res) => {
  try {
    let satelitteData = await axios.get(
      `${url.fetchSateliteData}&start=${moment(req.params.endDate, 'YYYY-MM-DD')
        .subtract(7, 'days')
        .unix()}&end=${moment(
        req.params.endDate,
        'YYYY-MM-DD'
      ).unix()}&polyid=${req.params.polygonId}`
    );

    let resData = satelitteData.data;
    let finalData: any = {};
    await Promise.all(
      Object.keys(resData[0].stats).map(async (key) => {
        let statsData = await axios.get(resData[0].stats[`${key}`]);
        finalData[`${key}`] = statsData.data;
      })
    );

    return res.send({ status: true, data: finalData });
  } catch (e) {
    console.log('error in creating field ', e);
    return res.send({ status: false, e: e.message });
  }
});

router.get('/get-soil-data/:polygonId', async (req, res) => {
  try {
    let response = await axios.get(
      `${url.fetchSoilData}&polyid=${req.params.polygonId}`
    );

    response.data.dt = moment(response.data.dt * 1000).format('YYYY-MM-DD');

    return res.send({ status: true, data: response.data });
  } catch (e) {
    console.log('error in getting soil data ', e);
    return res.send({ status: false, e: e.message });
  }
});

router.get('/get-polygon-data/:polygonId', async (req, res) => {
  try {
    let response = await axios.get(
      `${url.fetchPolygonData}/${req.params.polygonId}?appid=${env.APP_ID}`
    );

    let data = response.data;

    let finalData = {
      id: data.id,
      name: data.name,
      coordinates: data.geo_json.geometry.coordinates,
      area: {
        hectares: data.area.toFixed(2),
        acres: (data.area * 2.47105).toFixed(2),
        squareMeter: (data.area * 10000).toFixed(2),
        squareFoot: (data.area * 107639).toFixed(2),
      },
    };

    return res.send({ status: true, finalData });
  } catch (e) {
    return res.send({ status: false, e: e.message });
  }
});

router.get('/get-weather-data/:polygonId/:date', async (req, res) => {});

module.exports = router;
