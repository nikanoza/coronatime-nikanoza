import { Dashboard } from 'assets/images';
import { Button } from 'components';

const Recovery = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={Dashboard} alt="" className="w-2/5 mt-6" />
      <div className="font-bold mt-2 text-base">Recover password</div>
      <div className="text-sm mt-2">
        click this button to recover a password
      </div>
      <div className="w-1/2">
        <Button type="button" id="recovery-btn">
          recovery password
        </Button>
      </div>
    </div>
  );
};

export default Recovery;
