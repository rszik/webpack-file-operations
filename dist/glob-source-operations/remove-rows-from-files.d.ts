import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { IndexAndCount } from '../classes';
export interface IRemoveRowsFromFilesParameter extends IGlobSourceOperationParameter {
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string;
}
export declare class RemoveRowsFromFilesParameter extends GlobSourceOperationParameter implements IRemoveRowsFromFilesParameter {
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string;
}
export declare class RemoveRowsFromFiles extends GlobSourceOperation {
    constructor(userParams: IRemoveRowsFromFilesParameter);
    name: string;
    params: RemoveRowsFromFilesParameter;
    run(): void;
    private funcionToRun;
}
