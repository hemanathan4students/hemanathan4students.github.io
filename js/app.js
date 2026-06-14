import { initNav } from './modules/nav.js'
import { initHero } from './modules/hero.js'
import { initReveal } from './modules/reveal.js'
import { initAccordion } from './modules/accordion.js'
import { initUI } from './modules/ui.js'
import { initDarkMode } from './modules/darkmode.js'

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode()
  initNav()
  initHero()
  initReveal()
  initAccordion()
  initUI()
})
