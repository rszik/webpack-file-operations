import { GlobSourceOperationParameter, GlobSourceOperation, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IMoveMultipleFilesParameter extends IGlobSourceOperationParameter {
    overwrite?: boolean;
    destinationDir?: string;
}
export declare class MoveMultipleFilesParameter extends GlobSourceOperationParameter implements IMoveMultipleFilesParameter {
    overwrite: boolean;
    destinationDir: string;
}
export declare class MoveMultipleFiles extends GlobSourceOperation {
    constructor(userParams: IMoveMultipleFilesParameter);
    name: string;
    params: MoveMultipleFilesParameter;
    private moveOptions;
    run(): void;
    private funcionToRun;
}
