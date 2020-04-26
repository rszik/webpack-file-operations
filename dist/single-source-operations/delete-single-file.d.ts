import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IDeleteSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
}
export declare class DeleteSingleFileParameter extends SingleSourceOperationParameter implements IDeleteSingleFileParameter {
    sourceFilePath: string;
    getSingleSource(): string;
}
export declare class DeleteSingleFile extends SingleSourceOperation {
    constructor(userParams: IDeleteSingleFileParameter);
    name: string;
    params: DeleteSingleFileParameter;
    run(): void;
    private funcionToRun;
}
