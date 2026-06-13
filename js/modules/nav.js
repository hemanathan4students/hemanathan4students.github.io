export function initNav() {
  const header = document.getElementById('site-header')
  const hamburger = document.getElementById('hamburger')
  const navLinks = document.getElementById('nav-links')
  const navOverlay = document.getElementById('nav-overlay')
  const navAnchors = document.querySelectorAll('.nav-link, .footer-links a[href^="#"]')
  if (!header || !hamburger || !navLinks) return

  let previousFocused = null

  function getFocusableElements() {
    return navLinks.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
  }

  function focusFirstElement() {
    const focusable = getFocusableElements()
    if (focusable.length) focusable[0].focus()
  }

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('active')
    navLinks.classList.toggle('active', isOpen)
    navOverlay?.classList.toggle('active', isOpen)
    hamburger.classList.toggle('active', isOpen)
    hamburger.setAttribute('aria-expanded', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : ''

    if (isOpen) {
      previousFocused = document.activeElement
      setTimeout(() => focusFirstElement(), 50)
    } else if (previousFocused) {
      previousFocused.focus()
      previousFocused = null
    }
  }

  hamburger.addEventListener('click', () => toggleMenu())
  navOverlay?.addEventListener('click', () => toggleMenu(false))

  // Focus trap inside nav
  navLinks.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !navLinks.classList.contains('active')) return
    const focusable = getFocusableElements()
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) toggleMenu(false)
  })

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href')
      if (href === '#') return
      e.preventDefault()
      toggleMenu(false)
      const el = document.querySelector(href)
      if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
    })
  })

  let ticking = false
  const sections = document.querySelectorAll('section[id]')

  function onScroll() {
    const scrollY = window.scrollY
    header.classList.toggle('scrolled', scrollY > 24)

    let current = ''
    sections.forEach((s) => {
      if (scrollY >= s.offsetTop - 100) current = s.id
    })
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current)
    })
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScroll(); ticking = false })
      ticking = true
    }
  }, { passive: true })
}
