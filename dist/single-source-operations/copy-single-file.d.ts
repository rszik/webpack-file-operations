/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface ICopySingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
}
export declare class CopySingleFileParameter extends SingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
    getSingleSource(): string;
}
export declare class CopySingleFile extends SingleSourceOperation {
    constructor(userParams: ICopySingleFileParameter);
    name: string;
    params: CopySingleFileParameter;
    run(): void;
    private funcionToRun;
}
