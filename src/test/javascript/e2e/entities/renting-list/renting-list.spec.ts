import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RentingListComponentsPage, RentingListDeleteDialog, RentingListUpdatePage } from './renting-list.page-object';

const expect = chai.expect;

describe('RentingList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rentingListComponentsPage: RentingListComponentsPage;
  let rentingListUpdatePage: RentingListUpdatePage;
  let rentingListDeleteDialog: RentingListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RentingLists', async () => {
    await navBarPage.goToEntity('renting-list');
    rentingListComponentsPage = new RentingListComponentsPage();
    await browser.wait(ec.visibilityOf(rentingListComponentsPage.title), 5000);
    expect(await rentingListComponentsPage.getTitle()).to.eq('Renting Lists');
  });

  it('should load create RentingList page', async () => {
    await rentingListComponentsPage.clickOnCreateButton();
    rentingListUpdatePage = new RentingListUpdatePage();
    expect(await rentingListUpdatePage.getPageTitle()).to.eq('Create or edit a Renting List');
    await rentingListUpdatePage.cancel();
  });

  it('should create and save RentingLists', async () => {
    const nbButtonsBeforeCreate = await rentingListComponentsPage.countDeleteButtons();

    await rentingListComponentsPage.clickOnCreateButton();
    await promise.all([rentingListUpdatePage.setTitleInput('title'), rentingListUpdatePage.setDescriptionInput('description')]);
    expect(await rentingListUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await rentingListUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await rentingListUpdatePage.save();
    expect(await rentingListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rentingListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RentingList', async () => {
    const nbButtonsBeforeDelete = await rentingListComponentsPage.countDeleteButtons();
    await rentingListComponentsPage.clickOnLastDeleteButton();

    rentingListDeleteDialog = new RentingListDeleteDialog();
    expect(await rentingListDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Renting List?');
    await rentingListDeleteDialog.clickOnConfirmButton();

    expect(await rentingListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
