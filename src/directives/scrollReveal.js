// Scroll Reveal Directive
// Elements animate when they come into viewport

export const vScrollReveal = {
  mounted(el, binding) {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    // Get animation type from binding value or default
    const animationType = binding.value?.type || 'fade-up'
    const delay = binding.value?.delay || 0
    const duration = binding.value?.duration || 600

    // Set initial styles
    el.style.opacity = '0'
    el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
    el.style.transitionDelay = `${delay}ms`

    // Set initial transform based on animation type
    switch (animationType) {
      case 'fade-up':
        el.style.transform = 'translateY(40px)'
        break
      case 'fade-down':
        el.style.transform = 'translateY(-40px)'
        break
      case 'fade-left':
        el.style.transform = 'translateX(40px)'
        break
      case 'fade-right':
        el.style.transform = 'translateX(-40px)'
        break
      case 'fade-scale':
        el.style.transform = 'scale(0.9)'
        break
      case 'fade':
      default:
        el.style.transform = 'none'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate in
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) translateX(0) scale(1)'

          // Optionally unobserve after animation
          if (!binding.value?.repeat) {
            observer.unobserve(el)
          }
        } else if (binding.value?.repeat) {
          // Reset for repeat animations
          el.style.opacity = '0'
          switch (animationType) {
            case 'fade-up':
              el.style.transform = 'translateY(40px)'
              break
            case 'fade-down':
              el.style.transform = 'translateY(-40px)'
              break
            case 'fade-left':
              el.style.transform = 'translateX(40px)'
              break
            case 'fade-right':
              el.style.transform = 'translateX(-40px)'
              break
            case 'fade-scale':
              el.style.transform = 'scale(0.9)'
              break
          }
        }
      })
    }, options)

    observer.observe(el)

    // Store observer for cleanup
    el._scrollRevealObserver = observer
  },

  unmounted(el) {
    if (el._scrollRevealObserver) {
      el._scrollRevealObserver.disconnect()
    }
  }
}

export default vScrollReveal
