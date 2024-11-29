import { validate } from '@telegram-apps/init-data-node';

const validateInitData = (initData: string) => {
  validate(initData, process.env.TELEGRAM_API_KEY);
};

export default validateInitData;