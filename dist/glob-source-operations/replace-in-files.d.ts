/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { ReplaceRule } from '../classes';
export interface IReplaceInFilesParameter extends IGlobSourceOperationParameter {
    encoding?: string;
    replaceRules?: ReplaceRule[];
}
export declare class ReplaceInFilesParameter extends GlobSourceOperationParameter implements IReplaceInFilesParameter {
    replaceRules: ReplaceRule[];
    encoding?: string;
}
export declare class ReplaceInFiles extends GlobSourceOperation {
    constructor(userParams: IReplaceInFilesParameter);
    name: string;
    params: ReplaceInFilesParameter;
    run(): void;
    private funcionToRun;
}
