/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
export interface IDeleteMultipeFilesParameter extends IGlobSourceOperationParameter {
}
export declare class DeleteMultipeFilesParameter extends GlobSourceOperationParameter implements IDeleteMultipeFilesParameter {
}
export declare class DeleteMultipeFiles extends GlobSourceOperation {
    constructor(userParams: IDeleteMultipeFilesParameter);
    name: string;
    params: DeleteMultipeFilesParameter;
    run(): void;
    private funcionToRun;
}
