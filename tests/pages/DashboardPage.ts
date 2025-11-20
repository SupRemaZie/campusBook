import { expect, Locator, Page } from "@playwright/test";



export class DashboardPage {

    private title: Locator;

    constructor(private page: Page) {
        this.title = page.getByRole('heading', { name: 'Bienvenu' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async isTitleVisible() {
       await expect (await this.title.isVisible()).toBeTruthy();
    }
}