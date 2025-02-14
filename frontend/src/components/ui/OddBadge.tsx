type TProps = {
  value: string;
};

const OddBadge = ({ value }: TProps) => {
  return (
    <p className="w-fit text-gray-300 rounded-sm p-1 text-xs font-medium">
      {value}
    </p>
  );
};

export default OddBadge;
