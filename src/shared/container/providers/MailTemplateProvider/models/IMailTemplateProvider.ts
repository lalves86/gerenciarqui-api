import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parseHtmlTemplate(data: IParseMailTemplateDTO): Promise<string>;
}
