import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LibUserComponentsPage, LibUserDeleteDialog, LibUserUpdatePage } from './lib-user.page-object';

const expect = chai.expect;

describe('LibUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let libUserComponentsPage: LibUserComponentsPage;
  let libUserUpdatePage: LibUserUpdatePage;
  let libUserDeleteDialog: LibUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LibUsers', async () => {
    await navBarPage.goToEntity('lib-user');
    libUserComponentsPage = new LibUserComponentsPage();
    await browser.wait(ec.visibilityOf(libUserComponentsPage.title), 5000);
    expect(await libUserComponentsPage.getTitle()).to.eq('Lib Users');
  });

  it('should load create LibUser page', async () => {
    await libUserComponentsPage.clickOnCreateButton();
    libUserUpdatePage = new LibUserUpdatePage();
    expect(await libUserUpdatePage.getPageTitle()).to.eq('Create or edit a Lib User');
    await libUserUpdatePage.cancel();
  });

  it('should create and save LibUsers', async () => {
    const nbButtonsBeforeCreate = await libUserComponentsPage.countDeleteButtons();

    await libUserComponentsPage.clickOnCreateButton();
    await promise.all([
      libUserUpdatePage.setUsernameInput('username'),
      libUserUpdatePage.setFirstNameInput('firstName'),
      libUserUpdatePage.setLastNameInput('lastName'),
      libUserUpdatePage.setEmailInput('email'),
      libUserUpdatePage.rentingListSelectLastOption(),
      libUserUpdatePage.libraryAccountSelectLastOption()
    ]);
    expect(await libUserUpdatePage.getUsernameInput()).to.eq('username', 'Expected Username value to be equals to username');
    expect(await libUserUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await libUserUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await libUserUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    await libUserUpdatePage.save();
    expect(await libUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await libUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last LibUser', async () => {
    const nbButtonsBeforeDelete = await libUserComponentsPage.countDeleteButtons();
    await libUserComponentsPage.clickOnLastDeleteButton();

    libUserDeleteDialog = new LibUserDeleteDialog();
    expect(await libUserDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Lib User?');
    await libUserDeleteDialog.clickOnConfirmButton();

    expect(await libUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
