import React, { Dispatch, SetStateAction } from 'react';
import RecursiveFormLine from './components/RecursiveFormLine';
import { IFormItem } from './common/constants/type';
import useFormActions from './common/hooks/useFormActions';

interface IProps {
  formStates: IFormItem[];
  setFormStates: Dispatch<SetStateAction<IFormItem[]>>;
  indent?: number;
  spans?: number[];
}

function JsonForm({formStates, setFormStates, indent = 16, spans = [8, 5, 8, 3]}: IProps) {
  const actions = useFormActions(setFormStates);
  return (
        <div>
          {formStates.map((formState, index) => (
              <RecursiveFormLine
                  key={formState.id}
                  formState={formState}
                  path={[index]}
                  parentType={''}
                  indent={indent}
                  spans={spans}
                  {...actions}
              />
          ))}
        </div>
  );
}

export default JsonForm;
