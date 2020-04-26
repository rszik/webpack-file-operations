import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface ICopySingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
}
export declare class CopySingleFileParameter extends SingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
    getSingleSource(): string;
}
export declare class CopySingleFile extends SingleSourceOperation {
    constructor(userParams: ICopySingleFileParameter);
    name: string;
    params: CopySingleFileParameter;
    run(): void;
    private funcionToRun;
}
