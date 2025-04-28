/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { FileUtils } from '../classes';

import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';


export interface IInsertTextToFilesParameter extends IGlobSourceOperationParameter {
    rowIndex: number;
    text: string;
    encoding?: BufferEncoding;
}

export class InsertTextToFilesParameter extends GlobSourceOperationParameter implements IInsertTextToFilesParameter {
    //IInsertTextToFilesParameter
    public rowIndex: number = 0;
    public text: string = null;
    public encoding: BufferEncoding = 'utf-8';
}

export class InsertTextToFiles extends GlobSourceOperation {

    constructor(userParams: IInsertTextToFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new InsertTextToFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'InsertTextToFiles';

    public params: InsertTextToFilesParameter;

    public run(): void {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.insertTextToSingleFile(sourceFilePath, this.params.encoding, this.params.text, this.params.rowIndex);
    }




}
