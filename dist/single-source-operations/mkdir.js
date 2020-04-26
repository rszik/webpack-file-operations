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
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(dirPathToMake) {
        fsExtra.ensureDirSync(dirPathToMake);
    }
}
exports.MkDir = MkDir;
