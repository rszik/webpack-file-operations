import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IDeleteSingleFileOrDirectoryParameter extends ISingleSourceOperationParameter {
    deletePath: string;
}
export declare class DeleteSingleFileOrDirectoryParameter extends SingleSourceOperationParameter implements IDeleteSingleFileOrDirectoryParameter {
    deletePath: string;
    getSingleSource(): string;
}
export declare class DeleteSingleFileOrDirectory extends SingleSourceOperation {
    constructor(userParams: IDeleteSingleFileOrDirectoryParameter);
    name: string;
    params: DeleteSingleFileOrDirectoryParameter;
    run(): void;
    private funcionToRun;
}
