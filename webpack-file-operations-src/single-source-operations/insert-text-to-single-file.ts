
import { Utils } from 'webpack-hook-attacher-plugin';
import { FileUtils } from '../classes';
import { SingleSourceOperation, SingleSourceOperationParameter, ISingleSourceOperationParameter } from './single-source-operation';

export interface IInsertTextToSingleFileParameter extends ISingleSourceOperationParameter {
    sourceFilePath: string;
    rowIndex: number;
    text: string;
    encoding?: string;
}

export class InsertTextToSingleFileParameter extends SingleSourceOperationParameter implements IInsertTextToSingleFileParameter {
    //IInsertTextToFilesParameter
    public sourceFilePath: string = null;
    public rowIndex: number = 0;
    public text: string = null;
    public encoding: string = 'utf-8';

     //SingleSourceOperationParameter
     public getSingleSource(): string {
        return this.sourceFilePath;
    }
}

export class InsertTextToSingleFile extends SingleSourceOperation {

    constructor(userParams: IInsertTextToSingleFileParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new InsertTextToSingleFileParameter());
        super.setParams(this.params);
    }

    public name: string = 'InsertTextToSingleFile';

    public params: InsertTextToSingleFileParameter;

    public run(): void {
        super.runSingleFileOperationIfExists(this.funcionToRun.bind(this));
    }

    private funcionToRun(singleSource: string): void {
        FileUtils.insertTextToSingleFile(singleSource, this.params.encoding, this.params.text, this.params.rowIndex);
    }




}
