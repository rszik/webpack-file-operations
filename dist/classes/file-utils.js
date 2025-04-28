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
exports.FileUtils = exports.ReplaceRule = exports.IndexAndCount = exports.SplittedFile = void 0;
const path = __importStar(require("path"));
const fsExtra = __importStar(require("fs-extra"));
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
class SplittedFile {
}
exports.SplittedFile = SplittedFile;
class IndexAndCount {
    constructor() {
        this.index = 0;
        this.count = 0;
    }
}
exports.IndexAndCount = IndexAndCount;
class ReplaceRule {
}
exports.ReplaceRule = ReplaceRule;
class FileUtils {
    static replaceHash(filename, compilationParam) {
        if (compilationParam) {
            return filename.replace('[hash]', compilationParam.hash);
        }
        else {
            webpack_hook_attacher_plugin_1.ConsoleLogger.consoleWarning('compilation is null in this hooktype, replaceHash will affect in hooktypes with compilation parameter');
            return filename;
        }
    }
    static ensureFolderStructureExists(destinationDirectory) {
        fsExtra.ensureDirSync(destinationDirectory);
    }
    static getSplittedFile(sourceFromGlob, encoding) {
        let res = new SplittedFile();
        res.sourceFullFilePath = path.resolve(sourceFromGlob);
        res.fileContent = fsExtra.readFileSync(res.sourceFullFilePath, encoding);
        res.fileContentRows = res.fileContent.split('\n');
        return res;
    }
    static isFile(fullPath) {
        return fsExtra.lstatSync(fullPath).isFile();
    }
    static isExists(fullPath) {
        return fsExtra.existsSync(fullPath);
    }
    static insertTextToSingleFile(singleSource, encoding, text, rowIndex) {
        let splittedFile = FileUtils.getSplittedFile(singleSource, encoding);
        let splittedTextToInsert = text.split('\n');
        splittedFile.fileContentRows.splice(rowIndex, 0, ...splittedTextToInsert);
        let newFileContent = splittedFile.fileContentRows.join('\n');
        fsExtra.writeFileSync(splittedFile.sourceFullFilePath, newFileContent, { encoding: encoding });
    }
    static removeRowsFromSingleFile(sourceFilePath, encoding, rowIndexAndRemoveCountList) {
        let splittedFile = FileUtils.getSplittedFile(sourceFilePath, encoding);
        rowIndexAndRemoveCountList.forEach((rowIndexAndRemoveCount) => {
            splittedFile.fileContentRows.splice(rowIndexAndRemoveCount.index, rowIndexAndRemoveCount.count);
        });
        let newFileContent = splittedFile.fileContentRows.join('\n');
        fsExtra.writeFileSync(splittedFile.sourceFullFilePath, newFileContent, { encoding: encoding });
    }
    static replaceInSingleFile(sourceFilePath, encoding, replaceRules) {
        const sourceFullFilePath = path.resolve(sourceFilePath);
        let fileContent = fsExtra.readFileSync(sourceFullFilePath, encoding);
        replaceRules.forEach((replaceRule) => {
            if (replaceRule.replace instanceof Function) {
                fileContent = fileContent.replace(replaceRule.search, replaceRule.replace.bind(global));
            }
            else {
                fileContent = fileContent.replace(replaceRule.search, replaceRule.replace);
            }
        });
        fsExtra.writeFileSync(sourceFullFilePath, fileContent, { encoding: encoding });
    }
}
exports.FileUtils = FileUtils;
