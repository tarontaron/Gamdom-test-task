import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TLoginForm } from '~/types/auth';
import { rootPaths } from '~/constants/paths';
import { loginSchema } from '~/constants/validation';
import { useLoginMutation } from '~/queries/auth/useLoginMutation';
import { Button, FormInput } from '~/components/ui';

const Login = () => {
  const { mutate, isPending } = useLoginMutation();

  const { control, handleSubmit } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: TLoginForm) => {
    mutate(values);
  };

  return (
    <div className="max-w-1/2 mx-auto bg-neutral-800/50 py-4 px-6 rounded-sm">
      <h1 className="text-2xl font-medium text-stone-50 text-center">Welcome !</h1>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="email" label="Email" control={control} />
        <FormInput name="password" label="Password" control={control} type="password" />

        <a href={rootPaths.register} className="text-right text-blue-500">Create account</a>

        <Button htmlType="submit" disabled={isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default Login;
