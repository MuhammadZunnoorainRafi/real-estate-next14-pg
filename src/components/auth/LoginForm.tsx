'use client';

import CardWrapper from './CardWrapper';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogUserSchema } from '@/lib/schemas';
import { LogUserType } from '@/lib/types';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogUserType>({
    resolver: zodResolver(LogUserSchema),
  });

  const formSubmit = async (formData: LogUserType) => {
    console.log(formData);
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
      </div>
    </CardWrapper>
  );
}

export default LoginForm;
