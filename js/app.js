import { initNav } from './modules/nav.js'
import { initHero } from './modules/hero.js'
import { initReveal } from './modules/reveal.js'
import { initAccordion } from './modules/accordion.js'
import { initUI } from './modules/ui.js'

function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle')
  if (!toggle) return

  // Restore preference on load
  const stored = localStorage.getItem('dm-preference')
  if (stored === 'dark') document.documentElement.classList.add('dark')
  else if (stored === 'light') document.documentElement.classList.add('light')

  toggle.addEventListener('click', () => {
    const html = document.documentElement
    const isDark = html.classList.contains('dark')
    // If dark, switch to light; if light or unset, switch to dark
    html.classList.toggle('dark', !isDark)
    html.classList.toggle('light', isDark)
    localStorage.setItem('dm-preference', isDark ? 'light' : 'dark')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode()
  initNav()
  initHero()
  initReveal()
  initAccordion()
  initUI()
})
