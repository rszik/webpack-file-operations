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
const single_source_operation_1 = require("./single-source-operation");
class CopySingleFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.sourceFilePath = null;
        this.destinationFilePath = null;
    }
    getSingleSource() {
        return this.sourceFilePath;
    }
}
exports.CopySingleFileParameter = CopySingleFileParameter;
class CopySingleFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'CopySingleFile';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new CopySingleFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        this.ensureDestinationFileDirectoryExists(this.params.destinationFilePath);
        fsExtra.copyFileSync(sourceFilePath, this.params.destinationFilePath);
    }
}
exports.CopySingleFile = CopySingleFile;
