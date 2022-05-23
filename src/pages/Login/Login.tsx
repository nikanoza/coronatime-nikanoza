import { Vaccines, Coronatime } from 'assets/images';
import { Input, Button } from 'components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="w-full h-full flex">
      <div className="w-3/5 h-full pt-10 pb-10">
        <div className="ml-28 flex flex-col">
          <div>
            <img src={Coronatime} alt="" className="" />
          </div>
          <div className="mt-5 font-black">Welcome back</div>
          <div className="mt-2 text-[#808189]">
            Welcome back! Please enter your details
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-4/6">
            <Input
              label="username"
              text="username"
              inputClass="w-full pt-3 pb-3 pl-3 pr-3 mt-2 border-2 rounded-lg focus:border-[#2029F3] outline-none"
              className="mt-6 flex flex-col"
              type="text"
              placeholder="Enter unique username or email"
              register={register}
              validations={{}}
            />
            <Input
              label="password"
              text="username"
              inputClass="w-full pt-3 pb-3 pl-3 pr-3 mt-2 border-2 rounded-lg focus:border-[#2029F3] outline-none"
              className="mt-6 flex flex-col"
              type="password"
              placeholder="Fill in password"
              register={register}
              validations={{}}
            />
            <div className="flex items-center text-center mt-4">
              <Input
                label="remember"
                text="Remember this device"
                inputClass="w-5 h-5 mr-2"
                className="flex flex-row-reverse"
                type="checkbox"
                register={register}
                validations={{}}
              />
              <Link to={'/reset-password'} className="text-[#2029F3] ml-auto">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="mt-6 w-full flex items-center justify-center pt-3 pb-3 outline-none border-none bg-[#0FBA68] rounded-lg uppercase text-white"
              onClick={async () => console.log('work')}
              id="login_btn"
            >
              log in
            </Button>
          </form>
          <div className="flex mt-6 items-center w-3/5 justify-center">
            Don’t have and account?
            <Link to={'/registration'} className="text-[#2029F3] ml-2">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src={Vaccines} alt="" className=" absolute w-2/5 h-full" />
      </div>
    </div>
  );
};

export default Login;
