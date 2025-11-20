import { test } from '../fixtures/base';


test.describe('Room', () => {
    test.beforeEach(async ({ roomPage }) => {
        await roomPage.goto();
    });

    test('Room accessible', async ({ roomPage }) => {
        await roomPage.isTitleVisible();
    });

    test('access room calendar', async ({ roomPage }) => {
            await roomPage.checkRoomCalendar();
    });
    test('access room reservation', async ({ roomPage }) => {
        await roomPage.checkRoomReservation();
    });
    test('book a room', async ({ roomPage }) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateStr = `${year}-${month}-${day}`;
        await roomPage.bookRoom(dateStr, '17:00', '18:00', 'Work group project');
    });
});