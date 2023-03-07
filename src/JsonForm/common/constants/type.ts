export interface IFormItem {
  name: string;
  value: string | number | boolean;
  id: string;
  type: string;
  children: IFormItem[];
}

export type TEditField = Exclude<keyof IFormItem, 'id' | 'children' | 'path'>;

export type OnStateChange = (path: number[], field: TEditField, value: string | number | boolean) => void;

export type OnStateCurd = (path: number[]) => void;
