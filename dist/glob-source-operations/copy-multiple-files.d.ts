import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
export interface ICopyMultipleFilesParameter extends IGlobSourceOperationParameter {
    destinationDir: string;
}
export declare class CopyMultipleFilesParameter extends GlobSourceOperationParameter {
    destinationDir: string;
}
export declare class CopyMultipleFiles extends GlobSourceOperation {
    constructor(userParams: ICopyMultipleFilesParameter);
    name: string;
    params: CopyMultipleFilesParameter;
    run(): void;
    private funcionToRun;
}
