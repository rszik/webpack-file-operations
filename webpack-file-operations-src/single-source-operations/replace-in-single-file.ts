/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { Utils } from '@wecdev/webpack-hook-attacher';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

import { ReplaceRule, FileUtils } from '../classes';

export interface IReplaceInSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    encoding?: BufferEncoding;
    replaceRules?: ReplaceRule[];
}

export class ReplaceInSingleFileParameter extends SingleSourceOperationParameter implements IReplaceInSingleFileParameter {
    //IReplaceInSingleFileParameter
    public sourceFilePath: string = null;
    public replaceRules: ReplaceRule[] = null;
    public encoding?: BufferEncoding = 'utf-8';

    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class ReplaceInSingleFile extends SingleSourceOperation {

    constructor(userParams: IReplaceInSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new ReplaceInSingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'ReplaceInSingleFile';

    public params: ReplaceInSingleFileParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.replaceInSingleFile(sourceFilePath, this.params.encoding, this.params.replaceRules);
    }
}
