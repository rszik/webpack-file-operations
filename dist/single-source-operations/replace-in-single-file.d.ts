/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { ReplaceRule } from '../classes';
export interface IReplaceInSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    encoding?: BufferEncoding;
    replaceRules?: ReplaceRule[];
}
export declare class ReplaceInSingleFileParameter extends SingleSourceOperationParameter implements IReplaceInSingleFileParameter {
    sourceFilePath: string;
    replaceRules: ReplaceRule[];
    encoding?: BufferEncoding;
    getSingleSource(): string;
}
export declare class ReplaceInSingleFile extends SingleSourceOperation {
    constructor(userParams: IReplaceInSingleFileParameter);
    name: string;
    params: ReplaceInSingleFileParameter;
    run(): void;
    private funcionToRun;
}
