import { element, by, ElementFinder } from 'protractor';

export class BookComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-book div table .btn-danger'));
  title = element.all(by.css('jhi-book div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class BookUpdatePage {
  pageTitle = element(by.id('jhi-book-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  isbnInput = element(by.id('field_isbn'));
  authorTokenInput = element(by.id('field_authorToken'));
  genreSelect = element(by.id('field_genre'));
  yearInput = element(by.id('field_year'));
  rentedInput = element(by.id('field_rented'));
  authorSelect = element(by.id('field_author'));
  libraryAccountSelect = element(by.id('field_libraryAccount'));
  rentingListSelect = element(by.id('field_rentingList'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setIsbnInput(isbn: string): Promise<void> {
    await this.isbnInput.sendKeys(isbn);
  }

  async getIsbnInput(): Promise<string> {
    return await this.isbnInput.getAttribute('value');
  }

  async setAuthorTokenInput(authorToken: string): Promise<void> {
    await this.authorTokenInput.sendKeys(authorToken);
  }

  async getAuthorTokenInput(): Promise<string> {
    return await this.authorTokenInput.getAttribute('value');
  }

  async setGenreSelect(genre: string): Promise<void> {
    await this.genreSelect.sendKeys(genre);
  }

  async getGenreSelect(): Promise<string> {
    return await this.genreSelect.element(by.css('option:checked')).getText();
  }

  async genreSelectLastOption(): Promise<void> {
    await this.genreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setYearInput(year: string): Promise<void> {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput(): Promise<string> {
    return await this.yearInput.getAttribute('value');
  }

  getRentedInput(): ElementFinder {
    return this.rentedInput;
  }

  async authorSelectLastOption(): Promise<void> {
    await this.authorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async authorSelectOption(option: string): Promise<void> {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect(): ElementFinder {
    return this.authorSelect;
  }

  async getAuthorSelectedOption(): Promise<string> {
    return await this.authorSelect.element(by.css('option:checked')).getText();
  }

  async libraryAccountSelectLastOption(): Promise<void> {
    await this.libraryAccountSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async libraryAccountSelectOption(option: string): Promise<void> {
    await this.libraryAccountSelect.sendKeys(option);
  }

  getLibraryAccountSelect(): ElementFinder {
    return this.libraryAccountSelect;
  }

  async getLibraryAccountSelectedOption(): Promise<string> {
    return await this.libraryAccountSelect.element(by.css('option:checked')).getText();
  }

  async rentingListSelectLastOption(): Promise<void> {
    await this.rentingListSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rentingListSelectOption(option: string): Promise<void> {
    await this.rentingListSelect.sendKeys(option);
  }

  getRentingListSelect(): ElementFinder {
    return this.rentingListSelect;
  }

  async getRentingListSelectedOption(): Promise<string> {
    return await this.rentingListSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BookDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-book-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-book'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
