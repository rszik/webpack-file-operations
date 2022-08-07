"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRowsFromSingleFile = exports.RemoveRowsFromSingleFileParameter = void 0;
const classes_1 = require("../classes");
const single_source_operation_1 = require("./single-source-operation");
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
class RemoveRowsFromSingleFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.sourceFilePath = null;
        this.rowIndexAndRemoveCount = null;
        this.encoding = 'utf-8';
    }
    getSingleSource() {
        return this.sourceFilePath;
    }
}
exports.RemoveRowsFromSingleFileParameter = RemoveRowsFromSingleFileParameter;
class RemoveRowsFromSingleFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'RemoveRowsFromSingleFile';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new RemoveRowsFromSingleFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        classes_1.FileUtils.removeRowsFromSingleFile(sourceFilePath, this.params.encoding, this.params.rowIndexAndRemoveCount);
    }
}
exports.RemoveRowsFromSingleFile = RemoveRowsFromSingleFile;
