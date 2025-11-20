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
        await roomPage.bookRoom('2025-11-19', '17:00', '18:00', 'Work');
    });
});