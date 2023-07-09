import { THUNK_ANY, TOOLKIT_ANY_ARGS } from '../types/types';
import { REQUEST_STATUSES } from '../variables/variables';


interface IQueryCases<T> {
  status: T,
  data: T,
  error: T,
  options?: { concat: boolean, mergeResults?: boolean }
}


interface Builder {
  addCase: (actionCreator: string, reducer: (...arg: THUNK_ANY) => void) => Builder
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedKey = (obj: any, keyString: string): string => {
  const keys = keyString.split('.');
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[ i ];
    value = value[ key ];
    if (value === undefined) {
      break;
    }
  }
  return value;
};

const splitString = (str: string): [string, string] => {
  const separator = '.';

  const parts = str.split(separator);
  const allButLast = parts.slice(0, -1).join(separator);
  const last = parts[ parts.length - 1 ];
  return [ allButLast, last ];
};

export const addQueryCases = (
  builder: Builder,
  thunk: THUNK_ANY,
  { status, data, error, options = { concat: false, mergeResults: false } }: IQueryCases<string>,
): void => {
  builder
    .addCase(thunk.pending, (state: TOOLKIT_ANY_ARGS) => {
      state[ status ] = REQUEST_STATUSES.REQUESTED;
    })
    .addCase(thunk.fulfilled, (state: TOOLKIT_ANY_ARGS, { payload }: TOOLKIT_ANY_ARGS) => {
      const [ allButLast, last ] = splitString(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nestedValue: {current: any} = { current: {} };

      if (allButLast) {
        nestedValue.current = getNestedKey(state, allButLast);
      } else {
        nestedValue.current = state;
      }

      state[ status ] = REQUEST_STATUSES.SUCCEEDED;
      if (options.mergeResults) {
        nestedValue.current[ last ] = {
          ...payload,
          results: [ ...nestedValue.current[ last ]?.results || [], ...payload.results || [] ],
        };
      } else if (options.concat) {
        nestedValue.current[ last ] = [ ...nestedValue.current[ last ], ...payload ];
      } else {
        nestedValue.current[ last ] = payload;
      }
    })
    .addCase(thunk.rejected, (state: TOOLKIT_ANY_ARGS, action: TOOLKIT_ANY_ARGS) => {
      state[ status ] = REQUEST_STATUSES.FAILED;
      state[ error ] = action.error;
    });
};
