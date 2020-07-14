import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseHtmlTemplate(): Promise<string> {
    return 'Mail content';
  }
}
