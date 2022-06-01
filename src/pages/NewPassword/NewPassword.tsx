import { Coronatime, Success, Warning } from 'assets/images';
import { Button, Input } from 'components';
import { useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

const NewPassword = () => {
  const [sentReq, setSentReq] = useState(false);

  const { t } = useTranslation();

  type FormsValues = {
    new_password: string;
    repeat_password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<FormsValues>();
  const onSubmit: SubmitHandler<FormsValues> = (data: FormsValues): void =>
    setSentReq(true);

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <img src={Coronatime} alt="" className="mt-5" />
      {!sentReq && (
        <div className="font-bold text-lg mt-20 capitalize">
          {t('reset password')}
        </div>
      )}
      {!sentReq && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 text-sm">
          <Input
            label="new_password"
            text={t('new password')}
            inputClass={`w-full pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
              errors.new_password,
              touchedFields.new_password
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
            correct={!errors.new_password && touchedFields.new_password}
            iconClass="w-4 h-4 -ml-6"
          />
          <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
            {errors.new_password && <img src={Warning} alt="" />}
            {errors.new_password && errors.new_password.message}
          </div>
          <Input
            label="repeat_password"
            className="mt-1 flex flex-col"
            inputClass={`w-full pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] ${setErrorStyle(
              errors.repeat_password,
              touchedFields.repeat_password
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
            correct={!errors.repeat_password && touchedFields.repeat_password}
            iconClass="w-4 h-4 -ml-6"
          />
          <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
            {errors.repeat_password && <img src={Warning} alt="" />}
            {errors.repeat_password && errors.repeat_password.message}
          </div>
          <Button type="submit" id="save_new_password_btn">
            {t('save changes')}
          </Button>
        </form>
      )}
      {sentReq && (
        <div className="flex flex-col items-center justify-center mt-20">
          <img src={Success} alt="" />
          <div>{t('Your password has been updeted successfully')}</div>
          <Button type="button" id="save_new_password_btn">
            {t('sign in')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewPassword;
