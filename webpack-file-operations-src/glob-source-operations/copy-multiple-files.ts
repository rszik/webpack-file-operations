import * as fsExtra from 'fs-extra';
import * as path from 'path';

import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';
import { FileUtils } from '../classes';

export interface ICopyMultipleFilesParameter extends IGlobSourceOperationParameter {
    destinationDir: string;
    keepFolderStructure?: boolean;
}

export class CopyMultipleFilesParameter extends GlobSourceOperationParameter {
    //ICopyMultipleFilesParameter
    public destinationDir: string = null;
    public keepFolderStructure?: boolean = true;
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
        let destinationFileFullPath: string;
        if (this.params.keepFolderStructure) {
            destinationFileFullPath = this.getDestinationFileFullPathAndEnsureDirectoryExists(sourceFromGlob, this.params.destinationDir);
        } else {
            destinationFileFullPath = path.join(this.params.destinationDir, path.basename(sourceFromGlob));
        }
        if (FileUtils.isFile(sourceFromGlob)) {
            fsExtra.copyFileSync(sourceFromGlob, destinationFileFullPath);
        }
    }
}
