import { GlobSourceOperationParameter, GlobSourceOperation, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IMergeJSONFilesParameter extends IGlobSourceOperationParameter {
    encoding?: string;
    destinationFile: string;
}
export declare class MergeJSONFilesParameter extends GlobSourceOperationParameter {
    encoding?: string;
    destinationFile: string;
    replacer?: (this: any, key: string, value: any) => any;
    space?: string | number;
}
export declare class MergeJSONFiles extends GlobSourceOperation {
    constructor(userParams: IMergeJSONFilesParameter);
    name: string;
    params: MergeJSONFilesParameter;
    run(): void;
    private funcionToRun;
    private deepMerge;
}
