/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { IndexAndCount, FileUtils } from '../classes';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

import { Utils } from '@wecdev/webpack-hook-attacher-plugin';


export interface IRemoveRowsFromSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: BufferEncoding;
}

export class RemoveRowsFromSingleFileParameter extends SingleSourceOperationParameter implements IRemoveRowsFromSingleFileParameter {
    //IRemoveRowsFromSingleFileParameter
    public sourceFilePath: string = null;
    public rowIndexAndRemoveCount: IndexAndCount[] = null;
    public encoding?: BufferEncoding = 'utf-8';

    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class RemoveRowsFromSingleFile extends SingleSourceOperation {

    constructor(userParams: IRemoveRowsFromSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new RemoveRowsFromSingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'RemoveRowsFromSingleFile';

    public params: RemoveRowsFromSingleFileParameter;


    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.removeRowsFromSingleFile(sourceFilePath, this.params.encoding, this.params.rowIndexAndRemoveCount);
    }


}
