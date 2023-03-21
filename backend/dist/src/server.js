"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = constants_1.env.PORT;
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use('/', require('./routes/index'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map