import { notifyFieldAuthSecurityChange, notifyListQuerySecurityChange, notifySecurityEnhancement } from '../extensions/amplify-helpers/auth-notifications';
import { $TSContext, FeatureFlags, pathManager, stateManager } from 'amplify-cli-core';

jest.mock('amplify-cli-core');

const contextMock = {
  amplify: {},
  parameters: {
    first: 'resourceName',
  },
} as unknown as $TSContext;

describe('push notifications', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('notifyFieldAuthSecurityChange should exit without fail when there is not api resource directory', async () => {
    (<any>FeatureFlags.getBoolean).mockReturnValue(true);
    (<any>pathManager.getResourceDirectoryPath).mockReturnValue('path-to-non-existing-resource-directory');
    (<any>stateManager.getMeta).mockReturnValue({
      api: {
        'test-api-dev': {
          service: 'AppSync',
          output: {
            name: 'test-api-dev',
          },
        },
      },
    });
    (<any>FeatureFlags.ensureFeatureFlag).mockImplementation(() => {});
    await notifyFieldAuthSecurityChange(contextMock);
    expect(<any>FeatureFlags.ensureFeatureFlag).toHaveBeenCalledWith('graphqltransformer', 'showfieldauthnotification');
  });

  it('notifyListQuerySecurityChange should exit without fail when there is not api resource directory', async () => {
    (<any>FeatureFlags.getBoolean).mockReturnValue(true);
    (<any>pathManager.getResourceDirectoryPath).mockReturnValue('path-to-non-existing-resource-directory');
    (<any>stateManager.getMeta).mockReturnValue({
      api: {
        'test-api-dev': {
          service: 'AppSync',
          output: {
            name: 'test-api-dev',
          },
        },
      },
    });
    (<any>FeatureFlags.ensureFeatureFlag).mockImplementation(() => {});
    await notifyListQuerySecurityChange(contextMock);
    expect(<any>FeatureFlags.ensureFeatureFlag).toHaveBeenCalledWith('graphqltransformer', 'showlistquerynotification');
  });

  it('notifySecurityEnhancement should exit without fail when there is not api resource directory', async () => {
    (<any>FeatureFlags.getBoolean).mockReturnValue(true);
    (<any>pathManager.getResourceDirectoryPath).mockReturnValue('path-to-non-existing-resource-directory');
    (<any>stateManager.getMeta).mockReturnValue({
      api: {
        'test-api-dev': {
          service: 'AppSync',
          output: {
            name: 'test-api-dev',
          },
        },
      },
    });
    (<any>FeatureFlags.ensureFeatureFlag).mockImplementation(() => {});
    await notifySecurityEnhancement(contextMock);
    expect(<any>FeatureFlags.ensureFeatureFlag).toHaveBeenCalledWith('graphqltransformer', 'securityEnhancementNotification');
  });
});
