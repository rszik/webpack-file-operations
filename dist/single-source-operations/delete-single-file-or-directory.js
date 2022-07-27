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
exports.DeleteSingleFileOrDirectory = exports.DeleteSingleFileOrDirectoryParameter = void 0;
const fsExtra = __importStar(require("fs-extra"));
const single_source_operation_1 = require("./single-source-operation");
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
class DeleteSingleFileOrDirectoryParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.deletePath = null;
    }
    getSingleSource() {
        return this.deletePath;
    }
}
exports.DeleteSingleFileOrDirectoryParameter = DeleteSingleFileOrDirectoryParameter;
class DeleteSingleFileOrDirectory extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'DeleteSingleFileOrDirectory';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new DeleteSingleFileOrDirectoryParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFilePath) {
        fsExtra.removeSync(sourceFilePath);
    }
}
exports.DeleteSingleFileOrDirectory = DeleteSingleFileOrDirectory;
