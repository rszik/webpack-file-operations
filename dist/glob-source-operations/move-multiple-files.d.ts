/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
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
