import React, { Dispatch, SetStateAction } from 'react';
import RecursiveFormLine from './components/RecursiveFormLine';
import { IFormItem, ICallbacks } from './common/constants/type';
import useFormActions from './common/hooks/useFormActions';

export interface IProps extends ICallbacks {
  formStates: IFormItem[];
  setFormStates: Dispatch<SetStateAction<IFormItem[]>>;
  indent?: number;
  spans?: number[];
  containerClassName?: string;
  itemClassName?: string;
}

function FormJson({ 
  formStates, 
  setFormStates, 
  indent = 16, 
  spans = [8, 5, 8, 3], 
  containerClassName,
  itemClassName,
  ...callbacks 
}: IProps) {
  
  const actions = useFormActions({
    setFormStates,
    ...callbacks
  });

  return (
    <div className={containerClassName}>
      {formStates.map((formState, index) => (
        <RecursiveFormLine
          key={formState.id}
          formState={formState}
          path={[index]}
          parentType={''}
          indent={indent}
          spans={spans}
          itemClassName={itemClassName}
          {...actions}
        />
      ))}
    </div>
  );
}

export default FormJson;
