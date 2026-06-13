export function initAccordion() {
  document.querySelectorAll('.acc-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true'

      // Close all panels
      document.querySelectorAll('.acc-trigger').forEach((b) => b.setAttribute('aria-expanded', 'false'))
      document.querySelectorAll('.acc-panel').forEach((p) => {
        p.style.maxHeight = '0px'
        p.classList.remove('open')
      })

      // Open clicked panel if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true')
        const panel = btn.closest('.acc-item')?.querySelector('.acc-panel')
        if (panel) {
          panel.classList.add('open')
          // Use scrollHeight for accurate dynamic height
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
      }
    })

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        btn.click()
      }
    })
  })
}