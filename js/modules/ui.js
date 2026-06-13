function initRipple() {
  document.querySelectorAll('.pillar-card, .cat-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mx', x + '%')
      card.style.setProperty('--my', y + '%')
    })
  })
}

export function initUI() {
  initRipple()

  const toast = document.getElementById('toast')
  const backToTop = document.getElementById('back-to-top')
  let toastTimer = null

  window.showToast = function (message, type) {
    if (!toast) return
    if (toastTimer) clearTimeout(toastTimer)
    toast.textContent = message
    toast.className = 'show ' + (type || '')
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4000)
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const progressBar = document.createElement('div')
  progressBar.id = 'reading-progress'
  Object.assign(progressBar.style, {
    position: 'fixed', top: '0', left: '0', height: '3px',
    background: 'var(--terra)', zIndex: '9999',
    width: '0%', transition: 'width 0.1s ease',
    pointerEvents: 'none',
  })
  document.body.appendChild(progressBar)

  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        progressBar.style.width = progress + '%'

        if (backToTop) {
          backToTop.classList.toggle('visible', scrollTop > 400)
        }

        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}
