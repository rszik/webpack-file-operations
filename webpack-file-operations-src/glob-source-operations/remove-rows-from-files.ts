/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';
import { IndexAndCount, FileUtils } from '../classes';

export interface IRemoveRowsFromFilesParameter extends IGlobSourceOperationParameter {
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string;
}

export class RemoveRowsFromFilesParameter extends GlobSourceOperationParameter implements IRemoveRowsFromFilesParameter {
    //IRemoveRowsFromFilesParameter
    public rowIndexAndRemoveCount: IndexAndCount[] = null;
    public encoding?: string = 'utf-8';
}

export class RemoveRowsFromFiles extends GlobSourceOperation {

    constructor(userParams: IRemoveRowsFromFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new RemoveRowsFromFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'RemoveRowsFromFiles';

    public params: RemoveRowsFromFilesParameter;

    public run(): void {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.removeRowsFromSingleFile(sourceFilePath, this.params.encoding, this.params.rowIndexAndRemoveCount);
    }
}
