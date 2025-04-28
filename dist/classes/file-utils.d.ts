/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { Compilation } from 'webpack';
export declare class SplittedFile {
    fileContentRows: string[];
    fileContent: string;
    sourceFullFilePath: string;
}
export declare class IndexAndCount {
    index: number;
    count: number;
}
export declare class ReplaceRule {
    search: string | RegExp;
    replace: string | Function;
}
export declare class FileUtils {
    static replaceHash(filename: string, compilationParam: Compilation): string;
    static ensureFolderStructureExists(destinationDirectory: string): void;
    static getSplittedFile(sourceFromGlob: string, encoding: BufferEncoding): SplittedFile;
    static isFile(fullPath: string): boolean;
    static isExists(fullPath: string): boolean;
    static insertTextToSingleFile(singleSource: string, encoding: BufferEncoding, text: string, rowIndex: number): void;
    static removeRowsFromSingleFile(sourceFilePath: string, encoding: BufferEncoding, rowIndexAndRemoveCountList: IndexAndCount[]): void;
    static replaceInSingleFile(sourceFilePath: string, encoding: BufferEncoding, replaceRules: ReplaceRule[]): void;
}
