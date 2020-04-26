import * as fsExtra from 'fs-extra';

import { Utils } from 'webpack-hook-attacher-plugin';
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

export interface ICopySingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
}

export class CopySingleFileParameter extends SingleSourceOperationParameter {
    //ICopySingleFileParameter
    public sourceFilePath: string = null;
    public destinationFilePath: string = null;
    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class CopySingleFile extends SingleSourceOperation {

    constructor(userParams: ICopySingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new CopySingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'CopySingleFile';

    public params: CopySingleFileParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        this.ensureDestinationFileDirectoryExists(this.params.destinationFilePath);
        fsExtra.copyFileSync(sourceFilePath, this.params.destinationFilePath);
    }

}




