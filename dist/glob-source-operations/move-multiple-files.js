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
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const glob_source_operation_1 = require("./glob-source-operation");
const classes_1 = require("../classes");
class MoveMultipleFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.overwrite = true;
        this.destinationDir = null;
    }
}
exports.MoveMultipleFilesParameter = MoveMultipleFilesParameter;
class MoveMultipleFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'MoveSingleFile';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new MoveMultipleFilesParameter());
        super.setParams(this.params);
        this.moveOptions = { overwrite: this.params.overwrite };
    }
    run() {
        classes_1.FileUtils.ensureFolderStructureExists(this.params.destinationDir);
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFromGlob) {
        this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        if (classes_1.FileUtils.isFile(sourceFromGlob)) {
            fsExtra.moveSync(sourceFromGlob, this.params.destinationDir, this.moveOptions);
        }
    }
}
exports.MoveMultipleFiles = MoveMultipleFiles;
