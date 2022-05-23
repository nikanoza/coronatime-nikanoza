import { Vaccines, Coronatime } from 'assets/images';
import { Input } from 'components';
import { useForm } from 'react-hook-form';

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="username"
              className="mt-6 flex flex-col"
              type="text"
              placeholder="Enter unique username or email"
              register={register}
              validations={{}}
            />
            <Input
              label="password"
              className="mt-6 flex flex-col"
              type="password"
              placeholder="Fill in password"
              register={register}
              validations={{}}
            />
          </form>
        </div>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src={Vaccines} alt="" className=" absolute w-2/5 h-full" />
      </div>
    </div>
  );
};

export default Login;
