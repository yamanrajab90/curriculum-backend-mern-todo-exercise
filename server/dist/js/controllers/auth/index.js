"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const keys_1 = __importDefault(require("../../config/keys"));
//TODO: replace all "any" in all endpoints.
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
        return res
            .status(400)
            .json({ error: `all fields are required`, status: 'error' });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        return res
            .status(400)
            .json({ error: `${email}: email already used`, status: 'error' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield user_1.default.create({
        email,
        password: hashedPassword,
        fullName: fullName
    });
    const payload = { email: req.body.email };
    const token = jwt.sign(payload, keys_1.default.SECRET_KEY);
    res.json({ token });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: `email and password are required`, status: 'error' });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json({ error: `no such an email`, status: 'error' });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ error: `password is wrong`, status: 'error' });
    }
    const payload = { email: req.body.email };
    const token = jwt.sign(payload, keys_1.default.SECRET_KEY);
    res.json({ token });
});
exports.login = login;
