/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as path from 'path';
import * as zipper from 'zip-local';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { Utils, ConsoleLogger } from '@wecdev/webpack-hook-attacher-plugin';
import { FileUtils } from '../classes';

export interface IZipParameter extends ISingleSourceOperationParameter {
    destinationFile: string;
    sourceFolderToZip: string;
}

export class ZipParameter extends SingleSourceOperationParameter implements IZipParameter {
    public destinationFile: string = '';
    public sourceFolderToZip: string = '';

    public getSingleSource(): string {
        return this.sourceFolderToZip;
    }
}

export class Zip extends SingleSourceOperation {

    constructor(userParams: IZipParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new ZipParameter());
        super.setParams(this.params);
    }

    public name: string = 'Zip';

    public params: ZipParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFolderToZip: string): void {
        FileUtils.ensureFolderStructureExists(path.dirname(this.params.destinationFile));
        ConsoleLogger.consoleDebug(`Zipping starting.`);
        zipper.sync.zip(sourceFolderToZip).compress().save(this.params.destinationFile);
        ConsoleLogger.consoleDebug('Zipping finished.');
    }
}
