import { browser } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio';
import { Page } from './page.ts';


export class DoctorListViewPage extends Page {
    get parentLocator() {
        return browser.$('app-search-results-container');
    }

    get doctorListViewFilter() {
        return this.parentLocator.$('.icon.icon-cd_filter.filters-search-btn');
    }

    cards(index: number) {
        return this.parentLocator.$(`#card-${index}`);
    }

    async getDoctorNameByIndex(index: number): Promise<string> {
        return await this.cards(index).$('cd-list-entry-headline').getText();
    }

    getDoctorCardByName(name: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.parentLocator.$(`//*[contains(text(), "${name}")]//ancestor::app-search-result-card`);
    }

    getDoctorNameByName(name: string) {
        return this.getDoctorCardByName(name).$('cd-list-entry-headline');
    }

    getDoctorAddressByName(name: string) {
        return this.getDoctorCardByName(name).$('cd-list-entry-text');
    }

    async checkIfDoctorIsOnlineBooking(name: string): Promise<boolean> {
        const date = await this.getDoctorCardByName(name).$(".//*[contains(@class, 'available-slots__time')]").getText();
        const flag = date.includes(name) ? true : false;
        return flag;

    }

    get FindButton() {
        return this.parentLocator.$('[data-web-test="lp-location-input"]');
    }

    async getSearchButtonColor(): Promise<string> {
        const colour = (await this.FindButton.getCSSProperty('background-color')).value;
        return colour ? colour : "No Colour Found";
    }

    async getOnlineBookingButtonColour(name: string): Promise<string> {
        const colour = (await this.getDoctorCardByName(name).$("//button[contains(@class,'book-appointment-button')]").getCSSProperty('background-color')).value;
        return colour ? colour : "No Colour Found";
    }


}
export default new DoctorListViewPage();