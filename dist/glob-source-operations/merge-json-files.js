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
exports.MergeJSONFiles = exports.MergeJSONFilesParameter = void 0;
const fsExtra = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const glob_source_operation_1 = require("./glob-source-operation");
const classes_1 = require("../classes");
class MergeJSONFilesParameter extends glob_source_operation_1.GlobSourceOperationParameter {
    constructor() {
        super(...arguments);
        this.encoding = 'utf-8';
        this.destinationFile = null;
        this.replacer = null;
        this.space = 4;
    }
}
exports.MergeJSONFilesParameter = MergeJSONFilesParameter;
class MergeJSONFiles extends glob_source_operation_1.GlobSourceOperation {
    constructor(userParams) {
        super();
        this.name = 'MergeJSONFiles';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new MergeJSONFilesParameter());
        super.setParams(this.params);
    }
    run() {
        super.runGlobSourceOperation(this.funcionToRun.bind(this), false);
    }
    funcionToRun(sourcesFromGlob) {
        classes_1.FileUtils.ensureFolderStructureExists(path.dirname(this.params.destinationFile));
        let mergedObject = {};
        sourcesFromGlob.forEach((sourceFromGlob) => {
            const src = path.resolve(sourceFromGlob);
            let fileContent = fsExtra.readFileSync(src, this.params.encoding);
            let objectFromRes = JSON.parse(fileContent);
            this.deepMerge(mergedObject, objectFromRes);
        });
        fsExtra.writeFileSync(this.params.destinationFile, webpack_hook_attacher_plugin_1.Utils.formattedJSONStringify(mergedObject), { encoding: this.params.encoding });
    }
    deepMerge(target, source) {
        const isObject = (obj) => obj && typeof obj === 'object';
        if (!isObject(target) || !isObject(source)) {
            return source;
        }
        Object.keys(source).forEach((key) => {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            }
            else if (isObject(targetValue) && isObject(sourceValue)) {
                target[key] = this.deepMerge(Object.assign({}, targetValue), sourceValue);
            }
            else {
                target[key] = sourceValue;
            }
        });
        return target;
    }
}
exports.MergeJSONFiles = MergeJSONFiles;
