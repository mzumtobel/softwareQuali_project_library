import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LibraryAccountComponentsPage, LibraryAccountDeleteDialog, LibraryAccountUpdatePage } from './library-account.page-object';

const expect = chai.expect;

describe('LibraryAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let libraryAccountComponentsPage: LibraryAccountComponentsPage;
  let libraryAccountUpdatePage: LibraryAccountUpdatePage;
  let libraryAccountDeleteDialog: LibraryAccountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LibraryAccounts', async () => {
    await navBarPage.goToEntity('library-account');
    libraryAccountComponentsPage = new LibraryAccountComponentsPage();
    await browser.wait(ec.visibilityOf(libraryAccountComponentsPage.title), 5000);
    expect(await libraryAccountComponentsPage.getTitle()).to.eq('Library Accounts');
  });

  it('should load create LibraryAccount page', async () => {
    await libraryAccountComponentsPage.clickOnCreateButton();
    libraryAccountUpdatePage = new LibraryAccountUpdatePage();
    expect(await libraryAccountUpdatePage.getPageTitle()).to.eq('Create or edit a Library Account');
    await libraryAccountUpdatePage.cancel();
  });

  it('should create and save LibraryAccounts', async () => {
    const nbButtonsBeforeCreate = await libraryAccountComponentsPage.countDeleteButtons();

    await libraryAccountComponentsPage.clickOnCreateButton();
    await promise.all([libraryAccountUpdatePage.setNameInput('name')]);
    expect(await libraryAccountUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await libraryAccountUpdatePage.save();
    expect(await libraryAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await libraryAccountComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LibraryAccount', async () => {
    const nbButtonsBeforeDelete = await libraryAccountComponentsPage.countDeleteButtons();
    await libraryAccountComponentsPage.clickOnLastDeleteButton();

    libraryAccountDeleteDialog = new LibraryAccountDeleteDialog();
    expect(await libraryAccountDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Library Account?');
    await libraryAccountDeleteDialog.clickOnConfirmButton();

    expect(await libraryAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
