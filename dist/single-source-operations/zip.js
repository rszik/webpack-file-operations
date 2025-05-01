"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zip = exports.ZipParameter = void 0;
const path = __importStar(require("path"));
const zipper = __importStar(require("zip-local"));
const single_source_operation_1 = require("./single-source-operation");
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
const classes_1 = require("../classes");
class ZipParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.destinationFile = '';
        this.sourceFolderToZip = '';
    }
    getSingleSource() {
        return this.sourceFolderToZip;
    }
}
exports.ZipParameter = ZipParameter;
class Zip extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'Zip';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new ZipParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFolderToZip) {
        classes_1.FileUtils.ensureFolderStructureExists(path.dirname(this.params.destinationFile));
        webpack_hook_attacher_1.ConsoleLogger.consoleDebug(`Zipping starting.`);
        zipper.sync.zip(sourceFolderToZip).compress().save(this.params.destinationFile);
        webpack_hook_attacher_1.ConsoleLogger.consoleDebug('Zipping finished.');
    }
}
exports.Zip = Zip;
