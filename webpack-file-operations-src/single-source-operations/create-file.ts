/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as fsExtra from 'fs-extra';

import { Utils } from '@wecdev/webpack-hook-attacher-plugin';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

export interface ICreateFileParameter extends ISingleSourceOperationParameter {
    filePathToCreate: string;
}

export class CreateFileParameter extends SingleSourceOperationParameter {
    //ICreateFileParameter
    public filePathToCreate: string = null;

    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.filePathToCreate;
    }
}

export class CreateFile extends SingleSourceOperation {


    constructor(userParams: ICreateFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new CreateFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'CreateFile';

    public params: CreateFileParameter;

    public run(): void {
        super.runSingleFileOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        this.ensureDestinationFileDirectoryExists(sourceFilePath);
        fsExtra.createFileSync(sourceFilePath);
    }



}




