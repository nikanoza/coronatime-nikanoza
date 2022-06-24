import { Vaccines, Coronatime, Warning } from 'assets';
import { Input, Button, Language } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'services';
import { LoginFormValues } from 'types';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setError,
  } = useForm<LoginFormValues>({
    shouldFocusError: false,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem('user') || '';
    if (loginStatus && JSON.parse(loginStatus).login === true) {
      navigate('/dashboard/world');
    }
  });

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          login: true,
          username: getValues('username'),
        })
      );
      navigate('/dashboard/world');
    } catch (error) {
      setError('password', {
        type: 'custom',
        message: t('please, provide correct credentials...'),
      });
      setError('username', {
        type: 'custom',
        message: t('please, provide correct credentials...'),
      });
    }
  };
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full lg:w-3/5 pt-3 pb-3 items-center justify-center">
        <div className="ml-4 sm:ml-12 flex flex-col text-xs md:text-sm p-2">
          <div className="flex items-center justify-between pr-12">
            <img src={Coronatime} alt="" className="" />
            <Language />
          </div>
          <div className="mt-5 font-black">{t('Welcome back')}</div>
          <div className="mt-2 text-[#808189]">
            {t('Welcome back! Please enter your details')}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-5">
            <Input
              label="username"
              text={t('username')}
              inputClass={`w-11/12 lg:w-1/2 h-9 lg:h-11 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.username,
                touchedFields.username && getValues('username') !== ''
              )} outline-none`}
              className="w-full mt-2 flex flex-col lg:mt-5"
              type="text"
              placeholder={t('Enter unique username or email')}
              register={register}
              validations={{
                required: t('Name not found'),
                minLength: {
                  value: 3,
                  message: t('Username should be unique, min 3 symbols'),
                },
              }}
              correct={
                !errors.username &&
                touchedFields.username &&
                getValues('username') !== ''
              }
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.username && <img src={Warning} alt="" />}
              {errors.username && errors.username.message}
            </div>
            <Input
              label="password"
              text={t('password')}
              inputClass={`w-11/12 lg:w-1/2 h-9 lg:h-11 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.password,
                touchedFields.password && getValues('password') !== ''
              )} outline-none`}
              className="mt-2 flex flex-col lg:mt-5"
              type="password"
              placeholder={t('Fill in password')}
              register={register}
              validations={{ required: t('field is ampty') }}
              correct={
                !errors.password &&
                touchedFields.password &&
                getValues('password') !== ''
              }
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.password && <img src={Warning} alt="" />}
              {errors.password && errors.password.message}
            </div>
            <div className="flex items-center justify-between text-center mt-2 w-11/12 lg:w-1/2">
              <Input
                label="remember"
                text={t('Remember this device')}
                inputClass="w-5 h-5 mr-2 accent-green-600 border-none"
                className="flex flex-row-reverse"
                type="checkbox"
                register={register}
                validations={{ require: false }}
              />
              <Link
                to={'/reset'}
                className="text-[#2029F3] whitespace-nowrap"
                id="reset_password_btn"
              >
                {t('Forgot password?')}
              </Link>
            </div>

            <Button type="submit" id="login_btn" className="w-11/12 lg:w-1/2">
              {t('log in')}
            </Button>
          </form>
          <div className="flex mt-6 items-center justify-center w-11/12 lg:w-1/2">
            {t('Don’t have and account?')}
            <Link to={'/registration'} className="text-[#2029F3] ml-2">
              {t('Sign up for free')}
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
