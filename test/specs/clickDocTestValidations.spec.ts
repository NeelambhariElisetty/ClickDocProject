import { DoctorDetails } from '../constants/doctorDetails.const.ts';
import { DoctorAvailabilityOpeningHours } from '../constants/doctorOpeningHours.const.ts';
import ClickDocHomePage from '../pageObjects/clickDocHomePage.page.ts';
import doctorAvailableViewPagePage from '../pageObjects/doctorAvailableViewPage.page.ts';
import DoctorAvailableViewPage from '../pageObjects/doctorAvailableViewPage.page.ts';
import DoctorListViewPage from '../pageObjects/doctorListViewPage.page.ts';
import Helpers from '../utils/helper.ts';

describe('CLICKDOC Test', () => {
    describe('Validate Doctor Details in Doctor List Page', () => {
        before(async () => {
            await ClickDocHomePage.navigateToClickDoc();
            await Helpers.WaitForElementDisplay(ClickDocHomePage.cookieLocator, 5000);
            await ClickDocHomePage.acceptCookies();
            await Helpers.WaitForElementClick(ClickDocHomePage.homePageFindButton);
            await ClickDocHomePage.searchForDoctorByNameAndAddress(DoctorDetails.DOCTOR_NAME, DoctorDetails.DOCTOR_ADDRESS);
        });
        it('Validate Peter Wunderlich doctor view was displayed as first in the list of results', async () => {
            await Helpers.WaitForElementDisplay(DoctorListViewPage.doctorListViewFilter, 10000);
            expect(await DoctorListViewPage.getDoctorNameByIndex(0)).toBe(DoctorDetails.DOCTOR_NAME);
        });
        it('Validate Doctor name and address ', async () => {
            expect((await DoctorListViewPage.getDoctorNameByName(DoctorDetails.DOCTOR_NAME)).isDisplayed()).toBeTruthy();
            expect((await DoctorListViewPage.getDoctorAddressByName(DoctorDetails.DOCTOR_ADDRESS)).isDisplayed()).toBeTruthy();
        });
        it('Validate that he is online bookable for the month of Feburary 2024', async () => {
            expect(await DoctorListViewPage.checkIfDoctorIsOnlineBooking(DoctorDetails.AVAILABLE_MONTH)).toBeTruthy();
        });
        it('Validate the color of Find button', async () => {
            expect(await DoctorListViewPage.getSearchButtonColor()).toBe(DoctorDetails.FINDEN_COLOUR);
        });
        it('Validate the color of online Appointment booking button', async () => {
            expect(await DoctorListViewPage.getOnlineBookingButtonColour(DoctorDetails.DOCTOR_NAME)).toBe(DoctorDetails.APPOINTMENT_COLOUR);
        })

    });
    describe('Validate Doctor details and Opening hours in Doctor details view page', () => {
        before(async () => {
            //I am using the url to surpass captcha
            await DoctorAvailableViewPage.navigateToDoctorDetailsPage();
            await Helpers.WaitForElementDisplay(doctorAvailableViewPagePage.profileContact, 10000);
        });
        it('Validate Doctor name and address ', async () => {
            expect(await DoctorAvailableViewPage.getDoctorName()).toBe(DoctorDetails.DOCTOR_NAME);
            expect(await DoctorAvailableViewPage.getDoctorAddress()).toContain(DoctorDetails.DOCTOR_ADDRESS);
        });
        it('Validate the current day opening hours from contact section', async () => {
            let currentDay = DoctorAvailableViewPage.getCurrentDay();
            const currentDayHours = await DoctorAvailableViewPage.getCurrentDayOpeningHours(currentDay);
            if (currentDay === "Wednesday") {
                expect(currentDayHours.currMorStartTime).toBe(DoctorAvailabilityOpeningHours.MORNING_START_TIME);
                expect(currentDayHours.currMorEndTime).toBe(DoctorAvailabilityOpeningHours.MORNING_WED_END_TIME);
            } else {
                expect(currentDayHours.currMorStartTime).toBe(DoctorAvailabilityOpeningHours.MORNING_START_TIME);
                expect(currentDayHours.currMorEndTime).toBe(DoctorAvailabilityOpeningHours.MORNING_END_TIME);
                expect(currentDayHours.currAftStartTime).toBe(DoctorAvailabilityOpeningHours.AFTERNOON_START_TIME);
                expect(currentDayHours.currAftNoonEndTime).toBe(DoctorAvailabilityOpeningHours.AFTERNOON_END_TIME);
            }
        });
        it('Validate the current day is shown in bold', async () => {
            expect((await (await DoctorAvailableViewPage.currentWeekDay).getCSSProperty('font-weight')).value).toBe(DoctorAvailabilityOpeningHours.OPENING_HOURS_FONT_STYLE);
        });
    });
})
