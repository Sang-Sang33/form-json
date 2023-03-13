export interface IFormItem {
  name: string; // The Json Key
  value: string | number | boolean; // The value to the current json key
  id: string; // The unique key for each line
  type: string; // ETypes
  children: IFormItem[]; // The nested children when the type is 'array' or 'object'
}

export type TEditField = Exclude<keyof IFormItem, 'id' | 'children' | 'path'>;

export type OnStateChange = (path: number[], field: TEditField, value: string | number | boolean) => void;

export type OnStateCurd = (path: number[]) => void;

export interface ReturnFormActions {
  handleAddSibling: OnStateCurd;
  handleAddChildren: OnStateCurd;
  handleDeleteItem: OnStateCurd;
  handleStateChange: OnStateChange;
}

export interface ICallbacks {
  onAddChildren?: OnStateCurd;
  onAddSibling?: OnStateCurd;
  onDeleteItem?: OnStateCurd;
  onStateChange?: OnStateChange;
}