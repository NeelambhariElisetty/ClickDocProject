
export class Helpers {
    async WaitForElementDisplay(locator: any) {
        await locator.waitForDisplayed({ timeout: 2000 })
    }

    async WaitForElementClick(locator: any) {
        await locator.waitForClickable({ timeout: 2000 })
    }
}

export default new Helpers();