export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const PATHS = {};

export enum REQUEST_STATUSES {
  NOT_REQUESTED = 'notRequested',
  REQUESTED = 'requested',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
