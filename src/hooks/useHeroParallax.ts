import { useEffect, useRef } from 'react'

/** 滑鼠在元素內移動時，寫入 --px / --py（-1 ~ 1）供 CSS 做視差；僅限支援 hover 且未要求減少動態的裝置。 */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    let frame = 0

    function setOffset(x: number, y: number) {
      element!.style.setProperty('--px', x.toFixed(3))
      element!.style.setProperty('--py', y.toFixed(3))
    }
    function onPointerMove(event: PointerEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element!.getBoundingClientRect()
        setOffset(((event.clientX - rect.left) / rect.width - 0.5) * 2, ((event.clientY - rect.top) / rect.height - 0.5) * 2)
      })
    }
    function onPointerLeave() {
      cancelAnimationFrame(frame)
      setOffset(0, 0)
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return ref
}
