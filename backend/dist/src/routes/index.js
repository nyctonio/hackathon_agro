"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../../constants/url");
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("../../constants");
const prisma_1 = __importDefault(require("../../lib/prisma"));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.query;
    let userdata = yield prisma_1.default.user.findUnique({
        where: { email: email.toString() },
    });
    console.log('userdata is ', userdata);
    res.render('map', { userId: userdata.id });
}));
const polygonDataHandler = (polygonData) => {
    try {
        let finalData = [];
        polygonData.map((data) => {
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
    }
    catch (e) {
        console.log('error in filtering', e);
        return null;
    }
};
router.get('/get-weather-forecast/:polygonId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('in request');
        let polygon = yield axios_1.default.get(`http://api.agromonitoring.com/agro/1.0/polygons/${req.params.polygonId}?appid=${constants_1.env.APP_ID}`);
        let polygonData = polygon.data;
        let weatherData = yield axios_1.default.get(`https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${polygonData.center[1]}&lon=${polygonData.center[0]}&appid=${constants_1.env.APP_ID}`);
        let finalWeatherData = weatherData.data;
        let finaldata = [];
        finalWeatherData.map((weather) => {
            let date = new Date(weather.dt * 1000);
            weather = Object.assign(Object.assign({}, weather), { date: (0, moment_1.default)(date).format('YYYY-MM-DD HH:mm:ss') });
            finaldata.push(weather);
        });
        console.log('polygon data is ', polygonData);
        return res.send({ status: true, data: finaldata });
    }
    catch (e) {
        console.log('error in fetching ', e);
        return res.send({ status: false, e: e.message });
    }
}));
router.get('/get-user-polygon/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        console.log('email is ', email);
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
            include: {
                polygonId: true,
            },
        });
        let polygonData = yield axios_1.default.get(url_1.url.fetchPolygonData);
        let finalData = polygonData.data.filter((a) => {
            return user.polygonId.find((b) => b.polygonId === a.id);
        });
        let formattedData = polygonDataHandler(finalData);
        return res.send({ status: true, data: formattedData });
    }
    catch (err) {
        console.log('error in getting user polygon ', err);
        return res.send({ status: false, err: 'error' });
    }
}));
router.post('/create-field', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('body is ', req.body);
        let { name, coordinates, userId } = req.body;
        let newField = yield axios_1.default.post(url_1.url.createPolygon, {
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
        let newPolygon = yield prisma_1.default.polygonId.create({
            data: { polygonId: polyId, user: { connect: { id: userId } } },
        });
        return res.send({ status: true, data: newField.data });
    }
    catch (e) {
        console.log('error in creating field ', e);
        return res.send({ status: false, e: e.message });
    }
}));
router.get('/get-satellite-data/:polygonId/:endDate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let satelitteData = yield axios_1.default.get(`${url_1.url.fetchSateliteData}&start=${(0, moment_1.default)(req.params.endDate, 'YYYY-MM-DD')
            .subtract(7, 'days')
            .unix()}&end=${(0, moment_1.default)(req.params.endDate, 'YYYY-MM-DD').unix()}&polyid=${req.params.polygonId}`);
        let resData = satelitteData.data;
        let finalData = {};
        yield Promise.all(Object.keys(resData[0].stats).map((key) => __awaiter(void 0, void 0, void 0, function* () {
            let statsData = yield axios_1.default.get(resData[0].stats[`${key}`]);
            finalData[`${key}`] = statsData.data;
        })));
        return res.send({ status: true, data: finalData });
    }
    catch (e) {
        console.log('error in creating field ', e);
        return res.send({ status: false, e: e.message });
    }
}));
router.get('/get-soil-data/:polygonId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield axios_1.default.get(`${url_1.url.fetchSoilData}&polyid=${req.params.polygonId}`);
        response.data.dt = (0, moment_1.default)(response.data.dt * 1000).format('YYYY-MM-DD');
        return res.send({ status: true, data: response.data });
    }
    catch (e) {
        console.log('error in getting soil data ', e);
        return res.send({ status: false, e: e.message });
    }
}));
router.get('/get-polygon-data/:polygonId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield axios_1.default.get(`${url_1.url.fetchPolygonData}/${req.params.polygonId}?appid=${constants_1.env.APP_ID}`);
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
    }
    catch (e) {
        return res.send({ status: false, e: e.message });
    }
}));
router.get('/get-weather-data/:polygonId/:date', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
module.exports = router;
//# sourceMappingURL=index.js.map