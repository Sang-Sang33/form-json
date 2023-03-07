import { act, renderHook } from '@testing-library/react';
import useJsonState from './useJsonStates';
import { uniqueId } from 'lodash-es';
import { ETypes } from '../constants';

describe('useJsonState', () => {
  it('should get the truty json state', () => {
    const formStates = [
      {
        name: 'mikasa',
        value: '',
        id: uniqueId(),
        type: ETypes.Object,
        children: [
          {
            name: 'hobby',
            value: 'kill alen',
            id: uniqueId(),
            type: ETypes.Array,
            children: [
              {
                name: 'hobby',
                value: 'kill alen',
                id: uniqueId(),
                type: ETypes.String,
                children: [],
              },
              {
                name: 'hobby',
                value: 'kill human beings',
                id: uniqueId(),
                type: ETypes.String,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'alen',
        value: 12,
        id: uniqueId(),
        type: ETypes.Number,
        children: [],
      },
    ];
    const { result } = renderHook(() => useJsonState(formStates));
    const expectJson = {
      mikasa: {
        hobby: ['kill alen', 'kill human beings'],
      },
      alen: 12,
    };
    expect(result.current).toEqual(expectJson);
  });
  it('when the  type is not complex, the "children" field should not be the value of key', () => {
    const formStates = [
      {
        name: 'mikasa',
        value: 'haha',
        id: uniqueId(),
        type: ETypes.String,
        children: [
          {
            name: 'hobby',
            value: 'kill alen',
            id: uniqueId(),
            type: ETypes.String,
            children: [],
          },
        ],
      },
      {
        name: 'alen',
        value: 12,
        id: uniqueId(),
        type: ETypes.Number,
        children: [],
      },
    ];
    const { result } = renderHook(() => useJsonState(formStates));
    const expectJson = {
      mikasa: 'haha',
      alen: 12,
    };
    expect(result.current).toEqual(expectJson);
  });
});
