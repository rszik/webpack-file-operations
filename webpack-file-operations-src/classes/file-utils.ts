/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as path from 'path';
import * as fsExtra from 'fs-extra';
import { Compilation } from 'webpack';
import { ConsoleLogger } from '@wecdev/webpack-hook-attacher-plugin';

export class SplittedFile {
    public fileContentRows: string[];
    public fileContent: string;
    public sourceFullFilePath: string;
}

export class IndexAndCount {
    public index: number = 0;
    public count: number = 0;
}

export class ReplaceRule {
    search: string | RegExp;
    replace: string | Function;
}

export class FileUtils {

    public static replaceHash(filename: string, compilationParam: Compilation): string {
        if (compilationParam) {
            return filename.replace('[hash]', compilationParam.hash);
        } else {
            ConsoleLogger.consoleWarning('compilation is null in this hooktype, replaceHash will affect in hooktypes with compilation parameter');
            return filename;
        }
    }

    public static ensureFolderStructureExists(destinationDirectory: string): void {
        fsExtra.ensureDirSync(destinationDirectory);
    }

    public static getSplittedFile(sourceFromGlob: string, encoding: string): SplittedFile {
        let res: SplittedFile = new SplittedFile();
        res.sourceFullFilePath = path.resolve(sourceFromGlob);
        res.fileContent = fsExtra.readFileSync(res.sourceFullFilePath, encoding);
        res.fileContentRows = res.fileContent.split('\n');
        return res;
    }

    public static isFile(fullPath: string): boolean {
        return fsExtra.lstatSync(fullPath).isFile();
    }

    public static isExists(fullPath: string): boolean {
        return fsExtra.existsSync(fullPath);
    }

    public static insertTextToSingleFile(singleSource: string, encoding: string, text: string, rowIndex: number): void {
        let splittedFile: SplittedFile = FileUtils.getSplittedFile(singleSource, encoding);
        let splittedTextToInsert: string[] = text.split('\n');
        splittedFile.fileContentRows.splice(rowIndex, 0, ...splittedTextToInsert);
        let newFileContent: string = splittedFile.fileContentRows.join('\n');
        fsExtra.writeFileSync(splittedFile.sourceFullFilePath, newFileContent, { encoding: encoding });
    }

    public static removeRowsFromSingleFile(sourceFilePath: string, encoding: string, rowIndexAndRemoveCountList: IndexAndCount[]): void {
        let splittedFile: SplittedFile = FileUtils.getSplittedFile(sourceFilePath, encoding);
        rowIndexAndRemoveCountList.forEach((rowIndexAndRemoveCount: IndexAndCount): void => {
            splittedFile.fileContentRows.splice(rowIndexAndRemoveCount.index, rowIndexAndRemoveCount.count);
        });
        let newFileContent: string = splittedFile.fileContentRows.join('\n');
        fsExtra.writeFileSync(splittedFile.sourceFullFilePath, newFileContent, { encoding: encoding });
    }

    public static replaceInSingleFile(sourceFilePath: string, encoding: string, replaceRules: ReplaceRule[]): void {
        const sourceFullFilePath: string = path.resolve(sourceFilePath);
        let fileContent: string = fsExtra.readFileSync(sourceFullFilePath, encoding);
        replaceRules.forEach((replaceRule: ReplaceRule): void => {
            if (replaceRule.replace instanceof Function) {
                fileContent = fileContent.replace(replaceRule.search, replaceRule.replace.bind(global));
            } else {
                fileContent = fileContent.replace(replaceRule.search, replaceRule.replace);
            }
        });
        fsExtra.writeFileSync(sourceFullFilePath, fileContent, { encoding: encoding });
    }
}
