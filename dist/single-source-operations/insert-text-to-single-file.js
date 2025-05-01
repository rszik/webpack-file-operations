"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertTextToSingleFile = exports.InsertTextToSingleFileParameter = void 0;
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
const classes_1 = require("../classes");
const single_source_operation_1 = require("./single-source-operation");
class InsertTextToSingleFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.sourceFilePath = null;
        this.rowIndex = 0;
        this.text = null;
        this.encoding = 'utf-8';
    }
    getSingleSource() {
        return this.sourceFilePath;
    }
}
exports.InsertTextToSingleFileParameter = InsertTextToSingleFileParameter;
class InsertTextToSingleFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'InsertTextToSingleFile';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new InsertTextToSingleFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(singleSource) {
        classes_1.FileUtils.insertTextToSingleFile(singleSource, this.params.encoding, this.params.text, this.params.rowIndex);
    }
}
exports.InsertTextToSingleFile = InsertTextToSingleFile;
