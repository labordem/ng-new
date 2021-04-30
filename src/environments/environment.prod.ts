import { version } from '../../package.json';

export const environment = {
  production: true,
  version: `v${version}`,
  /** set to '' empty string to enable mocked account */
  apiUrl: '',
};
