import React from 'react';
import Logo from './grocify-logo.svg';
import {useTheme} from '@ui-kitten/components';

export const LogoCmp = (props: any) => {
  const theme = useTheme();
  return (
    <Logo
      width={props.width || 64}
      height={props.height || 64}
      fill={props.fill || theme['color-primary-default']}
    />
  );
};
