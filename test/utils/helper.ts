
export class Helpers {
    async WaitForElementDisplay(locator: any, timeout = 3000) {
        await locator.waitForDisplayed({ timeout })
    }

    async WaitForElementClick(locator: any, timeout = 3000) {
        await locator.waitForClickable({ timeout })
    }
};

export default new Helpers();