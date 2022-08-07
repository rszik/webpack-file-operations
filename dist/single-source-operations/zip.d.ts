/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
export interface IZipParameter extends ISingleSourceOperationParameter {
    destinationFile: string;
    sourceFolderToZip: string;
}
export declare class ZipParameter extends SingleSourceOperationParameter implements IZipParameter {
    destinationFile: string;
    sourceFolderToZip: string;
    getSingleSource(): string;
}
export declare class Zip extends SingleSourceOperation {
    constructor(userParams: IZipParameter);
    name: string;
    params: ZipParameter;
    run(): void;
    private funcionToRun;
}
