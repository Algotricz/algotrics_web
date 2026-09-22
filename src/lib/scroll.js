let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTop() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function scrollToTarget(target) {
  if (!lenisInstance) {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    element?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  lenisInstance.scrollTo(target, { duration: 1.3 })
}