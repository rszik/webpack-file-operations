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
exports.SingleSourceOperationParameter = exports.SingleSourceOperation = void 0;
__exportStar(require("./copy-single-file"), exports);
__exportStar(require("./delete-single-file-or-directory"), exports);
__exportStar(require("./move-single-file"), exports);
__exportStar(require("./mkdir"), exports);
__exportStar(require("./insert-text-to-single-file"), exports);
__exportStar(require("./remove-rows-from-single-file"), exports);
__exportStar(require("./replace-in-single-file"), exports);
__exportStar(require("./create-file"), exports);
__exportStar(require("./zip"), exports);
var single_source_operation_1 = require("./single-source-operation");
Object.defineProperty(exports, "SingleSourceOperation", { enumerable: true, get: function () { return single_source_operation_1.SingleSourceOperation; } });
Object.defineProperty(exports, "SingleSourceOperationParameter", { enumerable: true, get: function () { return single_source_operation_1.SingleSourceOperationParameter; } });
