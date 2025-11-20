import { expect, Locator, Page } from "@playwright/test";

export class RoomPage {
    private title: Locator;
    private bookButton: Locator;
    private calendarButton: Locator;

  

    constructor(private page: Page) {
        this.title = page.getByRole('heading', { name: 'Salles disponibles' });
        this.bookButton = page.getByRole('button', { name: 'Réserver' }).first();
        this.calendarButton = page.getByRole('button', { name: 'Voir le calendrier' }).first();
    }

    async goto() {
        await this.page.goto('/rooms');
        await this.page.waitForLoadState('networkidle');
    }

    async isTitleVisible() {
        await expect (await this.title.isVisible()).toBeTruthy();
    }
    async checkRoomCalendar() {
        await this.calendarButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect (this.page.getByText('Calendrier des réservations')).toBeVisible();
    }
    async checkRoomReservation() {
        await this.bookButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect (this.page.getByText('Sélectionner une date')).toBeVisible();
    }

    async bookRoom(date: string, startTime: string, endTime: string, description: string) {
        // Navigate to booking page
        await this.checkRoomReservation();
        
        const [year, month, day] = date.split('-');
        const dateObj = new Date(parseInt(year), parseInt(month), parseInt(day));
        // Use the day number as text content to find the button
        const dayNumber = dateObj.getDate().toString();
        const dayButton = this.page.getByRole('button', { name: dayNumber }).first();
        await dayButton.click();
        
        // Wait for time slots to appear
        await this.page.waitForTimeout(500);
        
        // Select time slot (format: "10:00 - 11:00")
        const timeSlotButton = this.page.getByRole('button', { name: `${startTime} - ${endTime}` });
        await timeSlotButton.click();
        
        // Fill in purpose/description
        const purposeField = this.page.locator('#purpose');
        await purposeField.fill(description);
        
        // Submit the form
        const submitButton = this.page.getByRole('button', { name: 'Confirmer la réservation' });
        await submitButton.click();
        
        // Wait for navigation or confirmation
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL('/profile');
        await expect (this.page.getByText(description)).toBeVisible();
    }
}