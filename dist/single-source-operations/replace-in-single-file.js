"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceInSingleFile = exports.ReplaceInSingleFileParameter = void 0;
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
const single_source_operation_1 = require("./single-source-operation");
const classes_1 = require("../classes");
class ReplaceInSingleFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.sourceFilePath = null;
        this.replaceRules = null;
        this.encoding = 'utf-8';
    }
    getSingleSource() {
        return this.sourceFilePath;
    }
}
exports.ReplaceInSingleFileParameter = ReplaceInSingleFileParameter;
class ReplaceInSingleFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'ReplaceInSingleFile';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new ReplaceInSingleFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        classes_1.FileUtils.replaceInSingleFile(sourceFilePath, this.params.encoding, this.params.replaceRules);
    }
}
exports.ReplaceInSingleFile = ReplaceInSingleFile;
