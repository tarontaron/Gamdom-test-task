import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TRegisterForm } from '~/types/auth';
import { rootPaths } from '~/constants/paths';
import { registerSchema } from '~/constants/validation';
import { useRegisterMutation } from '~/queries/auth/useRegisterMutation';
import { Button, FormInput } from '~/components/ui';

const Register = () => {
  const { mutate, isPending } = useRegisterMutation();

  const { control, handleSubmit } = useForm<TRegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: TRegisterForm) => {
    mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="max-w-1/2 mx-auto bg-neutral-800/50 py-4 px-6 rounded-sm">
      <h1 className="text-2xl font-medium text-stone-50 text-center">Welcome !</h1>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="name" label="Name" control={control} />
        <FormInput name="email" label="Email" control={control} />
        <FormInput name="password" label="Password" control={control} type="password" />
        <FormInput name="confirmPassword" label="Confirm password" control={control} type="password" />

        <a href={rootPaths.login} className="text-right text-blue-500">Login</a>

        <Button htmlType="submit" disabled={isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default Register;
