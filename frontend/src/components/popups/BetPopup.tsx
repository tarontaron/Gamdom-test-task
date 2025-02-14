import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TBetForm } from '~/types/bet';
import { betSchema } from '~/constants/validation';
import calculateAmount from '~/helpers/calculateAmount';
import { Button, NumericFormInput } from '~/components/ui';

type TProps = {
  odds: string;
  onClose: () => void;
};

const BetPopup = ({ odds, onClose }: TProps) => {
  const { control, handleSubmit, watch } = useForm<TBetForm>({
    defaultValues: {
      amount: 10,
    },
    resolver: yupResolver(betSchema),
  });

  const amount = watch('amount');

  const onSubmit = () => {
    toast.success('Bet placed');
    onClose();
  };

  return (
    <div className="inset-0 fixed z-50 bg-black/10 flex items-center justify-center">
      <div className="w-fit rounded-md mx-auto bg-slate-50 p-4">
        <form className="flex gap-2 mt-2 items-center" onSubmit={handleSubmit(onSubmit)}>
          <p>{odds} X</p>
          <NumericFormInput name="amount" control={control} />
          <Button htmlType="submit">Bet</Button>
        </form>
        <p>{calculateAmount(amount, odds)}</p>
        <Button className="w-full ml-auto mt-12 bg-slate-900" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default BetPopup;
