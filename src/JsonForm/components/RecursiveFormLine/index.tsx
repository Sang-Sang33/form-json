import FormLine from '../FormLine';
import { OnStateCurd, OnStateChange, IFormItem } from '../../common/constants/type';
import React, { useMemo } from 'react';
import { ETypes, isComplexTypeFn } from '../../common/constants';

interface IProps {
  formState: IFormItem;
  path: number[];
  parentType: string;
  indent?: number;
  spans?: number[];
  onAddSibling: OnStateCurd;
  onAddChildren: OnStateCurd;
  onDeleteFormLine: OnStateCurd;
  onStateChange: OnStateChange;
}

function RecursiveFormLine({ formState, parentType, path, ...props }: IProps) {
  const shouldRenderChildren = useMemo(() => isComplexTypeFn(formState.type as ETypes) && formState.children.length > 0, [formState])
  return (
      <div>
        <FormLine {...formState} {...props} path={path} parentType={parentType} isDeleteDisabled={shouldRenderChildren} />
        {shouldRenderChildren &&
        formState.children.map((state, index) => (
            <RecursiveFormLine parentType={formState.type} formState={state} path={[...path, index]} {...props} key={state.id} />
        ))}
      </div>
  );
}

export default RecursiveFormLine;
