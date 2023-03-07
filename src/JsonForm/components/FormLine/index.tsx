import { Input, Select, Typography, Dropdown, Row, Col, Button } from 'antd';
import { TYPE_OPTIONS, ETypes, isComplexTypeFn } from '../../common/constants';
//@ts-ignore
import styles from './index.module.css';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { OnStateCurd, OnStateChange, IFormItem } from '../../common/constants/type';
import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import ValueInputByType from '../ValueInputByType';

interface IProps extends IFormItem {
  path: number[];
  parentType: string;
  isDeleteDisabled: boolean;
  spans?: number[];
  indent?: number;
  onAddSibling: OnStateCurd;
  onAddChildren: OnStateCurd;
  onDeleteFormLine: OnStateCurd;
  onStateChange: OnStateChange;
}

function FormLine({ name, value, type, path, indent = 12, spans = [8, 5, 8, 3], parentType, isDeleteDisabled, onAddSibling, onAddChildren, onDeleteFormLine, onStateChange }: IProps) {
  const isComplexType = useMemo(() => isComplexTypeFn(type as ETypes), [type]);
  const shouldKeyDisabled = parentType === ETypes.Array;
  const items: MenuProps['items'] = [
    {
      key: 'addSibling',
      label: (
          <Typography.Paragraph
              className={styles.dropText}
              onClick={() => {
                onAddSibling(path);
              }}
          >
            添加同级
          </Typography.Paragraph>
      ),
    },
    {
      key: 'addChildren',
      label: (
          <Typography.Paragraph
              className={styles.dropText}
              onClick={() => {
                onAddChildren(path);
              }}
          >
            添加子级
          </Typography.Paragraph>
      ),
    },
  ];
  return (
      <Row className={styles.formLine} align={'middle'} gutter={16}>
        <Col span={spans[0]} style={{paddingLeft: (path.length - 1) * indent}}>
          <Input
              placeholder={shouldKeyDisabled ? '' : '请输入json的key'}
              value={name}
              onChange={(e) => {
                onStateChange(path, 'name', e.target.value);
              }}
              disabled={shouldKeyDisabled}
          />
        </Col>
        <Col span={spans[1]}>
          <Select
              value={type}
              className={styles.types}
              options={TYPE_OPTIONS}
              onChange={(value) => {
                onStateChange(path, 'type', value);
              }}
          />
        </Col>
        <Col span={spans[2]}>
          <ValueInputByType value={value} type={type} path={path} onStateChange={onStateChange} />
        </Col>
        <Col span={spans[3]}>
          {isComplexType ? (
              <Dropdown menu={{ items }}>
                <Button

                    shape={'circle'}
                    type={'link'}
                    size={'small'}
                    icon={<PlusOutlined />}
                />
              </Dropdown>
          ) : (
              <Button

                  onClick={() => {
                    onAddSibling(path);
                  }}
                  shape={'circle'}
                  type={'link'}
                  size={'small'}
                  icon={<PlusOutlined />}
              />
          )}

          <Button
              disabled={isDeleteDisabled}
              style={{marginLeft: 8}}
              onClick={() => {
                if (isDeleteDisabled) return;
                onDeleteFormLine(path);
              }}
              danger
              type={'link'}
              size={'small'}
              icon={<CloseOutlined />}
          />
        </Col>
      </Row>
  );
}

export default FormLine;
