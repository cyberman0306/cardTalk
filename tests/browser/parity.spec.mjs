import { expect, test } from '@playwright/test'

async function visitPolicy(page, language, browserBack = false) {
  await page.locator('.help-button').click()
  await page.locator('.privacy-links button').first().click()
  const body = page.frameLocator('.policy-frame').locator('body')
  await expect(body).toContainText(language === 'ko' ? '앱 정리하기' : 'Offloading')
  await expect(body.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:contact@dusondream.com')
  if (browserBack) await page.goBack()
  else await page.getByRole('button', { name: language === 'ko' ? '돌아가기' : 'Go back' }).click()
  await page.locator('.help-steps').waitFor()
  await page.locator('dialog .icon-button').click()
}

for (const denied of [true, false]) {
  for (const initial of ['ko', 'en']) {
    test(initial + ' with storage ' + (denied ? 'denied' : 'available'), async ({ page }) => {
      const other = initial === 'ko' ? 'en' : 'ko'
      await page.addInitScript(({ denied, initial }) => {
        if (window.top !== window) return
        Object.defineProperty(navigator, 'languages', { value: ['fr-FR', initial + '-XX'] })
        if (denied) Object.defineProperty(window, 'localStorage', {
          get() { throw new DOMException('Blocked', 'SecurityError') },
        })
        else if (!sessionStorage.getItem('seeded')) {
          sessionStorage.setItem('seeded', 'true')
          localStorage.setItem('cardtalk.saved.v1', '["retired"]')
          localStorage.setItem('cardtalk.table.v1', '{"unknown":true}')
        }
      }, { denied, initial })
      await page.goto('/')
      await expect(page.locator('html')).toHaveAttribute('lang', initial)
      if (!denied) {
        const raw = await page.evaluate(() => [localStorage.getItem('cardtalk.saved.v1'), localStorage.getItem('cardtalk.table.v1')])
        expect(raw).toEqual(['["retired"]', '{"unknown":true}'])
      }
      await page.locator('.featured-button').click()
      await page.locator('.segmented').first().getByRole('button').first().click()
      await page.locator('.segmented').last().getByRole('button').first().click()
      await page.locator('.lang-toggle').click()
      await expect(page.locator('html')).toHaveAttribute('lang', other)
      await visitPolicy(page, other)
      await expect(page.locator('.setup-controls .primary')).toHaveText(other === 'en' ? 'Start 2 turns' : '총 2차례 시작')
      await page.locator('.setup-controls .primary').click()
      await page.locator('.card-back').click()
      await page.locator('.card-live .save').click()
      await page.locator('.card-live .follow-button').click()
      const question = page.locator('.card-live h2')
      const first = await question.innerText()
      const records = () => page.evaluate(() => [localStorage.getItem('cardtalk.table.v1'), localStorage.getItem('cardtalk.saved.v1')])
      const beforeSwitch = denied ? null : await records()
      await page.locator('.lang-toggle').click()
      await expect(question).not.toHaveText(first)
      const translated = await question.innerText()
      await visitPolicy(page, initial, true)
      if (!denied) expect(await records()).toEqual(beforeSwitch)
      await expect(question).toHaveText(translated)
      await expect(page.locator('.card-live .follow-button')).toHaveAttribute('aria-expanded', 'true')
      await expect(page.locator('.card-live .save')).toHaveAttribute('aria-pressed', 'true')
      await page.locator('nav a[href="#saved"]').click()
      await page.locator('details summary').click()
      await page.locator('.lang-toggle').click()
      await visitPolicy(page, other)
      await expect(page.locator('details')).toHaveAttribute('open', '')
      await expect(page.locator('.saved-card h2')).toHaveText(first)
      if (other === 'en') await expect(page.locator('.section-heading span')).toHaveText('1 card')
      await page.locator('.brand').click()
      await page.locator('.resume').click()
      await expect(question).toHaveText(first)
      if (!denied) {
        await page.reload()
        await expect(question).toHaveText(first)
        await expect(page.locator('.card-live .save')).toHaveAttribute('aria-pressed', 'true')
      }
      await page.locator('.play-actions .primary').click()
      await expect(page.locator('.play-card-stack')).not.toHaveAttribute('data-motion', 'next')
      await page.locator('.card-live .card-back').click()
      await expect(page.locator('.play-card-stack')).not.toHaveAttribute('data-motion', 'reveal')
      await page.locator('.play-actions .primary').click()
      await expect(page.locator('.end-actions')).toBeVisible()
    })
  }
}
