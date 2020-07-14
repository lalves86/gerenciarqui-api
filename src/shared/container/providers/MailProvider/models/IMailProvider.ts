import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(mailData: ISendMailDTO): Promise<void>;
}
