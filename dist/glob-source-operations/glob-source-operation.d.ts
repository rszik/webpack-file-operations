import * as glob from 'glob';
import { Operation, OperationParameter, IOperationParameter } from 'webpack-hook-attacher-plugin';
export interface IGlobSourceOperationParameter extends IOperationParameter {
    replaceHash?: boolean;
    hideWarningIfSourceDoesNotExists?: boolean;
    checkGlobResultNumber?: number;
    throwErrorIfNotExpectedGlobResultNumberFound?: boolean;
    sourceRoots: string[];
    globPattern?: string;
    globOptions?: glob.IOptions;
}
export declare class GlobSourceOperationParameter extends OperationParameter {
    replaceHash?: boolean;
    hideWarningIfSourceDoesNotExists?: boolean;
    checkGlobResultNumber?: number;
    throwErrorIfNotExpectedGlobResultNumberFound?: boolean;
    sourceRoots: string[];
    globPattern?: string;
    globOptions?: glob.IOptions;
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
