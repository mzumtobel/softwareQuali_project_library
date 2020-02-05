import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SomeThingComponentsPage, SomeThingDeleteDialog, SomeThingUpdatePage } from './some-thing.page-object';

const expect = chai.expect;

describe('SomeThing e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let someThingComponentsPage: SomeThingComponentsPage;
  let someThingUpdatePage: SomeThingUpdatePage;
  let someThingDeleteDialog: SomeThingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SomeThings', async () => {
    await navBarPage.goToEntity('some-thing');
    someThingComponentsPage = new SomeThingComponentsPage();
    await browser.wait(ec.visibilityOf(someThingComponentsPage.title), 5000);
    expect(await someThingComponentsPage.getTitle()).to.eq('Some Things');
  });

  it('should load create SomeThing page', async () => {
    await someThingComponentsPage.clickOnCreateButton();
    someThingUpdatePage = new SomeThingUpdatePage();
    expect(await someThingUpdatePage.getPageTitle()).to.eq('Create or edit a Some Thing');
    await someThingUpdatePage.cancel();
  });

  it('should create and save SomeThings', async () => {
    const nbButtonsBeforeCreate = await someThingComponentsPage.countDeleteButtons();

    await someThingComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await someThingUpdatePage.save();
    expect(await someThingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await someThingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SomeThing', async () => {
    const nbButtonsBeforeDelete = await someThingComponentsPage.countDeleteButtons();
    await someThingComponentsPage.clickOnLastDeleteButton();

    someThingDeleteDialog = new SomeThingDeleteDialog();
    expect(await someThingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Some Thing?');
    await someThingDeleteDialog.clickOnConfirmButton();

    expect(await someThingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
