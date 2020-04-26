import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IMkDirParameter extends ISingleSourceOperationParameter {
    dirPathToMake: string;
    overwrite?: boolean;
}
export declare class MkDirParameter extends SingleSourceOperationParameter implements ISingleSourceOperationParameter {
    dirPathToMake: string;
    overwrite?: boolean;
    getSingleSource(): string;
}
export declare class MkDir extends SingleSourceOperation {
    constructor(userParams: IMkDirParameter);
    name: string;
    params: MkDirParameter;
    run(): void;
    private funcionToRun;
}
