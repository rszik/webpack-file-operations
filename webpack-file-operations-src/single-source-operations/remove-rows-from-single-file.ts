import { IndexAndCount, FileUtils } from '../classes';

import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

import { Utils } from 'webpack-hook-attacher-plugin';


export interface IRemoveRowsFromSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndexAndRemoveCount: IndexAndCount[];
    encoding?: string ;
}

export class RemoveRowsFromSingleFileParameter extends SingleSourceOperationParameter implements IRemoveRowsFromSingleFileParameter {
    //IRemoveRowsFromSingleFileParameter
    public sourceFilePath: string = null;
    public rowIndexAndRemoveCount: IndexAndCount[] = null;
    public encoding?: string = 'utf-8';

     //SingleSourceOperationParameter
     public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class RemoveRowsFromSingleFile extends SingleSourceOperation {

    constructor(userParams: IRemoveRowsFromSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new RemoveRowsFromSingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'RemoveRowsFromSingleFile';

    public params: RemoveRowsFromSingleFileParameter;


    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(sourceFilePath: string): void {
        FileUtils.removeRowsFromSingleFile(sourceFilePath, this.params.encoding, this.params.rowIndexAndRemoveCount);
    }


}
