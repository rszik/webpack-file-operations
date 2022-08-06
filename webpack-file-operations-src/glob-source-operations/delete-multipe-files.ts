import * as fsExtra from 'fs-extra';
import { GlobSourceOperation, GlobSourceOperationParameter, IGlobSourceOperationParameter } from './glob-source-operation';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';


export interface IDeleteMultipeFilesParameter extends IGlobSourceOperationParameter {

}

export class DeleteMultipeFilesParameter extends GlobSourceOperationParameter implements IDeleteMultipeFilesParameter {

}

export class DeleteMultipeFiles extends GlobSourceOperation {

    constructor(userParams: IDeleteMultipeFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new DeleteMultipeFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'DeleteMultipeFiles';

    public params: DeleteMultipeFilesParameter;

    public run(): void {
        super.runGlobSourceOperation(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFromGlob: string): void {
        fsExtra.removeSync(sourceFromGlob);
    }
}
