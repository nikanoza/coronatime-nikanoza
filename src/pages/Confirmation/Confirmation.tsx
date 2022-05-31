import { Dashboard } from 'assets/images';
import { Button } from 'components';

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={Dashboard} alt="" className="w-2/5 mt-6" />
      <div className="font-bold mt-2 text-base">Confirmation email</div>
      <div className="text-sm mt-2">click this button to verify your email</div>
      <div className="w-1/2">
        <Button type="button" id="confirm-btn">
          verify email
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
