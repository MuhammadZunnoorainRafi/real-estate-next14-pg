'use client';
import { RegUserSchema } from '@/lib/schemas';
import { RegUserType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import CardWrapper from './CardWrapper';
import { registerUser } from '@/actions/auth/register-user';
import { useTransition } from 'react';

function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegUserType>({
    resolver: zodResolver(RegUserSchema),
  });

  const formSubmit = (formData: RegUserType) => {
    startTransition(async () => {
      await registerUser(formData);
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
            disabled={isPending}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            variant="underlined"
            disabled={isPending}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder="******"
            variant="underlined"
            disabled={isPending}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <Button disabled={isPending} type="submit" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </CardWrapper>
  );
}

export default RegisterForm;
