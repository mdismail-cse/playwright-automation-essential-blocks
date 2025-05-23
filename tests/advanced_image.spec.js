"use strict";
import { test, expect } from "@wordpress/e2e-test-utils-playwright";
import { EB_Free_Blocks } from "../helpers/block-names";
import generateTimestamp from "../helpers/generator";
import { publishPostAndView } from "../helpers/post-publish-helper";

test.describe("EB Advanced Image", () => {
  test("can insert a Advanced Image block", async ({ admin, editor, page }) => {
    await admin.createNewPost({ postType: "post", title: `EB Advanced Image ${generateTimestamp()}` });
    await editor.insertBlock({ name: EB_Free_Blocks.ADVANCED_IMAGE });

    //start with media library

    //inserting the right image
    var custom_image = await page.locator('xpath=(//div[@class="eb-adv-img-editor-source-item"])[1]');
    await expect.soft(custom_image).toBeVisible();
    await custom_image.click();

    await expect.soft(page.locator("button[aria-label='Add image from media'] svg")).toBeVisible();
    await page.locator("button[aria-label='Add image from media'] svg").click();

    var image_element = await page.locator('li.attachment.save-ready').first();
    await expect.soft(image_element).toBeVisible();
    await image_element.click();
    
    await expect.soft(page.locator('div.media-toolbar-primary>button.media-button')).toBeVisible();
    await page.locator('div.media-toolbar-primary>button.media-button').click();




    // Publish the post
    const page1 = await publishPostAndView(page);


    //checking block visibility in post
    await expect.soft(page1.locator('h1:has-text("EB Advanced Image 2")')).toBeVisible();
    await expect.soft(page1.locator('div.image-wrapper')).toBeVisible();
    
  });
});
