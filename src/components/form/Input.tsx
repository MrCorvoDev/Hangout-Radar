import {ComponentProps} from 'react';
import {FieldError, useFormContext} from 'react-hook-form';
import styled from 'styled-components';

import em from '../../styles/utils/em';

const InputFontSize = 21;
const InputEl = styled.input<{$error: FieldError | undefined}>`
   font-size: ${em(InputFontSize)};
   min-height: ${em(64, InputFontSize)};
   padding: 0 ${em(20, InputFontSize)};
   color: ${props => props.theme.color4 as string};
   background: transparent;
   border: 2px solid
      ${props =>
         props.$error ? (props.theme.danger as string) : 'currentColor'};
   border-radius: 5px;
   width: 100%;
`;

interface InputProps extends ComponentProps<'input'> {
   name: string;
   placeholder?: string | undefined;
   required?: boolean;
   forceNoReactHookForm?: boolean;
}
const Input = ({
   name,
   placeholder,
   required = true,
   forceNoReactHookForm = false,
   ...props
}: InputProps) => {
   const {
      register,
      formState: {errors},
   } = useFormContext() ?? {formState: {}};

   const formProps =
      !forceNoReactHookForm && register
         ? {...register?.(name, {required})}
         : {name};

   return (
      <InputEl
         placeholder={placeholder}
         {...formProps}
         $error={errors?.[name] as FieldError | undefined}
         {...props}
      />
   );
};
export default Input;
