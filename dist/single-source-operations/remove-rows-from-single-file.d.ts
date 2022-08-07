/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { IndexAndCount } from '../classes';
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IRemoveRowsFromSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string;
}
export declare class RemoveRowsFromSingleFileParameter extends SingleSourceOperationParameter implements IRemoveRowsFromSingleFileParameter {
    sourceFilePath: string;
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string;
    getSingleSource(): string;
}
export declare class RemoveRowsFromSingleFile extends SingleSourceOperation {
    constructor(userParams: IRemoveRowsFromSingleFileParameter);
    name: string;
    params: RemoveRowsFromSingleFileParameter;
    run(): void;
    private funcionToRun;
}
