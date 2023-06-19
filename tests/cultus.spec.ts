import { test, expect } from "@playwright/test";
import PushBullet from "pushbullet";

const pushbulletApiKey = process.env.PUSHBULLET_API_KEY;

test("test1", async ({ page }) => {
  await page.goto(
    "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483623&mapId=-2147483610&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-07-01&endDate=2023-07-02&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%22-32764%22:%22%5B%5B-1%5D,0,1,0%5D%22,%22-32722%22:%22%5B%5B-1%5D,0,1,0%5D%22%7D&searchTime=2023-06-12T16:39:11.519"
  );

  await page.locator("#list-view-button-button").click();

  await page.waitForTimeout(5000);

  const wholePage = page.locator("body");
  await expect(wholePage).not.toContainText("No Available Campsites");

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  const screenshotFilePath = process.cwd() + "/screenshot.png";

  const pushbulletApi = new PushBullet(pushbulletApiKey);
  await pushbulletApi.file(
    null,
    screenshotFilePath,
    "Found some slots on day 1!"
  );
});

test("test2", async ({ page }) => {
  await page.goto(
    "https://camping.bcparks.ca/create-booking/results?resourceLocationId=-2147483623&mapId=-2147483610&searchTabGroupId=0&bookingCategoryId=0&startDate=2023-07-02&endDate=2023-07-03&nights=1&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=1&filterData=%7B%22-32764%22:%22%5B%5B-1%5D,0,1,0%5D%22,%22-32722%22:%22%5B%5B-1%5D,0,1,0%5D%22%7D&searchTime=2023-06-11T20:18:47.178"
  );

  await page.locator("#list-view-button-button").click();

  await page.waitForTimeout(5000);

  const wholePage = page.locator("body");
  await expect(wholePage).not.toContainText("No Available Campsites");

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  const screenshotFilePath = process.cwd() + "/screenshot.png";

  const pushbulletApi = new PushBullet(pushbulletApiKey);
  await pushbulletApi.file(
    null,
    screenshotFilePath,
    "Found some slots on day 2!"
  );
});
