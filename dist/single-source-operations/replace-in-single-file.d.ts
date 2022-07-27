import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { ReplaceRule } from '../classes';
export interface IReplaceInSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    encoding?: string;
    replaceRules?: ReplaceRule[];
}
export declare class ReplaceInSingleFileParameter extends SingleSourceOperationParameter implements IReplaceInSingleFileParameter {
    sourceFilePath: string;
    replaceRules: ReplaceRule[];
    encoding?: string;
    getSingleSource(): string;
}
export declare class ReplaceInSingleFile extends SingleSourceOperation {
    constructor(userParams: IReplaceInSingleFileParameter);
    name: string;
    params: ReplaceInSingleFileParameter;
    run(): void;
    private funcionToRun;
}
