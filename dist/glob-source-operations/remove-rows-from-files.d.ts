/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { IndexAndCount } from '../classes';
export interface IRemoveRowsFromFilesParameter extends IGlobSourceOperationParameter {
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: BufferEncoding;
}
export declare class RemoveRowsFromFilesParameter extends GlobSourceOperationParameter implements IRemoveRowsFromFilesParameter {
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: BufferEncoding;
}
export declare class RemoveRowsFromFiles extends GlobSourceOperation {
    constructor(userParams: IRemoveRowsFromFilesParameter);
    name: string;
    params: RemoveRowsFromFilesParameter;
    run(): void;
    private funcionToRun;
}
