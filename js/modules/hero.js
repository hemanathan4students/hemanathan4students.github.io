export function initHero() {
  const el = document.getElementById('typewriter')
  if (!el) return

  const words = (() => {
    try { return JSON.parse(el.getAttribute('data-words') || '[]') } catch { return [] }
  })()
  if (!words.length) return

  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let isPaused = false
  let timeoutId = null
  let hidden = false

  function typeStep() {
    const current = words[wordIndex]
    if (!current) return

    if (!isDeleting && !isPaused) {
      charIndex++
      el.textContent = current.slice(0, charIndex)
      if (charIndex === current.length) {
        isPaused = true
        timeoutId = setTimeout(() => { isPaused = false; isDeleting = true; typeStep() }, 2000)
        return
      }
    } else if (isDeleting) {
      charIndex--
      el.textContent = current.slice(0, charIndex)
      if (charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
    }

    const speed = isDeleting ? 40 : 80
    timeoutId = setTimeout(typeStep, speed)
  }

  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden
    if (hidden && timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    } else if (!hidden && !timeoutId) {
      typeStep()
    }
  })

  setTimeout(typeStep, 1500)
}
