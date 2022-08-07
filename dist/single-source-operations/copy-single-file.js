"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopySingleFile = exports.CopySingleFileParameter = void 0;
const fsExtra = __importStar(require("fs-extra"));
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
const single_source_operation_1 = require("./single-source-operation");
class CopySingleFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.sourceFilePath = null;
        this.destinationFilePath = null;
    }
    getSingleSource() {
        return this.sourceFilePath;
    }
}
exports.CopySingleFileParameter = CopySingleFileParameter;
class CopySingleFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'CopySingleFile';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new CopySingleFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        this.ensureDestinationFileDirectoryExists(this.params.destinationFilePath);
        fsExtra.copyFileSync(sourceFilePath, this.params.destinationFilePath);
    }
}
exports.CopySingleFile = CopySingleFile;
