/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import * as fsExtra from 'fs-extra';
import * as path from 'path';
import { Utils } from '@wecdev/webpack-hook-attacher-plugin';

import { GlobSourceOperationParameter, GlobSourceOperation, IGlobSourceOperationParameter } from './glob-source-operation';
import { FileUtils } from '../classes';


export interface IMergeJSONFilesParameter extends IGlobSourceOperationParameter {
    encoding?: BufferEncoding;
    destinationFile: string;
}

export class MergeJSONFilesParameter extends GlobSourceOperationParameter {
    //IMergeJSONFilesParameter
    public encoding?: BufferEncoding = 'utf-8';
    public destinationFile: string = null;

    public replacer?: (this: any, key: string, value: any) => any = null;
    public space?: string | number = 4;

}

export class MergeJSONFiles extends GlobSourceOperation {

    constructor(userParams: IMergeJSONFilesParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new MergeJSONFilesParameter());
        super.setParams(this.params);
    }

    public name: string = 'MergeJSONFiles';

    public params: MergeJSONFilesParameter;

    public run(): void {
        super.runGlobSourceOperation(this.funcionToRun.bind(this), false);
    }

    private funcionToRun(sourcesFromGlob: string[]): void {
        FileUtils.ensureFolderStructureExists(path.dirname(this.params.destinationFile));

        let mergedObject: any = {};

        sourcesFromGlob.forEach((sourceFromGlob: string): void => {
            const src: string = path.resolve(sourceFromGlob);
            let fileContent: string = fsExtra.readFileSync(src, this.params.encoding);
            let objectFromRes: any = JSON.parse(fileContent);
            this.deepMerge(mergedObject, objectFromRes);
        });

        fsExtra.writeFileSync(this.params.destinationFile, Utils.formattedJSONStringify(mergedObject), { encoding: this.params.encoding });
    }

    private deepMerge(target: any, source: any): any {
        const isObject: Function = (obj: any): boolean => obj && typeof obj === 'object';

        if (!isObject(target) || !isObject(source)) {
            return source;
        }

        Object.keys(source).forEach((key: string): void => {
            const targetValue: any = target[key];
            const sourceValue: any = source[key];

            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            } else if (isObject(targetValue) && isObject(sourceValue)) {
                target[key] = this.deepMerge(Object.assign({}, targetValue), sourceValue);
            } else {
                target[key] = sourceValue;
            }
        });

        return target;
    }
}
