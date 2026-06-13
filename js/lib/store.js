export function createStore(initial = {}) {
  let state = { ...initial }
  const listeners = new Set()
  return {
    get(key) { return state[key] },
    set(key, value) { state[key] = value; listeners.forEach(fn => fn(key, value)) },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
  }
}
