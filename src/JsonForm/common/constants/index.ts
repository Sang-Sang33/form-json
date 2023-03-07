export enum ETypes {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Object = 'object',
  Boolean = 'boolean',
}

export const TYPE_OPTIONS = [
  { value: ETypes.String, label: ETypes.String },
  { value: ETypes.Number, label: ETypes.Number },
  { value: ETypes.Array, label: ETypes.Array },
  { value: ETypes.Object, label: ETypes.Object },
  { value: ETypes.Boolean, label: ETypes.Boolean },
];

export const BOOLEAN_OPTIONS = [
  { value: true, label: 'true' },
  { value: false, label: 'false' },
];

export const isComplexTypeFn = (type: ETypes) => [ETypes.Array, ETypes.Object].includes(type as ETypes);

