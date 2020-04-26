import * as fsExtra from 'fs-extra';

import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from 'webpack-hook-attacher-plugin';
import { FileUtils } from '../classes';

export interface ICopyMultipleFilesParameter extends IGlobSourceOperationParameter {
    destinationDir: string;
}

export class CopyMultipleFilesParameter extends GlobSourceOperationParameter {
    //ICopyMultipleFilesParameter
    public destinationDir: string = null;
}

export class CopyMultipleFiles extends GlobSourceOperation {

    constructor(userParams: ICopyMultipleFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new CopyMultipleFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'CopyMultipleFiles';

    public params: CopyMultipleFilesParameter;

    public run(): void {
        FileUtils.ensureFolderStructureExists(this.params.destinationDir);
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFromGlob: string): void {
        let destinationFileFullPath: string = this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        if (FileUtils.isFile(sourceFromGlob)) {
            fsExtra.copyFileSync(sourceFromGlob, destinationFileFullPath);
        }
    }
}
