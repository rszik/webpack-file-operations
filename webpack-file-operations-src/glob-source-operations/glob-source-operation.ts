/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as path from 'path';
import * as glob from 'glob';

import { ConsoleLogger, Operation, OperationParameter, IOperationParameter, Utils } from '@wecdev/webpack-hook-attacher-plugin';

import { FileUtils } from '../classes';
import { GlobOptionsWithFileTypesFalse } from 'glob';


export interface IGlobSourceOperationParameter extends IOperationParameter {
    replaceHash?: boolean;
    hideWarningIfSourceDoesNotExists?: boolean;
    checkGlobResultNumber?: number;
    throwErrorIfNotExpectedGlobResultNumberFound?: boolean;

    sourceRoots: string[];
    globPattern?: string;
    globOptions?: GlobOptionsWithFileTypesFalse;
}

export class GlobSourceOperationParameter extends OperationParameter {
    public replaceHash?: boolean = false;
    public hideWarningIfSourceDoesNotExists?: boolean = false;
    public checkGlobResultNumber?: number = 0;
    public throwErrorIfNotExpectedGlobResultNumberFound?: boolean = true;

    public sourceRoots: string[] = null;
    public globPattern?: string = '**/*';
    public globOptions?: GlobOptionsWithFileTypesFalse = {};
}

export abstract class GlobSourceOperation extends Operation {

    public params: GlobSourceOperationParameter;

    private sourceRoots: string[] = [];

    protected setParams(params: GlobSourceOperationParameter): void {
        super.setParams(params);
        this.params = params;
        this.setFullSourceGlobPatterns();
        ConsoleLogger.consoleDebug(`this.sourceRoots after setFullSourceGlobPatterns: ${Utils.formattedJSONStringify(this.sourceRoots)}`);
    }

    protected runGlobSourceOperation(funcionToRun: Function, executeFuncionToRunOnSourcesFromGlobOneByOne: boolean = true): void {
        super.runWrapper(this, (): void => {
            if (this.params.replaceHash) {
                this.setHashedFullSourceGlobPatterns();
            }

            let sourcesFromGlob: string[] = [];
            this.sourceRoots.forEach((sourceRoot: string): void => {
                sourcesFromGlob.push(...glob.sync(sourceRoot.replace(/\\/g, '/'), this.params.globOptions));
            });

            if (this.params.checkGlobResultNumber) {
                if (sourcesFromGlob.length !== this.params.checkGlobResultNumber) {
                    let errorMessage: string = `Expected glob result number does not match. Result number: ${sourcesFromGlob.length} Expected number: ${this.params.checkGlobResultNumber}`;
                    if (this.params.throwErrorIfNotExpectedGlobResultNumberFound) {
                        throw errorMessage;
                    } else {
                        ConsoleLogger.consoleWarning(`${errorMessage}`);
                    }
                }
            }

            if (sourcesFromGlob.length === 0) {
                let missingPathErrorText: string = `Could not run operation: There is no sourcesFromGlob to ${this.params.sourceRoots}`;
                if (!this.params.hideWarningIfSourceDoesNotExists) {
                    ConsoleLogger.consoleWarning(missingPathErrorText);
                }
            } else {
                ConsoleLogger.consoleDebug(`sourceFromGlobs: ${Utils.formattedJSONStringify(sourcesFromGlob)}`);
            }

            if (executeFuncionToRunOnSourcesFromGlobOneByOne) {
                sourcesFromGlob.forEach((sourceFromGlob: string): void => {
                    funcionToRun(sourceFromGlob);
                });
            } else {
                funcionToRun(sourcesFromGlob);
            }
        });
    }

    private setFullSourceGlobPatterns(): void {
        this.params.sourceRoots.forEach((sourceRoot: string): void => {
            if (this.params.globPattern) {
                this.sourceRoots.push(path.join(sourceRoot, this.params.globPattern));
            } else {
                this.sourceRoots.push(path.join(sourceRoot));
            }
        });
    }

    private setHashedFullSourceGlobPatterns(): void {
        this.sourceRoots.forEach((sourceRoot: string, index: number): void => {
            this.sourceRoots[index] = FileUtils.replaceHash(sourceRoot, this.compilerHookCallbackParameters.compilation);
        });
    }

    ///iterate through all the sourceRoots, if the sourceFile path is from the sourceroot, we determine the destination directory path, and ensure to be exists
    //returns with the destination file
    protected getDestinationFileFullPathAndEnsureDirectoryExists(sourceFileRelativePath: string, destinationDir: string): string {
        let destinationFileFullPath: string;
        this.params.sourceRoots.forEach((sourceRoot: string): void => {
            let sourceFileIsInTheSourceRoot: boolean = path.resolve(sourceFileRelativePath).startsWith(path.resolve(sourceRoot));
            if (sourceFileIsInTheSourceRoot) {
                destinationFileFullPath = path.join(destinationDir, path.relative(sourceRoot, sourceFileRelativePath));
                FileUtils.ensureFolderStructureExists(path.dirname(destinationFileFullPath));
                return;
            }
        });
        return destinationFileFullPath;
    }
}
