import { Operation, OperationParameter, IOperationParameter } from 'webpack-hook-attacher-plugin';
export interface ISingleSourceOperationParameter extends IOperationParameter {
    replaceHash?: boolean;
    throwErrorIfSourceDoesNotExists?: boolean;
}
export declare abstract class SingleSourceOperationParameter extends OperationParameter implements ISingleSourceOperationParameter {
    replaceHash?: boolean;
    throwErrorIfSourceDoesNotExists?: boolean;
    abstract getSingleSource(): string;
}
export declare abstract class SingleSourceOperation extends Operation {
    params: SingleSourceOperationParameter;
    protected setParams(params: SingleSourceOperationParameter): void;
    protected runSingleFileOperationIfExists(func: Function): void;
    protected runSingleFileOperation(func: Function): void;
    private checkCantBeGlobPattern;
    protected ensureDestinationFileDirectoryExists(destinationFilePath: string): void;
}
