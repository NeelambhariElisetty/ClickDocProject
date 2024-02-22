import { Page } from "./page.ts";

export class ClickDocHomePage extends Page {

    get parentLocator() {
        return browser.$('app-landing-page');
    }
    async navigateToClickDoc() {
        await browser.url('https://demo.clickdoc.de/cd-de/');
    }

    get cookieLocator() {
        return browser.$('cd-modal-wrapper [id*="dialog"]')
    }

    async acceptCookies() {
        await this.cookieLocator.$('.agree-consent--all').click();
    }
    get doctorNameSearchBox() {
        return this.parentLocator.$('[data-web-test="lp-search-input"]');
    }
    get doctorAddressSearchBox() {
        return this.parentLocator.$('[data-web-test="lp-location-input"]');
    }
    get homePageFindButton() {
        return this.parentLocator.$('#search-button');
    }
    async searchForDoctorbyNameandAddress(name: string, address: string) {
        await this.doctorNameSearchBox.setValue(name);
        await this.doctorAddressSearchBox.setValue(address);
        await this.homePageFindButton.click();
    }
}

export default new ClickDocHomePage();

