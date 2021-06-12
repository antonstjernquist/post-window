import { TeachingBubble } from '@fluentui/react';
import React, { FormEvent } from 'react';
import { useState } from 'react';
import { enterValueSlowly } from '../utils/animation';
import { EventType, PostMessageEvent } from '../utils/events';

interface TutorialItem {
  target: string;
  headline: string;
  content: string;
  buttonText: string;
}
const getTutorial = (event: PostMessageEvent): TutorialItem[] => {
  if (event.type === EventType.SIMPLE) {
    return [
      {
        target: `#tutorial-${event.id}-1`,
        headline: 'Simple payload',
        content: `Lets start by adding the event name we want to send to the NUI. \n\nEx: HIDE_APP, SET_VISIBILITY, OPEN_NUI`,
        buttonText: 'Next',
      },
      {
        target: `#tutorial-${event.id}-2`,
        headline: 'Value',
        content: 'Now simply enter the payload.',
        buttonText: 'Next',
      },
      {
        target: `#tutorial-${event.id}-3`,
        headline: 'Send the value',
        content: 'Lastly we just need to send the value!',
        buttonText: 'Send',
      },
    ];
  }

  return [
    {
      target: `#tutorial-${event.id}-1`,
      headline: 'Advanced payload',
      content:
        'Lets create an object, start by defining the PATH you want to set in the KEY input.',
      buttonText: 'Next',
    },
    {
      target: `#tutorial-${event.id}-2`,
      headline: 'Single key or path',
      content:
        'Enter they key you want to set. This can be a path separated by "." to set it',
      buttonText: 'Next',
    },
    {
      target: `#tutorial-${event.id}-3`,
      headline: 'Value',
      content: 'After we have the key, we just need to set the value.',
      buttonText: 'Next',
    },
    {
      target: `#tutorial-${event.id}-4`,
      headline: 'Add the new value',
      content: 'Lastly we need to add the value!',
      buttonText: 'Finish',
    },
  ];
};

export interface TutorialProps {
  isVisible: boolean;
  event: PostMessageEvent;
  onSteps: CallableFunction[];
  onDismiss(): void;
  onComplete?: CallableFunction;
}
export const Tutorial = (props: TutorialProps) => {
  const [step, setStep] = useState(0);
  const tutorial = getTutorial(props.event);

  const next = () => {
    if (step === tutorial.length - 1) {
      props.onDismiss();
      props.onComplete && props.onComplete();
      setStep(0);
      return;
    }

    setStep(step + 1);
    typeof props.onSteps[step] === 'function' &&
      props.onSteps[step](props.event);
  };

  if (!props.isVisible) {
    return null;
  }

  return (
    <TeachingBubble
      target={tutorial[step].target}
      hasCloseButton
      onDismiss={props.onDismiss}
      headline={tutorial[step].headline}
      primaryButtonProps={{
        children: tutorial[step].buttonText,
        onClick: next,
      }}
      secondaryButtonProps={{
        children: 'Maybe later',
        onClick: props.onDismiss,
      }}
      footerContent={`${step + 1} of ${Object.keys(tutorial).length}`}
    >
      <span style={{ whiteSpace: 'pre-line' }}>{tutorial[step].content}</span>
    </TeachingBubble>
  );
};

export default Tutorial;
