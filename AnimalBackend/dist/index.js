"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const ngoRoute_1 = __importDefault(require("./routes/ngoRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const animalRoute_1 = __importDefault(require("./routes/animalRoute"));
const getNgo_1 = __importDefault(require("./routes/getNgo"));
const animalRequests_1 = __importDefault(require("./routes/animalRequests"));
const deleteReq_1 = __importDefault(require("./routes/deleteReq"));
const animalReqNgo_1 = __importDefault(require("./routes/animalReqNgo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/user', userRoute_1.default, animalRequests_1.default, deleteReq_1.default, authRoute_1.default);
app.use('/api/ngo', ngoRoute_1.default, authRoute_1.default, animalReqNgo_1.default);
app.use('/api', animalRoute_1.default, getNgo_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
