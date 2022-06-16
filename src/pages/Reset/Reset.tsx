import { Coronatime, Warning } from 'assets';
import { Input, Button } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { recovery } from 'services';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const { t } = useTranslation();

  type FormsValues = {
    email: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setError,
  } = useForm<FormsValues>();

  const navigate = useNavigate();

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<FormsValues> = (): void => {
    const recoveryReq = recovery(process.env.REACT_APP_RECOVERY_LINK || '', {
      email: getValues('email'),
      backlink: process.env.REACT_APP_PASSWORD_RECOVERY_BACKLINK || '',
    });

    const sentReq = async () => {
      const data = await recoveryReq;
      if (data === '') {
        navigate('/sent-info');
      } else {
        setError('email', {
          type: 'custom',
          message: t('email not found'),
        });
      }
    };
    sentReq();
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center xl:text-lg md:justify-center">
      <img src={Coronatime} alt="" className="mt-5" />
      <div className="font-bold text-lg mt-36 capitalize">
        {t('reset password')}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 w-4/5 sm:mt-10 sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-center h-full pb-5 md:mt-0 md:justify-start"
      >
        <Input
          label="email"
          text={t('email')}
          inputClass={`w-full pt-1 lg:h-11 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
            errors.email,
            touchedFields.email && getValues('email') !== ''
          )} outline-none`}
          className="w-full flex flex-col"
          type="email"
          placeholder={t('Enter your email')}
          register={register}
          validations={{
            required: t('Email not found'),
          }}
          correct={
            !errors.email && touchedFields.email && getValues('email') !== ''
          }
          iconClass="w-4 h-4 -ml-6"
        />
        <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3 mr-auto">
          {errors.email && <img src={Warning} alt="" />}
          {errors.email && errors.email.message}
        </div>
        <Button id="reset_btn" type="submit" className="w-full mt-auto md:mt-5">
          {t('reset password')}
        </Button>
      </form>
    </div>
  );
};

export default Reset;
