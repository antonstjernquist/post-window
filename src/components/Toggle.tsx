import React, { useEffect } from 'react';
import { ReactNode, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { post } from '../utils/post';

export interface ToggleProps {
  event: string;
  children: string;
}
export const Toggle = (props: ToggleProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    post({ type: props.event, payload: isActive });
  }, [isActive]);

  return (
    <Button
      toggle
      compact
      onClick={() => setIsActive(prev => !prev)}
      active={isActive}
      content={props.children}
      label={isActive ? 'Active' : 'Inactive'}
    />
  );
};
