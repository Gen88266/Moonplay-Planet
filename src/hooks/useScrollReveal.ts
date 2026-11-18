import { useEffect } from 'react'

export function useScrollReveal(route: string) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('has-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
      })
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => { observer.disconnect(); document.documentElement.classList.remove('has-reveal') }
  }, [route])
}
