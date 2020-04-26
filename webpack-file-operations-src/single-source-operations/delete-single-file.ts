import * as fsExtra from 'fs-extra';
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';
import { Utils } from 'webpack-hook-attacher-plugin';


export interface IDeleteSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
}

export class DeleteSingleFileParameter extends SingleSourceOperationParameter implements IDeleteSingleFileParameter {
    //IDeleteSingleFileParameter
    public sourceFilePath: string = null;
    //SingleSourceOperationParameter
    public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class DeleteSingleFile extends SingleSourceOperation {

    constructor(userParams: IDeleteSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new DeleteSingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'DeleteSingleFile';

    public params: DeleteSingleFileParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        fsExtra.removeSync(sourceFilePath);
    }
}
