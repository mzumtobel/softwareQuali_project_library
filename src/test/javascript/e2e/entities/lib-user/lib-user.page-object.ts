import { element, by, ElementFinder } from 'protractor';

export class LibUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lib-user div table .btn-danger'));
  title = element.all(by.css('jhi-lib-user div h2#page-heading span')).first();

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

export class LibUserUpdatePage {
  pageTitle = element(by.id('jhi-lib-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  usernameInput = element(by.id('field_username'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  emailInput = element(by.id('field_email'));
  rentingListSelect = element(by.id('field_rentingList'));
  libraryAccountSelect = element(by.id('field_libraryAccount'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setUsernameInput(username: string): Promise<void> {
    await this.usernameInput.sendKeys(username);
  }

  async getUsernameInput(): Promise<string> {
    return await this.usernameInput.getAttribute('value');
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
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

export class LibUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-libUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-libUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
