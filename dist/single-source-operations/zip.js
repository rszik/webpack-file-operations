"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const zipper = __importStar(require("zip-local"));
const single_source_operation_1 = require("./single-source-operation");
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const classes_1 = require("../classes");
class ZipParameter extends single_source_operation_1.SingleSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.destinationFile = '';
        this.sourceFolderToZip = '';
    }
    getSingleSource() {
        return this.sourceFolderToZip;
    }
}
exports.ZipParameter = ZipParameter;
class Zip extends single_source_operation_1.SingleSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'Zip';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new ZipParameter());
        super.setParams(this.params);
    }
    run() {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }
    funcionToRun(sourceFolderToZip) {
        classes_1.FileUtils.ensureFolderStructureExists(path.dirname(this.params.destinationFile));
        webpack_hook_attacher_plugin_1.ConsoleLogger.consoleDebug(`Zipping starting.`);
        zipper.sync.zip(sourceFolderToZip).compress().save(this.params.destinationFile);
        webpack_hook_attacher_plugin_1.ConsoleLogger.consoleDebug('Zipping finished.');
    }
}
exports.Zip = Zip;
