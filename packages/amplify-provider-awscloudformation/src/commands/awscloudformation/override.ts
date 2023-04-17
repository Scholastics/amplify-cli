/*
  entry code for amplify override root
*/

import { $TSContext, generateOverrideSkeleton, pathManager } from '@aws-amplify/amplify-cli-core';
import * as fs from 'fs-extra';
import * as path from 'path';

export const name = 'overrides';

export const run = async (context: $TSContext) => {
  const backendDir = pathManager.getBackendDirPath();

  const destPath = path.join(backendDir, 'awscloudformation');
  fs.ensureDirSync(destPath);
  const srcPath = path.join(__dirname, '..', '..', '..', 'resources', 'overrides-resource');
  // removing runtime old root cfn stack
  // no need for rollback since these files will be autogenerated after push
  const oldRootStackFile = path.join(destPath, 'nested-cloudformation-stack.yml');
  if (fs.existsSync(oldRootStackFile)) {
    fs.unlinkSync(oldRootStackFile);
  }
  await generateOverrideSkeleton(context, srcPath, destPath);
};
