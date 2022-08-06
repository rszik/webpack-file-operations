# webpack-file-operations
File and directory operation collection for webpack build. You can attach any of these operations (delete/create/modify files and directories, merge json, etc...) to any webpack hook before, after and in the middle of the builds with [webpack-hook-attacher-plugin](https://www.npmjs.com/package/@wecdev/webpack-hook-attacher-plugin) 

## I know I can do better :)
If you have found bug or need an additional operation don't hesitate to contact me.

## Install
`npm install @wecdev/webpack-file-operations --save-dev `

## Use Opertaions 
You can attach pre written opertaions to any webpack hook during the webpack or webpack-dev-server build from 

such as 
- create file/directory
- delete files/directories
- move files/directories
- modify file content (delete/add rows, replace in files)
- merge json files
- zip directories

#### Usage

Webpack.config.js:

```ts
import {
    WebpackHookAttacherPlugin,
    Options    
} from '@wecdev/webpack-hook-attacher-plugin';

public static getAppModuleWebpackHookAttacherPlugin(): WebpackHookAttacherPlugin {

  let options: Options = new Options();
  options.silent = false;
  
  //attach to afterPlugins hooks
  options.afterPlugins.addOperations(
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
  
  //attach to afterEmit hook
  options.afterEmit.addOperations(
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
  
  options.done.addOperations(...this.getMergeJSONFilesOperations());
  
  if (!isDevelopmentMode) {
     options.afterEmit.addOperations(
        new Zip({
            additionalName: 'To ../published_versions',
            destinationFile: `../published_versions/v1.2.3/app.zip`,
            sourceFolderToZip: './AngularDeploymentRoot',
        })
    );
  }
  
  //You can attach operation to the inner Compilation, or JsParser hooks if those exist in the given Compiler hook
  options.compilation.finishModules.addOperations(
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
