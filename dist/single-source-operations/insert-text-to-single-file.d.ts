/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IInsertTextToSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndex: number;
    text: string;
    encoding?: BufferEncoding;
}
export declare class InsertTextToSingleFileParameter extends SingleSourceOperationParameter implements IInsertTextToSingleFileParameter {
    sourceFilePath: string;
    rowIndex: number;
    text: string;
    encoding: BufferEncoding;
    getSingleSource(): string;
}
export declare class InsertTextToSingleFile extends SingleSourceOperation {
    constructor(userParams: IInsertTextToSingleFileParameter);
    name: string;
    params: InsertTextToSingleFileParameter;
    run(): void;
    private funcionToRun;
}
