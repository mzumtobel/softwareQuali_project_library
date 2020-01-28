import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BookComponentsPage, BookDeleteDialog, BookUpdatePage } from './book.page-object';

const expect = chai.expect;

describe('Book e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookComponentsPage: BookComponentsPage;
  let bookUpdatePage: BookUpdatePage;
  let bookDeleteDialog: BookDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Books', async () => {
    await navBarPage.goToEntity('book');
    bookComponentsPage = new BookComponentsPage();
    await browser.wait(ec.visibilityOf(bookComponentsPage.title), 5000);
    expect(await bookComponentsPage.getTitle()).to.eq('Books');
  });

  it('should load create Book page', async () => {
    await bookComponentsPage.clickOnCreateButton();
    bookUpdatePage = new BookUpdatePage();
    expect(await bookUpdatePage.getPageTitle()).to.eq('Create or edit a Book');
    await bookUpdatePage.cancel();
  });

  it('should create and save Books', async () => {
    const nbButtonsBeforeCreate = await bookComponentsPage.countDeleteButtons();

    await bookComponentsPage.clickOnCreateButton();
    await promise.all([
      bookUpdatePage.setTitleInput('title'),
      bookUpdatePage.setIsbnInput('isbn'),
      bookUpdatePage.setAuthorTokenInput('authorToken'),
      bookUpdatePage.genreSelectLastOption(),
      bookUpdatePage.setYearInput('year'),
      // bookUpdatePage.authorSelectLastOption(),
      bookUpdatePage.libraryAccountSelectLastOption(),
      bookUpdatePage.rentingListSelectLastOption()
    ]);
    expect(await bookUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await bookUpdatePage.getIsbnInput()).to.eq('isbn', 'Expected Isbn value to be equals to isbn');
    expect(await bookUpdatePage.getAuthorTokenInput()).to.eq('authorToken', 'Expected AuthorToken value to be equals to authorToken');
    expect(await bookUpdatePage.getYearInput()).to.eq('year', 'Expected Year value to be equals to year');
    const selectedRented = bookUpdatePage.getRentedInput();
    if (await selectedRented.isSelected()) {
      await bookUpdatePage.getRentedInput().click();
      expect(await bookUpdatePage.getRentedInput().isSelected(), 'Expected rented not to be selected').to.be.false;
    } else {
      await bookUpdatePage.getRentedInput().click();
      expect(await bookUpdatePage.getRentedInput().isSelected(), 'Expected rented to be selected').to.be.true;
    }
    await bookUpdatePage.save();
    expect(await bookUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Book', async () => {
    const nbButtonsBeforeDelete = await bookComponentsPage.countDeleteButtons();
    await bookComponentsPage.clickOnLastDeleteButton();

    bookDeleteDialog = new BookDeleteDialog();
    expect(await bookDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Book?');
    await bookDeleteDialog.clickOnConfirmButton();

    expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
