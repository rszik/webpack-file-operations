/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher';
import { ReplaceRule, FileUtils } from '../classes';


export interface IReplaceInFilesParameter extends IGlobSourceOperationParameter {
    encoding?: BufferEncoding;
    replaceRules?: ReplaceRule[];
}

export class ReplaceInFilesParameter extends GlobSourceOperationParameter implements IReplaceInFilesParameter {
    //IReplaceInFilesParameter
    public replaceRules: ReplaceRule[] = null;
    public encoding?: BufferEncoding = 'utf-8';
}

export class ReplaceInFiles extends GlobSourceOperation {

    constructor(userParams: IReplaceInFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new ReplaceInFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'ReplaceInFiles';

    public params: ReplaceInFilesParameter;


    public run(): void {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.replaceInSingleFile(sourceFilePath, this.params.encoding, this.params.replaceRules);
    }


}
