import * as React from 'react';
import { createRenderer } from 'test/utils';
import { expect } from 'chai';
import useInput from './useInput';
import { useSlotProps } from '../utils';

describe('useInput', () => {
  const { render } = createRenderer();
  describe('params: inputRef', () => {
    it('should be able to attach input ref passed through params', () => {
      const inputRef = React.createRef<HTMLInputElement>();

      const Input = () => {
        const { getInputProps } = useInput({
          inputRef,
        });
        return <input id="test" {...getInputProps()} />;
      };

      expect(() => {
        render(<Input />);
      }).not.toErrorDev();

      expect(inputRef.current!.id).to.equal('test');
    });

    it('refs provided by forwarded prop and internal input ref', () => {
      const outerInputRef = React.createRef<HTMLInputElement>();
      const innerInputRef = React.createRef<HTMLInputElement>();

      const Wrapper = ({ children }: React.PropsWithChildren) => {
        return React.cloneElement(children as React.ReactElement, { ref: outerInputRef });
      };

      const Input = React.forwardRef(
        (
          props: React.InputHTMLAttributes<HTMLInputElement>,
          forwardedRef: React.ForwardedRef<HTMLInputElement>,
        ) => {
          const { getInputProps } = useInput({
            inputRef: innerInputRef,
          });

          const inputProps = useSlotProps({
            elementType: 'input',
            getSlotProps: getInputProps,
            externalSlotProps: props,
            additionalProps: {
              ref: forwardedRef,
            },
            ownerState: {},
          });
          return <input {...inputProps} />;
        },
      );

      expect(() => {
        render(
          <Wrapper>
            <Input id="test" />
          </Wrapper>,
        );
      }).not.toErrorDev();

      expect(outerInputRef.current!.id).to.equal('test');
      expect(innerInputRef.current!.id).to.equal('test');
    });
  });
});
