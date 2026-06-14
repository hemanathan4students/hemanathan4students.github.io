export function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'))
    return
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

  const statsRow = document.querySelector('.stats')
  if (statsRow) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    statObserver.observe(statsRow)
  }
}

function animateStats() {
  document.querySelectorAll('.stat[data-count]').forEach((stat) => {
    const target = stat.getAttribute('data-count')
    const el = stat.querySelector('.stat-count')
    if (!el) return

    const hasPlus = target.endsWith('+')
    const isPercent = target.includes('%')
    const targetNum = parseInt(target, 10)
    if (isNaN(targetNum)) return

    let current = 0
    const steps = Math.min(targetNum, 60)
    const increment = targetNum / steps
    const stepTime = 1200 / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= targetNum) {
        current = targetNum
        clearInterval(timer)
      }
      let display = Math.floor(current).toString()
      if (isPercent) display += '%'
      if (hasPlus) display += '+'
      el.textContent = display
    }, stepTime)
  })
}
