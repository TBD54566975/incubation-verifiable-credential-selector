"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sophtron = exports.mx = void 0;
const config = require("../../config");
exports.mx = {
    username: config.MxClientId,
    password: config.MxApiSecret,
    basePath: 'https://int-api.mx.com',
    baseOptions: {
        headers: {
            Accept: 'application/vnd.mx.api.v1+json',
        },
    },
    demoMemberId: config.MxDemoMemberId,
    demoUserId: config.MxDemoUserId,
};
exports.sophtron = {
    clientId: config.SophtronApiUserId,
    secret: config.SophtronApiUserSecret,
};
