"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobSourceOperationParameter = exports.GlobSourceOperation = void 0;
__exportStar(require("./copy-multiple-files"), exports);
__exportStar(require("./move-multiple-files"), exports);
__exportStar(require("./delete-multipe-files"), exports);
__exportStar(require("./replace-in-files"), exports);
__exportStar(require("./remove-rows-from-files"), exports);
__exportStar(require("./insert-text-to-files"), exports);
__exportStar(require("./merge-json-files"), exports);
var glob_source_operation_1 = require(".//glob-source-operation");
Object.defineProperty(exports, "GlobSourceOperation", { enumerable: true, get: function () { return glob_source_operation_1.GlobSourceOperation; } });
Object.defineProperty(exports, "GlobSourceOperationParameter", { enumerable: true, get: function () { return glob_source_operation_1.GlobSourceOperationParameter; } });
