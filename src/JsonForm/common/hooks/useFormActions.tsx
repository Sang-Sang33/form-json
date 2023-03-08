import {
  IFormItem,
  OnStateChange,
  OnStateCurd,
  ReturnFormACtions,
  ICallbacks,
} from '../constants/type';
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

interface IFormActions extends ICallbacks {
  setFormStates: Dispatch<SetStateAction<IFormItem[]>>;
}

function useFormActions({ 
  setFormStates, 
  onAddChildren, 
  onAddSibling, 
  onDeleteItem, 
  onStateChange 
}: IFormActions): ReturnFormACtions {

  const handleAddSibling: OnStateCurd = (path) => {
    onAddSibling?.(path);
    setFormStates(
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

  const handleAddChildren: OnStateCurd = (path) => {
    onAddChildren?.(path);
    setFormStates(
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

  const handleDeleteItem: OnStateCurd = (path) => {
    onDeleteItem?.(path)
    setFormStates(
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

  const handleStateChange: OnStateChange = (path, field, value) => {
    onStateChange?.(path, field, value)
    setFormStates(
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
    handleAddChildren,
    handleDeleteItem,
    handleAddSibling,
    handleStateChange
  }
}


export default useFormActions;
