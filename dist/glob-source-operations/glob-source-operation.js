"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobSourceOperation = exports.GlobSourceOperationParameter = void 0;
const path = __importStar(require("path"));
const glob = __importStar(require("glob"));
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
const classes_1 = require("../classes");
class GlobSourceOperationParameter extends webpack_hook_attacher_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.replaceHash = false;
        this.hideWarningIfSourceDoesNotExists = false;
        this.checkGlobResultNumber = 0;
        this.throwErrorIfNotExpectedGlobResultNumberFound = true;
        this.sourceRoots = null;
        this.globPattern = '**/*';
        this.globOptions = {};
    }
}
exports.GlobSourceOperationParameter = GlobSourceOperationParameter;
class GlobSourceOperation extends webpack_hook_attacher_1.Operation {
    constructor() {
        super(...arguments);
        this.sourceRoots = [];
    }
    setParams(params) {
        super.setParams(params);
        this.params = params;
        this.setFullSourceGlobPatterns();
        webpack_hook_attacher_1.ConsoleLogger.consoleDebug(`this.sourceRoots after setFullSourceGlobPatterns: ${webpack_hook_attacher_1.Utils.formattedJSONStringify(this.sourceRoots)}`);
    }
    runGlobSourceOperation(funcionToRun, executeFuncionToRunOnSourcesFromGlobOneByOne = true) {
        super.runWrapper(this, () => {
            if (this.params.replaceHash) {
                this.setHashedFullSourceGlobPatterns();
            }
            let sourcesFromGlob = [];
            this.sourceRoots.forEach((sourceRoot) => {
                sourcesFromGlob.push(...glob.sync(sourceRoot.replace(/\\/g, '/'), this.params.globOptions));
            });
            if (this.params.checkGlobResultNumber) {
                if (sourcesFromGlob.length !== this.params.checkGlobResultNumber) {
                    let errorMessage = `Expected glob result number does not match. Result number: ${sourcesFromGlob.length} Expected number: ${this.params.checkGlobResultNumber}`;
                    if (this.params.throwErrorIfNotExpectedGlobResultNumberFound) {
                        throw errorMessage;
                    }
                    else {
                        webpack_hook_attacher_1.ConsoleLogger.consoleWarning(`${errorMessage}`);
                    }
                }
            }
            if (sourcesFromGlob.length === 0) {
                let missingPathErrorText = `Could not run operation: There is no sourcesFromGlob to ${this.params.sourceRoots}`;
                if (!this.params.hideWarningIfSourceDoesNotExists) {
                    webpack_hook_attacher_1.ConsoleLogger.consoleWarning(missingPathErrorText);
                }
            }
            else {
                webpack_hook_attacher_1.ConsoleLogger.consoleDebug(`sourceFromGlobs: ${webpack_hook_attacher_1.Utils.formattedJSONStringify(sourcesFromGlob)}`);
            }
            if (executeFuncionToRunOnSourcesFromGlobOneByOne) {
                sourcesFromGlob.forEach((sourceFromGlob) => {
                    funcionToRun(sourceFromGlob);
                });
            }
            else {
                funcionToRun(sourcesFromGlob);
            }
        });
    }
    setFullSourceGlobPatterns() {
        this.params.sourceRoots.forEach((sourceRoot) => {
            if (this.params.globPattern) {
                this.sourceRoots.push(path.join(sourceRoot, this.params.globPattern));
            }
            else {
                this.sourceRoots.push(path.join(sourceRoot));
            }
        });
    }
    setHashedFullSourceGlobPatterns() {
        this.sourceRoots.forEach((sourceRoot, index) => {
            this.sourceRoots[index] = classes_1.FileUtils.replaceHash(sourceRoot, this.compilerHookCallbackParameters.compilation);
        });
    }
    getDestinationFileFullPathAndEnsureDirectoryExists(sourceFileRelativePath, destinationDir) {
        let destinationFileFullPath;
        this.params.sourceRoots.forEach((sourceRoot) => {
            let sourceFileIsInTheSourceRoot = path.resolve(sourceFileRelativePath).startsWith(path.resolve(sourceRoot));
            if (sourceFileIsInTheSourceRoot) {
                destinationFileFullPath = path.join(destinationDir, path.relative(sourceRoot, sourceFileRelativePath));
                classes_1.FileUtils.ensureFolderStructureExists(path.dirname(destinationFileFullPath));
                return;
            }
        });
        return destinationFileFullPath;
    }
}
exports.GlobSourceOperation = GlobSourceOperation;
