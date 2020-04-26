import * as fsExtra from 'fs-extra';
import { Utils } from 'webpack-hook-attacher-plugin';

import { GlobSourceOperationParameter, GlobSourceOperation, IGlobSourceOperationParameter } from './glob-source-operation';
import { FileUtils } from '../classes';

export interface IMoveMultipleFilesParameter extends IGlobSourceOperationParameter {
    overwrite?: boolean;
    destinationDir?: string;
}

export class MoveMultipleFilesParameter extends GlobSourceOperationParameter implements IMoveMultipleFilesParameter {
    //IMoveMultipleFilesParameter
    public overwrite: boolean = true;
    public destinationDir: string = null;
}

export class MoveMultipleFiles extends GlobSourceOperation {

    constructor(userParams: IMoveMultipleFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new MoveMultipleFilesParameter());
        super.setParams(this.params);
        this.moveOptions = { overwrite: this.params.overwrite };
    }

    public name: string = 'MoveSingleFile';

    public params: MoveMultipleFilesParameter;

    private moveOptions: fsExtra.MoveOptions;

    public run(): void {
        FileUtils.ensureFolderStructureExists(this.params.destinationDir);
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFromGlob: string): void {
        this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        if (FileUtils.isFile(sourceFromGlob)) {
            fsExtra.moveSync(sourceFromGlob, this.params.destinationDir, this.moveOptions);
        }
    }




}

