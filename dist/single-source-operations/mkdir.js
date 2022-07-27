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
exports.MkDir = exports.MkDirParameter = void 0;
const fsExtra = __importStar(require("fs-extra"));
const single_source_operation_1 = require("./single-source-operation");
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
class MkDirParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.dirPathToMake = null;
        this.overwrite = true;
    }
    getSingleSource() {
        return this.dirPathToMake;
    }
}
exports.MkDirParameter = MkDirParameter;
class MkDir extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'MkDir';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new MkDirParameter());
        super.setParams(this.params);
        this.params.throwErrorIfSourceDoesNotExists = false;
    }
    run() {
        super.runSingleFileOperation(this.funcionToRun.bind(this));
    }
    funcionToRun(dirPathToMake) {
        fsExtra.ensureDirSync(dirPathToMake);
    }
}
exports.MkDir = MkDir;
