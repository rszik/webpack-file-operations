/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as fsExtra from 'fs-extra';
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';


export interface IDeleteSingleFileOrDirectoryParameter extends ISingleSourceOperationParameter {
    deletePath: string;
}

export class DeleteSingleFileOrDirectoryParameter extends SingleSourceOperationParameter implements IDeleteSingleFileOrDirectoryParameter {
    //IDeleteSingleFileOrDirectoryParameter
    public deletePath: string = null;
    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.deletePath;
    }
}

export class DeleteSingleFileOrDirectory extends SingleSourceOperation {

    constructor(userParams: IDeleteSingleFileOrDirectoryParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new DeleteSingleFileOrDirectoryParameter());
        super.setParams(this.params);
    }

    public name: string = 'DeleteSingleFileOrDirectory';

    public params: DeleteSingleFileOrDirectoryParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        fsExtra.removeSync(sourceFilePath);
    }
}
