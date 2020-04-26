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
class CreateFileParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.filePathToCreate = null;
    }
    getSingleSource() {
        return this.filePathToCreate;
    }
}
exports.CreateFileParameter = CreateFileParameter;
class CreateFile extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'CreateFile';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new CreateFileParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        this.ensureDestinationFileDirectoryExists(sourceFilePath);
        fsExtra.createFileSync(sourceFilePath);
    }
}
exports.CreateFile = CreateFile;
