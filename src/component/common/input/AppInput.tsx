import React, { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enterHandler?: () => void;
}

const Container = styled.input`
  border: 1px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  width: 500px;
  height: 50px;
  padding: 0 18px;
`;

const AppInput = forwardRef<HTMLInputElement, AppInputProps>((props: AppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.enterHandler?.();
    }
  };

  return <Container {...props} ref={ref} onKeyDown={onKeyDown} />;
});

export default AppInput;
