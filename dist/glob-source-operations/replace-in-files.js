"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceInFiles = exports.ReplaceInFilesParameter = void 0;
const glob_source_operation_1 = require("./glob-source-operation");
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
const classes_1 = require("../classes");
class ReplaceInFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.replaceRules = null;
        this.encoding = 'utf-8';
    }
}
exports.ReplaceInFilesParameter = ReplaceInFilesParameter;
class ReplaceInFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'ReplaceInFiles';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new ReplaceInFilesParameter());
        super.setParams(this.params);
    }
    run() {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        classes_1.FileUtils.replaceInSingleFile(sourceFilePath, this.params.encoding, this.params.replaceRules);
    }
}
exports.ReplaceInFiles = ReplaceInFiles;
