/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
export interface ICopyMultipleFilesParameter extends IGlobSourceOperationParameter {
    destinationDir: string;
    keepFolderStructure?: boolean;
}
export declare class CopyMultipleFilesParameter extends GlobSourceOperationParameter {
    destinationDir: string;
    keepFolderStructure?: boolean;
}
export declare class CopyMultipleFiles extends GlobSourceOperation {
    constructor(userParams: ICopyMultipleFilesParameter);
    name: string;
    params: CopyMultipleFilesParameter;
    run(): void;
    private funcionToRun;
}
