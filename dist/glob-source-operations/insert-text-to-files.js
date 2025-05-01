"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertTextToFiles = exports.InsertTextToFilesParameter = void 0;
const classes_1 = require("../classes");
const glob_source_operation_1 = require("./glob-source-operation");
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
class InsertTextToFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.rowIndex = 0;
        this.text = null;
        this.encoding = 'utf-8';
    }
}
exports.InsertTextToFilesParameter = InsertTextToFilesParameter;
class InsertTextToFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'InsertTextToFiles';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new InsertTextToFilesParameter());
        super.setParams(this.params);
    }
    run() {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        classes_1.FileUtils.insertTextToSingleFile(sourceFilePath, this.params.encoding, this.params.text, this.params.rowIndex);
    }
}
exports.InsertTextToFiles = InsertTextToFiles;
