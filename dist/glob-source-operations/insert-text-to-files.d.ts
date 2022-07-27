import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IInsertTextToFilesParameter extends IGlobSourceOperationParameter {
    rowIndex: number;
    text: string;
    encoding?: string;
}
export declare class InsertTextToFilesParameter extends GlobSourceOperationParameter implements IInsertTextToFilesParameter {
    rowIndex: number;
    text: string;
    encoding: string;
}
export declare class InsertTextToFiles extends GlobSourceOperation {
    constructor(userParams: IInsertTextToFilesParameter);
    name: string;
    params: InsertTextToFilesParameter;
    run(): void;
    private funcionToRun;
}
