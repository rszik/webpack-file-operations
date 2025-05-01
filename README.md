# webpack-file-operations
File and directory operation collection for webpack build. You can attach any of these operations (delete/create/modify files and directories, merge json, etc...) to any webpack hook before, after and in the middle of the builds with [webpack-hook-attacher](https://www.npmjs.com/package/@wecdev/webpack-hook-attacher) 

## Install
`npm install @wecdev/webpack-file-operations --save-dev `

## I know I can do better :)
If you have found bug or need an additional operation don't hesitate to contact me.

## Copyright & Support
Copyright (c) 2022, Roland Szikora. 
You can support this package at https://www.patreon.com/rolandszik 

## Licensing
See LICENSE.txt

## Use Operations 
You can run a file operation:

- onBuildStart (compilation hook)
- onAfterPlugins (afterPlugins hook)
- onCompile (watchRun hook)
- onBuildEnd (afterEmit hook)
- onBuildExit (done hook)

and more than 100 entry point:
- Compiler Hooks
- Compilation Hooks
- ContextModuleFactory Hooks 
- JavascriptParser Hooks
- NormalModuleFactory Hooks

in webpack or webpack-dev-server 

such as 
- create file/directory
- delete files/directories
- move files/directories
- modify file content (delete/add rows, replace in files)
- merge json files
- zip directories

#### Usage
You can use in typescript and javascript as well. The example is in typescript

Webpack.config.js:

Simple example: 
```ts

let options: Options = new Options();
options.onBuildStart.addOperations(    
    new DeleteMultipeFiles({        
        sourceRoots: ['./AngularDeploymentRoot']
    }),
    new MkDir({        
        dirPathToMake: ['./AngularDeploymentRoot']
    }),
);   

options.onBuildEnd.addOperations(    
    new CopySingleFile({        
        sourceFilePath: './AngularSourceRoot/index.html',
        destinationFilePath: './AngularDeploymentRoot/index.html',
    }),
); 

...
//somewhere in the webpack config
...
 plugins: [
    ...
    new WebpackHookAttacherPlugin(options);
    ...
]
...

```

```ts
import {
    WebpackHookAttacherPlugin,
    Options    
} from '@wecdev/webpack-hook-attacher';

public static getAppModuleWebpackHookAttacherPlugin(): WebpackHookAttacherPlugin {

    let options: Options = new Options();
    options.silent = false;

    //attach to onBuildStart hooks
    options.onBuildStart.addOperations(
    new DeleteMultipeFiles({
        additionalName: 'AngularDeploymentRoot',
        sourceRoots: ['./AngularDeploymentRoot']
    }),
    new MkDir({
        additionalName: 'AngularDeploymentRoot',
        dirPathToMake: ['./AngularDeploymentRoot']
    }),
    new RunProcess({
        additionalName: `start-webpack-devserver-create-background-script`,
        commands: [
        {
            processCreationType: ProcessCreationType.spawn,
            execute: 'npm.cmd',
            args: ['run', 'start-webpack-devserver-create-background-script'],
            options: {
            detached: true
            }
        }                       
        ]
    })
    )

    //attach to onBuildStart hook
    options.onBuildEnd.addOperations(
        new CopySingleFile({
            additionalName: 'index.html',
            sourceFilePath: './AngularSourceRoot/index.html',
            destinationFilePath: './AngularDeploymentRoot/index.html',
        }),
        new ReplaceInSingleFile({
            additionalName: 'Version',
            sourceFilePath: './AngularDeploymentRoot/app.js',
            replaceRules: [
                { search: /@version/g, replace: 'v1.2.3' }
            ]
        })
    );

    options.onBuildExit.addOperations(...this.getMergeJSONFilesOperations());

    if (!isDevelopmentMode) {
        options.onBuildStart.addOperations(
        new Zip({
            additionalName: 'To ../published_versions',
            destinationFile: `../published_versions/v1.2.3/app.zip`,
            sourceFolderToZip: './AngularDeploymentRoot',
        })
    );
    }

    //You can attach operation to the inner Compilation, or JsParser hooks if those exist in the given Compiler hook
    options.compilerHooks.compilation.finishModules.addOperations(
    new MkDir({
        additionalName: 'Create addtional directory',
        dirPathToMake: './AdditionalDirectory'
    })
    );

    let instance: WebpackHookAttacherPlugin = new WebpackHookAttacherPlugin(options);
    return instance;
}

private static getMergeJSONFilesOperations(): MergeJSONFiles[] {
    let res: MergeJSONFiles[] = [];

    ['en', 'fr', 'it'].forEach((language: string) => {
        let destinationFile: string = './AngularDeploymentRoot/_locales/' + language + '.json';
        res.push(new MergeJSONFiles({
            sourceRoots: ['./AngularSourceRoot'],
            globPattern: '**/' + language + '.json',
            destinationFile: destinationFile
        }));
    });

    return res;
}

...
//somewhere in the webpack config
...
 plugins: [
    ...
    getAppModuleWebpackHookAttacherPlugin()
    ...
]
...
```
