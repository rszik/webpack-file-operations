/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { GlobSourceOperationParameter, GlobSourceOperation, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IMergeJSONFilesParameter extends IGlobSourceOperationParameter {
    encoding?: BufferEncoding;
    destinationFile: string;
}
export declare class MergeJSONFilesParameter extends GlobSourceOperationParameter {
    encoding?: BufferEncoding;
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
