import { test } from '../fixtures/base';


test.describe('Dashboard', () => {
    test.beforeEach(async ({ dashboardPage }) => {
        await dashboardPage.goto();
    });

    test('Dashboard accessible', async ({ dashboardPage }) => {
        await dashboardPage.goto();
        await dashboardPage.isTitleVisible();
    });
});
