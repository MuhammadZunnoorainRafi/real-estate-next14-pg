'use client';

import CardWrapper from './CardWrapper';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogUserSchema } from '@/lib/schemas';
import { LogUserType } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { loginUser } from '@/actions/auth/login-user';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogUserType>({
    resolver: zodResolver(LogUserSchema),
  });

  const formSubmit = (formData: LogUserType) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(async () => {
      const res = await loginUser(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      }
      if (res?.success) {
        setSuccessMessage(res.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLable="Login Form"
      backButtonLable="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-2"
        >
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            variant="underlined"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder="******"
            variant="underlined"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form>
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successMessage} />
      </div>
    </CardWrapper>
  );
}

export default LoginForm;
