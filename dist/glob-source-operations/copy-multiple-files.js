"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fsExtra = __importStar(require("fs-extra"));
const glob_source_operation_1 = require("./glob-source-operation");
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const classes_1 = require("../classes");
class CopyMultipleFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.destinationDir = null;
    }
}
exports.CopyMultipleFilesParameter = CopyMultipleFilesParameter;
class CopyMultipleFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'CopyMultipleFiles';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new CopyMultipleFilesParameter());
        super.setParams(this.params);
    }
    run() {
        classes_1.FileUtils.ensureFolderStructureExists(this.params.destinationDir);
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFromGlob) {
        let destinationFileFullPath = this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        if (classes_1.FileUtils.isFile(sourceFromGlob)) {
            fsExtra.copyFileSync(sourceFromGlob, destinationFileFullPath);
        }
    }
}
exports.CopyMultipleFiles = CopyMultipleFiles;
