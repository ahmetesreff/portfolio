// Parallax Directive
// Creates subtle parallax scrolling effect

export const vParallax = {
  mounted(el, binding) {
    const speed = binding.value?.speed || 0.5
    const direction = binding.value?.direction || 'up'

    let ticking = false
    let lastScrollY = window.scrollY

    const updateParallax = () => {
      const scrollY = window.scrollY
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only apply parallax when element is in viewport
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distance = (elementCenter - viewportCenter) * speed

        let transform = ''
        switch (direction) {
          case 'up':
            transform = `translateY(${distance * -0.3}px)`
            break
          case 'down':
            transform = `translateY(${distance * 0.3}px)`
            break
          case 'left':
            transform = `translateX(${distance * -0.3}px)`
            break
          case 'right':
            transform = `translateX(${distance * 0.3}px)`
            break
        }

        el.style.transform = transform
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateParallax()

    // Store for cleanup
    el._parallaxHandler = onScroll
  },

  unmounted(el) {
    if (el._parallaxHandler) {
      window.removeEventListener('scroll', el._parallaxHandler)
    }
  }
}

export default vParallax
