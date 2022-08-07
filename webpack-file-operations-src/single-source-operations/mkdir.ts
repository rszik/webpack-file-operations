/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as fsExtra from 'fs-extra';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';


export interface IMkDirParameter extends ISingleSourceOperationParameter {
    dirPathToMake: string;
    overwrite?: boolean;
}

export class MkDirParameter extends SingleSourceOperationParameter implements ISingleSourceOperationParameter {
    //IMkDirParameter
    public dirPathToMake: string = null;
    public overwrite?: boolean = true;
    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.dirPathToMake;
    }
}

export class MkDir extends SingleSourceOperation {

    constructor(userParams: IMkDirParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new MkDirParameter());
        super.setParams(this.params);
        //it does not matter whether source exists or not
        this.params.throwErrorIfSourceDoesNotExists = false;
    }

    public name: string = 'MkDir';

    public params: MkDirParameter;

    public run(): void {
        super.runSingleFileOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(dirPathToMake: string): void {
        fsExtra.ensureDirSync(dirPathToMake);
    }
}

