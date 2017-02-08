import { GeenesClientPage } from './app.po';

describe('geenes-client App', function() {
  let page: GeenesClientPage;

  beforeEach(() => {
    page = new GeenesClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
