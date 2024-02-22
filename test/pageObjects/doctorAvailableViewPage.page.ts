import { browser } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio';
import { CurrentDayOpeningHours } from '../interfaces/currentDayOpeningHours';
import { Page } from './page.ts';



export class DoctorAvailableViewPage extends Page {
    get parentLocator() {
        return browser.$('app-physician-profile-container');
    }
    async navigateToDoctorDetailsPage() {
        await browser.url('https://demo.clickdoc.de/cd-de/arzt/Testhausen/-/Peter-Wunderlich/2aeaa316-20c5-44e2-a1d2-30887b10d45c');
    }

    get profileContact() {
        return this.parentLocator.$('#profileContact');
    }
    get DoctorName() {
        return this.parentLocator.$('app-physician-profile-container h1');
    }

    get DoctorAddress() {
        return this.parentLocator.$('[data-web-test="address-link"]');
    }

    async getDoctorName() {
        return (await this.DoctorName).getText();
    }

    async getDoctorAddress() {
        return (await this.DoctorAddress).getText();
    }
    get currDayMorLoc(): string {
        return '.text-day-hour__item.current-date.first';
    }

    get currDayAftLoc(): string {
        return '.text-day-hour__item.current-date:not(.first)';
    }

    get startTime(): string {
        return '.text-day-hour__text-startTime';
    }

    private get endTime(): string {
        return '.text-day-hour__text-endTime';
    }

    get currentDayMorningStartTime() {
        return this.parentLocator.$(`${this.currDayMorLoc} ${this.startTime}`);
    }

    get currentDayMorningEndTime() {
        return this.parentLocator.$(`${this.currDayMorLoc} ${this.endTime}`);
    }

    get currentDayAfterNoonStartTime() {
        return this.parentLocator.$(`${this.currDayAftLoc} ${this.startTime}`);
    }

    get currentDayAfterNoonEndTime() {
        return this.parentLocator.$(`${this.currDayAftLoc} ${this.endTime}`);
    }

    get NoOpeningHoursOnWeekend(): string {
        return 'No Opening hours found on Weekdays!';
    }

    get NoOpeningHoursOnWednesDayAfterNoon(): string {
        return 'No Opening hours found on Wednesday afternoon!';
    }

    getCurrentDay() {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
    }

    async getCurrentDayOpeningHours(day: string, input: string): Promise<CurrentDayOpeningHours> {
        let getTextPromise: any;
        if (input == "Time") {
            getTextPromise = async (element: ChainablePromiseElement<WebdriverIO.Element>) => await element.getText();
        }
        else if (input == 'Font') {
            getTextPromise = async (element: ChainablePromiseElement<WebdriverIO.Element>) => (await element.getCSSProperty('font-weight')).value;
        }
        const currMorningStartTime = await getTextPromise(this.currentDayMorningStartTime);
        const currMorningEndTime = await getTextPromise(this.currentDayMorningEndTime);
        const currAfterNoonStartTime = await getTextPromise(this.currentDayAfterNoonStartTime);
        const currAfterNoonEndTime = await getTextPromise(this.currentDayAfterNoonEndTime);


        if (day === 'Wednesday') {

            return {
                currMorStartTime: currMorningStartTime,
                currMorEndTime: currMorningEndTime,
                currAftStartTime: this.NoOpeningHoursOnWednesDayAfterNoon,
                currAftNoonEndTime: this.NoOpeningHoursOnWednesDayAfterNoon
            };
        }

        if (day === 'Saturday' || day === 'Sunday') {
            return {
                currMorStartTime: this.NoOpeningHoursOnWeekend,
                currMorEndTime: this.NoOpeningHoursOnWeekend,
                currAftStartTime: this.NoOpeningHoursOnWeekend,
                currAftNoonEndTime: this.NoOpeningHoursOnWeekend
            };
        }
        return {
            currMorStartTime: currMorningStartTime,
            currMorEndTime: currMorningEndTime,
            currAftStartTime: currAfterNoonStartTime,
            currAftNoonEndTime: currAfterNoonEndTime
        };
    }

}
export default new DoctorAvailableViewPage();