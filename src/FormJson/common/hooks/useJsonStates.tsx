import { useMemo } from 'react';
import { ETypes } from '../constants';
import { IFormItem } from '../constants/type';

function useJsonStates(formStates: IFormItem[]) {
  return useMemo<Record<string, any>>(() => {
    const dfs = (state: IFormItem) => {
      if (state.type === ETypes.Object) {
        return state.children.reduce<Record<string, any>>((acc, cur) => {
          if (cur.name) {
            acc[cur.name] = dfs(cur);
          }
          return acc;
        }, {});
      } else if (state.type === ETypes.Array) {
        return state.children.map<any>(dfs);
      }
      return state.value;
    };
    return formStates.reduce<Record<string, any>>((acc, cur) => {
      if (cur.name) {
        acc[cur.name] = dfs(cur);
      }
      return acc;
    }, {});
  }, [formStates]);
}

export default useJsonStates;
