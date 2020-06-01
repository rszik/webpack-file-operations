"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob = __importStar(require("glob"));
const path = __importStar(require("path"));
const fsExtra = __importStar(require("fs-extra"));
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const classes_1 = require("../classes");
class SingleSourceOperationParameter extends webpack_hook_attacher_plugin_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.replaceHash = false;
        this.throwErrorIfSourceDoesNotExists = true;
    }
}
exports.SingleSourceOperationParameter = SingleSourceOperationParameter;
class SingleSourceOperation extends webpack_hook_attacher_plugin_1.Operation {
    setParams(params) {
        super.setParams(params);
        this.params = params;
    }
    runSingleFileOperationIfExists(func) {
        super.runWrapper(this, () => {
            let singleSource = this.params.getSingleSource();
            this.checkCantBeGlobPattern(singleSource);
            if (this.params.replaceHash) {
                singleSource = classes_1.FileUtils.replaceHash(singleSource, this.compilerHookParameters.compilation);
            }
            let sourceExists = fsExtra.existsSync(singleSource);
            if (!sourceExists) {
                if (this.params.throwErrorIfSourceDoesNotExists) {
                    throw new Error(`Source doesn't exists`);
                }
            }
            if (sourceExists) {
                func(singleSource);
            }
        });
    }
    runSingleFileOperation(func) {
        super.runWrapper(this, () => {
            let singleSource = this.params.getSingleSource();
            this.checkCantBeGlobPattern(singleSource);
            if (this.params.replaceHash) {
                singleSource = classes_1.FileUtils.replaceHash(singleSource, this.compilerHookParameters.compilation);
            }
            func(singleSource);
        });
    }
    checkCantBeGlobPattern(singleSource) {
        if (glob.hasMagic(singleSource)) {
            let errorText = `${this.name} - Source '${this.params.getSingleSource()}' can't be glob pattern`;
            webpack_hook_attacher_plugin_1.ConsoleLogger.consoleError(errorText);
            throw errorText;
        }
    }
    ensureDestinationFileDirectoryExists(destinationFilePath) {
        classes_1.FileUtils.ensureFolderStructureExists(path.dirname(destinationFilePath));
    }
}
exports.SingleSourceOperation = SingleSourceOperation;
