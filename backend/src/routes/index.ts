import express from 'express';
const router = express.Router();
import axios from 'axios';
import { url } from '../../constants/url';
import moment from 'moment';

router.get('/', (req, res) => {
  res.render('map');
});

router.post('/create-field', async (req, res) => {
  try {
    console.log('body is ', req.body);
    let { name, coordinates } = req.body;

    let newField = await axios.post(url.createPolygon, {
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

    console.log('new field is ', newField);

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

module.exports = router;
