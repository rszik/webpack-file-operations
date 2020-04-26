"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./copy-multiple-files"));
__export(require("./move-multiple-files"));
__export(require("./delete-multipe-files"));
__export(require("./replace-in-files"));
__export(require("./remove-rows-from-files"));
__export(require("./insert-text-to-files"));
__export(require("./merge-json-files"));
var glob_source_operation_1 = require(".//glob-source-operation");
exports.GlobSourceOperation = glob_source_operation_1.GlobSourceOperation;
exports.GlobSourceOperationParameter = glob_source_operation_1.GlobSourceOperationParameter;
