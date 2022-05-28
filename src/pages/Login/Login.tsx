import { Vaccines, Coronatime, Warning } from 'assets/images';
import { Input, Button } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  type FormValues = {
    username: string;
    password: string;
    remember: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    shouldFocusError: false,
  });

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues): void =>
    console.log(data);

  return (
    <div className="w-full h-full flex">
      <div className="w-3/5 h-full pt-3 pb-3">
        <div className="ml-28 flex flex-col text-sm">
          <div>
            <img src={Coronatime} alt="" className="" />
          </div>
          <div className="mt-5 font-black">Welcome back</div>
          <div className="mt-2 text-[#808189]">
            Welcome back! Please enter your details
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              label="username"
              text="username"
              inputClass={`w-5/6 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
                errors.username,
                touchedFields.username
              )} outline-none`}
              className="w-full mt-2 flex flex-col"
              type="text"
              placeholder="Enter unique username or email"
              register={register}
              validations={{
                required: 'Name not found',
                minLength: {
                  value: 3,
                  message: 'Username should be unique, min 3 symbols ',
                },
              }}
              correct={!errors.username && touchedFields.username}
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.username && <img src={Warning} alt="" />}
              {errors.username && errors.username.message}
            </div>
            <Input
              label="password"
              text="password"
              inputClass={`w-5/6 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
                errors.password,
                touchedFields.password
              )} outline-none`}
              className="mt-2 flex flex-col"
              type="password"
              placeholder="Fill in password"
              register={register}
              validations={{ required: 'field is ampty' }}
              correct={!errors.password && touchedFields.password}
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.password && <img src={Warning} alt="" />}
              {errors.password && errors.password.message}
            </div>
            <div className="w-5/6 flex items-center text-center mt-4">
              <Input
                label="remember"
                text="Remember this device"
                inputClass="w-5 h-5 mr-2"
                className="flex flex-row-reverse"
                type="checkbox"
                register={register}
                validations={{ require: false }}
              />
              <Link to={'/reset-password'} className="text-[#2029F3] ml-auto">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="mt-6 w-5/6 flex items-center justify-center pt-3 pb-3 outline-none border-none bg-[#0FBA68] rounded-lg uppercase text-white"
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
        <img src={Vaccines} alt="" className="absolute w-2/5 h-full" />
      </div>
    </div>
  );
};

export default Login;
