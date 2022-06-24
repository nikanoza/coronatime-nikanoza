import { Coronatime, Success, Warning } from 'assets';
import { Button, Input } from 'components';
import { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { setNewPassword } from 'services';
import { NewPasswordFormValues } from 'types';

import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const [sentReq, setSentReq] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hash = params.get('hash');

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setError,
  } = useForm<NewPasswordFormValues>();

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('user') || '';
    if (loginStatus && JSON.parse(loginStatus).login === true) {
      navigate('/dashboard/world');
    }
  });

  const onSubmit: SubmitHandler<NewPasswordFormValues> = async (
    data: NewPasswordFormValues
  ): Promise<void> => {
    try {
      await setNewPassword({
        hash: hash || '',
        password: data.new_password,
        repeatPassword: data.repeat_password,
      });
      setSentReq(true);
    } catch (error) {
      setError('new_password', {
        type: 'custom',
        message: t('invalid data provided.'),
      });
    }
  };
  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <img src={Coronatime} alt="" className="mt-5" />
      {!sentReq && (
        <div className="font-bold text-lg mt-20 md:mt-36 capitalize">
          {t('reset password')}
        </div>
      )}
      {!sentReq && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 text-sm md:w-1/2 lg:w-1/3 h-full flex flex-col pb-5"
        >
          <Input
            label="new_password"
            text={t('new password')}
            inputClass={`w-full pt-1 h-9 lg:h-11 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
              errors.new_password,
              touchedFields.new_password && getValues('new_password') !== ''
            )} outline-none`}
            className="w-full mt-2 flex flex-col"
            type="password"
            placeholder={t('Enter new password')}
            register={register}
            validations={{
              required: t('field is ampty'),
              minLength: {
                value: 3,
                message: t('Password should be unique, min 3 symbols'),
              },
            }}
            correct={
              !errors.new_password &&
              touchedFields.new_password &&
              getValues('new_password') !== ''
            }
            iconClass="w-4 h-4 -ml-6"
          />
          <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
            {errors.new_password && <img src={Warning} alt="" />}
            {errors.new_password && errors.new_password.message}
          </div>
          <Input
            label="repeat_password"
            className="mt-1 flex flex-col"
            inputClass={`w-full pt-1 h-9 lg:h-11 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
              errors.repeat_password,
              touchedFields.repeat_password &&
                getValues('repeat_password') !== ''
            )} outline-none`}
            text={t('reapeat password')}
            type="password"
            placeholder={t('Repeat password')}
            register={register}
            validations={{
              required: t('field is ampty'),
              validate: {
                same: () =>
                  getValues('repeat_password') === getValues('new_password') ||
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
          <Button
            type="submit"
            id="save_new_password_btn"
            className="w-full mt-auto md:mt-5"
          >
            {t('save changes')}
          </Button>
        </form>
      )}
      {sentReq && (
        <div className="flex flex-col items-center justify-center text-center h-full pb-5">
          <img src={Success} alt="" className="mt-auto md:mt-0" />
          <div>{t('Your password has been updated successfully')}</div>
          <Button
            type="button"
            id="save_new_password_btn"
            className="w-5/6 mt-auto md:mt-5"
          >
            <Link to={'/login'}>{t('sign in')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewPassword;
