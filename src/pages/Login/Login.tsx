import { Vaccines, Coronatime, Warning } from 'assets/images';
import { Input, Button, Language } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { usePostHttp } from 'hooks';

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
    getValues,
    setError,
  } = useForm<FormValues>({
    shouldFocusError: false,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requestFc: sentRequest } = usePostHttp({
    obj: {
      link: 'https://coronatime-api.devtest.ge/api/login',
      body: {
        username: getValues('username'),
        password: getValues('password'),
      },
    },
    applyData: (param: string) => {
      const { token } = JSON.parse(param);
      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          login: true,
          username: getValues('username'),
        })
      );
      navigate('/dashboard/world');
      return JSON.parse(param);
    },
    errorFc: (property) => {
      setError('password', {
        type: 'custom',
        message: t('please, provide correct credentials...'),
      });
      setError('username', {
        type: 'custom',
        message: t('please, provide correct credentials...'),
      });
    },
  });

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<FormValues> = (): void => {
    sentRequest();
  };
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full lg:w-3/5 pt-3 pb-3 items-center justify-center">
        <div className="ml-4 sm:ml-12 flex flex-col text-xs md:text-sm">
          <div className="flex items-center justify-between pr-12">
            <img src={Coronatime} alt="" className="" />
            <Language />
          </div>
          <div className="mt-5 font-black">{t('Welcome back')}</div>
          <div className="mt-2 text-[#808189]">
            {t('Welcome back! Please enter your details')}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              label="username"
              text={t('username')}
              inputClass={`w-5/6 sm:w-1/2 lg:w-3/4 xl:w-2/3 2xl:w-1/2 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
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
              inputClass={`w-5/6 sm:w-1/2 lg:w-3/4 xl:w-2/3 2xl:w-1/2 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
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
            <div className="w-5/6 flex items-center text-center mt-4 whitespace-nowrap flex-col justify-center sm:flex-row sm:justify-between lg:mt-5">
              <Input
                label="remember"
                text={t('Remember this device')}
                inputClass="w-5 h-5 mr-2"
                className="flex flex-row-reverse"
                type="checkbox"
                register={register}
                validations={{ require: false }}
              />
              <Link to={'/reset'} className="text-[#2029F3] whitespace-nowrap">
                {t('Forgot password?')}
              </Link>
            </div>
            <div className="w-5/6">
              <Button type="submit" id="login_btn" className="w-full">
                {t('log in')}
              </Button>
            </div>
          </form>
          <div className="flex mt-6 items-center justify-center w-5/6">
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
