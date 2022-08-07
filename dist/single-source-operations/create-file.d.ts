/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface ICreateFileParameter extends ISingleSourceOperationParameter {
    filePathToCreate: string;
}
export declare class CreateFileParameter extends SingleSourceOperationParameter {
    filePathToCreate: string;
    getSingleSource(): string;
}
export declare class CreateFile extends SingleSourceOperation {
    constructor(userParams: ICreateFileParameter);
    name: string;
    params: CreateFileParameter;
    run(): void;
    private funcionToRun;
}
