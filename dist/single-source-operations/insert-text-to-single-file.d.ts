import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IInsertTextToSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndex: number;
    text: string;
    encoding?: string;
}
export declare class InsertTextToSingleFileParameter extends SingleSourceOperationParameter implements IInsertTextToSingleFileParameter {
    sourceFilePath: string;
    rowIndex: number;
    text: string;
    encoding: string;
    getSingleSource(): string;
}
export declare class InsertTextToSingleFile extends SingleSourceOperation {
    constructor(userParams: IInsertTextToSingleFileParameter);
    name: string;
    params: InsertTextToSingleFileParameter;
    run(): void;
    private funcionToRun;
}
