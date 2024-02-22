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
            await Helpers.WaitForElementDisplay(ClickDocHomePage.cookieLocator);
            await ClickDocHomePage.acceptCookies();
            await Helpers.WaitForElementClick(ClickDocHomePage.homePageFindButton);
            await ClickDocHomePage.searchForDoctorbyNameandAddress(DoctorDetails.DOCTOR_NAME, DoctorDetails.DOCTOR_ADDRESS);
        });
        it('Validate Peter Wunderlich physician view was displayed as first in the list of results', async () => {
            await Helpers.WaitForElementDisplay(DoctorListViewPage.doctorListViewFilter);
            expect(await DoctorListViewPage.getDoctorNameByIndex(0)).toBe(DoctorDetails.DOCTOR_NAME);
        });
        it('Validate physician name and address ', async () => {
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
    describe('Validate Doctor details and Opening hours in Doctor Details view page', () => {
        before(async () => {
            //I am using the url to surpass captcha
            await DoctorAvailableViewPage.navigateToDoctorDetailsPage();
            await Helpers.WaitForElementDisplay(doctorAvailableViewPagePage.profileContact);
        });
        it('Validate physician name and address ', async () => {
            expect(await DoctorAvailableViewPage.getDoctorName()).toBe(DoctorDetails.DOCTOR_NAME);
            expect(await DoctorAvailableViewPage.getDoctorAddress()).toContain(DoctorDetails.DOCTOR_ADDRESS);
        });
        it('Validate the current day opening hours from contact section', async () => {
            let currentDay = DoctorAvailableViewPage.getCurrentDay();
            const currentDayHours = await DoctorAvailableViewPage.getCurrentDayOpeningHours(currentDay, DoctorAvailabilityOpeningHours.VALIDATE_OPENING_HOURS);
            expect(currentDayHours.currMorStartTime).toBe(DoctorAvailabilityOpeningHours.MORNING_START_TIME);
            expect(currentDayHours.currMorEndTime).toBe(DoctorAvailabilityOpeningHours.MORNING_END_TIME);
            expect(currentDayHours.currAftStartTime).toBe(DoctorAvailabilityOpeningHours.AFTERNOON_START_TIME);
            expect(currentDayHours.currAftNoonEndTime).toBe(DoctorAvailabilityOpeningHours.AFTERNOON_END_TIME);
        });
        it('Validate the current day is shown in bold', async () => {
            let currentDay = DoctorAvailableViewPage.getCurrentDay();
            const currentDayHours = await DoctorAvailableViewPage.getCurrentDayOpeningHours(currentDay, DoctorAvailabilityOpeningHours.VALIDATE_FONT_STYLE);
            expect(currentDayHours.currMorStartTime).toBe(DoctorAvailabilityOpeningHours.OPENING_HOURS_FONT_STYLE)
            expect(currentDayHours.currMorEndTime).toBe(DoctorAvailabilityOpeningHours.OPENING_HOURS_FONT_STYLE)
            expect(currentDayHours.currAftStartTime).toBe(DoctorAvailabilityOpeningHours.OPENING_HOURS_FONT_STYLE)
            expect(currentDayHours.currAftNoonEndTime).toBe(DoctorAvailabilityOpeningHours.OPENING_HOURS_FONT_STYLE)

        });
    });
})
