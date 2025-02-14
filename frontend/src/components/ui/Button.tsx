import classNames from 'classnames';

type TProps = {
  children: string;
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  disabled,
  htmlType = 'button',
  onClick,
}: TProps) => {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      className={classNames('rounded-sm bg-orange-800 py-1 px-3 cursor-pointer hover:bg-orange-500', className)}
      onClick={onClick}
    >
      <p className="text-white text-sm font-medium">
        {children}
      </p>
    </button>
  );
};

export default Button;
