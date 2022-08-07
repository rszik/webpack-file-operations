/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperationParameter, SingleSourceOperation, ISingleSourceOperationParameter } from './single-source-operation';
export interface IMoveSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
    overwrite?: boolean;
}
export declare class MoveSingleFileParameter extends SingleSourceOperationParameter implements IMoveSingleFileParameter {
    sourceFilePath: string;
    destinationFilePath: string;
    overwrite?: boolean;
    getSingleSource(): string;
}
export declare class MoveSingleFile extends SingleSourceOperation {
    constructor(userParams: IMoveSingleFileParameter);
    name: string;
    params: MoveSingleFileParameter;
    private moveOptions;
    run(): void;
    private funcionToRun;
}
