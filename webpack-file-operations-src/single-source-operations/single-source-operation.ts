import * as glob from 'glob';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import { Operation, OperationParameter, IOperationParameter, ConsoleLogger } from '@wecdev/webpack-hook-attacher-plugin';

import { FileUtils } from '../classes';


export interface ISingleSourceOperationParameter extends IOperationParameter {
    replaceHash?: boolean;
    throwErrorIfSourceDoesNotExists?: boolean;
}

export abstract class SingleSourceOperationParameter extends OperationParameter implements ISingleSourceOperationParameter {
    public replaceHash?: boolean = false;
    public throwErrorIfSourceDoesNotExists?: boolean = true;
    public abstract getSingleSource(): string;
}

export abstract class SingleSourceOperation extends Operation {

    public params: SingleSourceOperationParameter;

    protected setParams(params: SingleSourceOperationParameter): void {
        super.setParams(params);
        this.params = params;
    }

    protected runSingleFileOperationIfExists(func: Function): void {
        super.runWrapper(this, (): void => {
            let singleSource: string = this.params.getSingleSource();
            this.checkCantBeGlobPattern(singleSource);

            if (this.params.replaceHash) {
                singleSource = FileUtils.replaceHash(singleSource, this.compilerHookCallbackParameters.compilation);
            }

            let sourceExists: boolean = fsExtra.existsSync(singleSource);
            if (!sourceExists) {
                if (this.params.throwErrorIfSourceDoesNotExists) {
                    throw new Error(`Source doesn't exists`);
                }
            }
            if (sourceExists) {
                func(singleSource);
            }
        });
    }

    protected runSingleFileOperation(func: Function): void {
        super.runWrapper(this, (): void => {
            let singleSource: string = this.params.getSingleSource();
            this.checkCantBeGlobPattern(singleSource);

            if (this.params.replaceHash) {
                singleSource = FileUtils.replaceHash(singleSource, this.compilerHookCallbackParameters.compilation);
            }

            func(singleSource);
        });
    }

    private checkCantBeGlobPattern(singleSource: string): void {
        if (glob.hasMagic(singleSource)) {
            let errorText: string = `${this.name} - Source '${this.params.getSingleSource()}' can't be glob pattern`;
            ConsoleLogger.consoleError(errorText);
            throw errorText;
        }
    }

    protected ensureDestinationFileDirectoryExists(destinationFilePath: string): void {
        FileUtils.ensureFolderStructureExists(path.dirname(destinationFilePath));
    }
}
