import * as fsExtra from 'fs-extra';

import { SingleSourceOperationParameter, SingleSourceOperation, ISingleSourceOperationParameter } from './single-source-operation';
import { Utils } from 'webpack-hook-attacher-plugin';

export interface IMoveSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    destinationFilePath: string;
    overwrite?: boolean;
}

export class MoveSingleFileParameter extends SingleSourceOperationParameter implements IMoveSingleFileParameter {
    //IMoveSingleFileParameter
    public sourceFilePath: string = null;
    public destinationFilePath: string = null;
    public overwrite?: boolean = true;
    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class MoveSingleFile extends SingleSourceOperation {

    constructor(userParams: IMoveSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new MoveSingleFileParameter());
        super.setParams(this.params);
        this.moveOptions = { overwrite: this.params.overwrite };
    }

    public name: string = 'MoveSingleFile';

    public params: MoveSingleFileParameter;

    private moveOptions: fsExtra.MoveOptions;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        this.ensureDestinationFileDirectoryExists(this.params.destinationFilePath);
        fsExtra.moveSync(sourceFilePath, this.params.destinationFilePath, this.moveOptions);
    }
}

