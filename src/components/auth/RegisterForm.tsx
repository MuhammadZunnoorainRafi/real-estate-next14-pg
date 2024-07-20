'use client';
import { RegUserSchema } from '@/lib/schemas';
import { RegUserType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import CardWrapper from './CardWrapper';
import { registerUser } from '@/actions/auth/register-user';
import { useState, useTransition } from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegUserType>({
    resolver: zodResolver(RegUserSchema),
  });

  const formSubmit = (formData: RegUserType) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(async () => {
      const res = await registerUser(formData);
      if (res.error) {
        setErrorMessage(res.error);
      }
      if (res.success) {
        setSuccessMessage(res.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLable="Register Form"
      backButtonLable="Already have an account?"
      backButtonHref="/auth/login"
    >
      <div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-y-5"
        >
          <Input
            {...register('name')}
            type="text"
            label="Name"
            placeholder="John Doe"
            variant="underlined"
            isDisabled={isPending}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            variant="underlined"
            isDisabled={isPending}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder="******"
            variant="underlined"
            isDisabled={isPending}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <Button isDisabled={isPending} type="submit" color="primary">
            Submit
          </Button>
        </form>
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successMessage} />
      </div>
    </CardWrapper>
  );
}

export default RegisterForm;
