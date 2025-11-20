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
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        await roomPage.bookRoom(dateStr, '17:00', '18:00', 'Work group project');
    });
});