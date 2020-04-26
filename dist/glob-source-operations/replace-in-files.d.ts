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
