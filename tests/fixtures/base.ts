import { test as base, Page } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { RoomPage } from "../pages/RoomPage";


type MyFixtures = {

    dashboardPage: DashboardPage;
    roomPage: RoomPage;
}

export const test = base.extend<MyFixtures>({
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    roomPage: async ({ page }, use) => {
        const roomPage = new RoomPage(page);
        await use(roomPage);
    },
});