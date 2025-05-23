/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher';
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
export declare class GlobSourceOperationParameter extends OperationParameter {
    replaceHash?: boolean;
    hideWarningIfSourceDoesNotExists?: boolean;
    checkGlobResultNumber?: number;
    throwErrorIfNotExpectedGlobResultNumberFound?: boolean;
    sourceRoots: string[];
    globPattern?: string;
    globOptions?: GlobOptionsWithFileTypesFalse;
}
export declare abstract class GlobSourceOperation extends Operation {
    params: GlobSourceOperationParameter;
    private sourceRoots;
    protected setParams(params: GlobSourceOperationParameter): void;
    protected runGlobSourceOperation(funcionToRun: Function, executeFuncionToRunOnSourcesFromGlobOneByOne?: boolean): void;
    private setFullSourceGlobPatterns;
    private setHashedFullSourceGlobPatterns;
    protected getDestinationFileFullPathAndEnsureDirectoryExists(sourceFileRelativePath: string, destinationDir: string): string;
}
