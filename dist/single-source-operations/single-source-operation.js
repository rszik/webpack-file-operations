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
exports.SingleSourceOperation = exports.SingleSourceOperationParameter = void 0;
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
                singleSource = classes_1.FileUtils.replaceHash(singleSource, this.compilerHookCallbackParameters.compilation);
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
                singleSource = classes_1.FileUtils.replaceHash(singleSource, this.compilerHookCallbackParameters.compilation);
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
