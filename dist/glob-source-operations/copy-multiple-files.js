"use strict";
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
exports.CopyMultipleFiles = exports.CopyMultipleFilesParameter = void 0;
const fsExtra = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const glob_source_operation_1 = require("./glob-source-operation");
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
const classes_1 = require("../classes");
class CopyMultipleFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.destinationDir = null;
        this.keepFolderStructure = true;
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
        let destinationFileFullPath;
        if (this.params.keepFolderStructure) {
            destinationFileFullPath = this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        }
        else {
            destinationFileFullPath = path.join(this.params.destinationDir, path.basename(sourceFromGlob));
        }
        if (classes_1.FileUtils.isFile(sourceFromGlob)) {
            fsExtra.copyFileSync(sourceFromGlob, destinationFileFullPath);
        }
    }
}
exports.CopyMultipleFiles = CopyMultipleFiles;
