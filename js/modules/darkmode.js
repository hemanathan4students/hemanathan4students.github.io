export function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle')
  if (!toggle) return

  const stored = localStorage.getItem('dm-preference')
  if (stored === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (stored === 'light') {
    document.documentElement.classList.add('light')
  }

  toggle.addEventListener('click', () => {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    root.classList.toggle('dark', !isDark)
    root.classList.toggle('light', isDark)
    localStorage.setItem('dm-preference', isDark ? 'light' : 'dark')
  })
}
