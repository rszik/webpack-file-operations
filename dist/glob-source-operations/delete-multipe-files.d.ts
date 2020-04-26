import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IDeleteMultipeFilesParameter extends IGlobSourceOperationParameter {
}
export declare class DeleteMultipeFilesParameter extends GlobSourceOperationParameter implements IDeleteMultipeFilesParameter {
}
export declare class DeleteMultipeFiles extends GlobSourceOperation {
    constructor(userParams: IDeleteMultipeFilesParameter);
    name: string;
    params: DeleteMultipeFilesParameter;
    run(): void;
    private funcionToRun;
}
