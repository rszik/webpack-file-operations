"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRowsFromFiles = exports.RemoveRowsFromFilesParameter = void 0;
const glob_source_operation_1 = require("./glob-source-operation");
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
const classes_1 = require("../classes");
class RemoveRowsFromFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.rowIndexAndRemoveCount = null;
        this.encoding = 'utf-8';
    }
}
exports.RemoveRowsFromFilesParameter = RemoveRowsFromFilesParameter;
class RemoveRowsFromFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'RemoveRowsFromFiles';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new RemoveRowsFromFilesParameter());
        super.setParams(this.params);
    }
    run() {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        classes_1.FileUtils.removeRowsFromSingleFile(sourceFilePath, this.params.encoding, this.params.rowIndexAndRemoveCount);
    }
}
exports.RemoveRowsFromFiles = RemoveRowsFromFiles;
