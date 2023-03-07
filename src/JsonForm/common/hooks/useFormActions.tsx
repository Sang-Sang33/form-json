import { IFormItem, OnStateChange, OnStateCurd } from '../constants/type';
import produce from 'immer';
import { last, uniqueId } from 'lodash-es';
import { ETypes, isComplexTypeFn } from '../constants';
import {Dispatch, SetStateAction} from "react";

export function generateNewState(): IFormItem {
  return {
    name: '',
    value: '',
    id: uniqueId(),
    type: ETypes.String,
    children: [],
  };
}

function useFormActions(onChange: Dispatch<SetStateAction<IFormItem[]>>) {
  const onAddSibling: OnStateCurd = (path) => {
    onChange(
        produce((draft) => {
          const newLineState = generateNewState();
          let newDraft = draft;
          const finalIndex = last(path);
          for (let i = 0; i < path.length - 1; i++) {
            newDraft = newDraft[path[i]].children;
          }
          if (typeof finalIndex === 'number') {
            newDraft.splice(finalIndex + 1, 0, newLineState);
          }
        })
    );
  };

  const onAddChildren: OnStateCurd = (path) => {
    onChange(
        produce((draft) => {
          const newLineState = generateNewState();
          let newDraft = draft;
          for (let i = 0; i < path.length; i++) {
            newDraft = newDraft[path[i]].children;
          }
          newDraft.push(newLineState);
        })
    );
  };

  const onDeleteFormLine: OnStateCurd = (path) => {
    onChange(
        produce((draft) => {
          let newDraft = draft;
          const finalIndex = last(path);
          for (let i = 0; i < path.length - 1; i++) {
            newDraft = newDraft[path[i]].children;
          }
          if (typeof finalIndex === 'number') {
            newDraft.splice(finalIndex, 1);
          }
        })
    );
  };

  const onStateChange: OnStateChange = (path, field, value) => {
    onChange(
        produce((draft) => {
          let newDraft = draft;
          const finalIndex = last(path);
          for (let i = 0; i < path.length - 1; i++) {
            newDraft = newDraft[path[i]].children;
          }
          if (typeof finalIndex === 'number') {
            newDraft[finalIndex][field] = value as any;
            if (field === 'type') {
              if (isComplexTypeFn(value as ETypes)) {
                newDraft[finalIndex].value = '';
              } else {
                newDraft[finalIndex].children = [];
                if(value === ETypes.Boolean) {
                  newDraft[finalIndex].value = Boolean(newDraft[finalIndex].value)
                }
              }
            }
          }
        })
    );
  };

  return {
    onAddChildren,
    onDeleteFormLine,
    onAddSibling,
    onStateChange
  }
}


export default useFormActions;
