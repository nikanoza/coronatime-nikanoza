import { Vaccines, Coronatime, Warning } from 'assets';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, Language } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { usePostHttp } from 'hooks';
import env from 'react-dotenv';

import { useTranslation } from 'react-i18next';

const Registration = () => {
  const { t } = useTranslation();

  type FormValues = {
    username: string;
    email: string;
    password: string;
    repeat_password: string;
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setError,
  } = useForm<FormValues>({
    shouldFocusError: false,
  });

  const { requestFc: sentRequest } = usePostHttp({
    obj: {
      link: 'https://coronatime-api.devtest.ge/api/register',
      body: {
        username: getValues('username'),
        email: getValues('email'),
        password: getValues('password'),
        repeatPassword: getValues('repeat_password'),
        redirectOnConfirm: env.API_URL + '/confirmation',
      },
    },
    applyData: (param: string) => {
      navigate('/sent-info');
      return JSON.parse(param);
    },
    errorFc: (property) => {
      if (property === 'username') {
        setError('username', {
          type: 'custom',
          message: t('this username is already taken.'),
        });
      } else {
        setError('email', {
          type: 'custom',
          message: t('this email is already taken.'),
        });
      }
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
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full w-5/6 lg:w-3/5 pt-2 flex items-start justify-center">
        <div className="flex flex-col text-sm w-5/6 justify-between">
          <div className="flex items-center justify-between 2xl:mt-10">
            <img src={Coronatime} alt="" className="" />
            <Language />
          </div>
          <div className="mt-1 font-bold">{t('')}</div>
          <div className="mt-1 text-[#808189]">
            {t('Please enter required info to sign up')}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-5">
            <Input
              label="username"
              className="mt-1 flex flex-col"
              inputClass={`w-11/12 lg:w-1/2 lg:h-11 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.username,
                touchedFields.username && getValues('username') !== ''
              )} outline-none`}
              text={t('username')}
              type="text"
              placeholder={t('Enter unique username')}
              register={register}
              validations={{
                required: { value: true, message: t('field is ampty') },
                minLength: {
                  value: 3,
                  message: t('username should be unique, min 3 symbols'),
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
              {(errors.username && errors.username.message) || (
                <span className="text-[#808189]">
                  {t('username should be unique, min 3 symbols')}
                </span>
              )}
            </div>
            <Input
              label="email"
              className="mt-14 mm:mt-10 md:mt-6 flex flex-col"
              inputClass={`w-11/12 lg:w-1/2 lg:h-11 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.email,
                touchedFields.email && getValues('email') !== ''
              )} outline-none`}
              text={t('email')}
              type="email"
              placeholder={t('Enter your email')}
              register={register}
              validations={{ required: t('field is ampty') }}
              correct={
                !errors.email &&
                touchedFields.email &&
                getValues('email') !== ''
              }
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.email && <img src={Warning} alt="" />}
              {errors.email && errors.email.message}
            </div>
            <Input
              label="password"
              className="mt-1 flex flex-col"
              inputClass={`w-11/12 lg:w-1/2 lg:h-11 pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.password,
                touchedFields.password && getValues('password') !== ''
              )} outline-none`}
              text={t('password')}
              type="password"
              placeholder={t('Fill in password')}
              register={register}
              validations={{
                required: t('field is ampty'),
                minLength: {
                  value: 3,
                  message: t('password should be unique, min 3 symbols'),
                },
              }}
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
            <Input
              label="repeat_password"
              className="mt-1 flex flex-col"
              inputClass={`w-11/12 lg:w-1/2 pt-1 lg:h-11 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
                errors.repeat_password,
                touchedFields.repeat_password &&
                  getValues('repeat_password') !== ''
              )} outline-none`}
              text={t('reapeat password')}
              type="password"
              placeholder={t('reapeat password')}
              register={register}
              validations={{
                required: t('field is ampty'),
                validate: {
                  same: () =>
                    getValues('repeat_password') === getValues('password') ||
                    t('password did not match'),
                },
              }}
              correct={
                !errors.repeat_password &&
                touchedFields.repeat_password &&
                getValues('repeat_password') !== ''
              }
              iconClass="w-4 h-4 -ml-6"
            />
            <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
              {errors.repeat_password && <img src={Warning} alt="" />}
              {errors.repeat_password && errors.repeat_password.message}
            </div>
            <div className="flex items-center text-center mt-2">
              <Input
                label="remember"
                text={t('Remember this device')}
                inputClass="w-5 h-5 mr-2 accent-green-600"
                className="flex flex-row-reverse"
                type="checkbox"
                register={register}
                validations={{}}
              />
            </div>
            <Button type="submit" id="sign_up" className="w-11/12 lg:w-1/2">
              {t('sign up')}
            </Button>
          </form>
          <div className="flex mt-2 items-center w-11/12 justify-center lg:w-1/2">
            {t('Already have an account?')}
            <Link
              to={'/login'}
              className="text-[#2029F3] ml-2 whitespace-nowrap"
              id="sign_btn"
            >
              {t('Log in')}
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

export default Registration;
