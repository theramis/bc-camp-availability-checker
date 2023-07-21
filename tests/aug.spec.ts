import { test, expect, Page } from "@playwright/test";
import PushBullet from "pushbullet";

const pushbulletApiKey = process.env.PUSHBULLET_API_KEY;

test("Birkenhead", async ({ page }) => {
  await checkPage("Birkenhead", "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483640&mapId=-2147483631&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32766&partySize=1&equipmentCapacity=1&filterData=%7B%7D", page);
});

test("Sasquatch", async ({ page }) => {
  await checkPage("Sasquatch", "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483539&mapId=-2147483420&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%7D&equipmentCapacity=1", page);
});

test("Alice Lake", async ({ page }) => {
  await checkPage("Alice Lake", "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483647&mapId=-2147483648&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%7D&equipmentCapacity=1", page);
});

test("Nairn Falls", async ({ page }) => {
  await checkPage("Nairn Falls", "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483564&mapId=-2147483471&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%7D&equipmentCapacity=1", page);
});

test("Chilliwack Lake", async ({ page }) => {
  await checkPage("Chilliwack Lake", "https://camping.bcparks.ca/create-booking/results?mapId=-2147483619&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%7D&equipmentCapacity=1&resourceLocationId=-2147483627", page);
});


test("Generic", async ({ page }) => {
  await checkPage("Generic", "https://camping.bcparks.ca/create-booking/results?mapId=-2147483549&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-08-12&endDate=2023-08-13&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%7D&equipmentCapacity=1", page);
});

async function checkPage(name: string, link: string, page: Page) {
  await page.goto(
    link
  );

  await page.locator("#list-view-button-button").click();

  await page.waitForTimeout(5000);

  const wholePage = page.locator("body");
  await expect(wholePage).not.toContainText("No Available Campsites");

  await page.screenshot({ path: `${name}.png`, fullPage: true });
  const screenshotFilePath = process.cwd() + "/screenshot.png";

  const pushbulletApi = new PushBullet(pushbulletApiKey);
  await pushbulletApi.file(
    null,
    screenshotFilePath,
    `Found some slots for ${name}`
  );
}
