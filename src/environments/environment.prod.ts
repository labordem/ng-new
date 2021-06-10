// tslint:disable-next-line: no-default-import
import packageJson from '../../package.json';

export const environment = {
  production: true,
  version: `v${packageJson.version}`,
  /** set to '' empty string to enable mocked account */
  apiUrl: '',
};
