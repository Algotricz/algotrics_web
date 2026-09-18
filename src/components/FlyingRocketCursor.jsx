import { useEffect } from 'react'
import rocketCursor from '../assets/rocket-cursor.png'
import '../styles/FlyingRocketCursor.css'

const getBackgroundBrightness = (element) => {
  let node = element

  while (node && node !== document.documentElement) {
    const values = window.getComputedStyle(node).backgroundColor.match(/\d+(?:\.\d+)?/g)?.map(Number)
    const alpha = values?.[3] ?? 1
    if (values && alpha > 0.1) {
      const [red, green, blue] = values
      return (red * 299 + green * 587 + blue * 114) / 255000
    }
    node = node.parentElement
  }

  return 0
}

export default function FlyingRocketCursor() {
  useEffect(() => {
    const canUseRocketCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canUseRocketCursor) return undefined

    const root = document.documentElement
    const rocketImage = new Image()
    const rocketHotspot = '36 2'
    let darkRocketCursor = ''

    root.classList.add('rocket-cursor-active')
    rocketImage.src = rocketCursor
    rocketImage.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = rocketImage.naturalWidth
      canvas.height = rocketImage.naturalHeight
      const context = canvas.getContext('2d')
      if (!context) return

      context.drawImage(rocketImage, 0, 0)
      context.globalCompositeOperation = 'source-in'
      context.fillStyle = '#102b23'
      context.fillRect(0, 0, canvas.width, canvas.height)
      darkRocketCursor = `url("${canvas.toDataURL('image/png')}") ${rocketHotspot}`
    }

    const updateRocketTone = ({ clientX, clientY }) => {
      const target = document.elementFromPoint(clientX, clientY)
      const isLightBackground = target && getBackgroundBrightness(target) > 0.65
      if (isLightBackground && darkRocketCursor) root.style.setProperty('--rocket-cursor', darkRocketCursor)
      else root.style.removeProperty('--rocket-cursor')
    }

    window.addEventListener('pointermove', updateRocketTone)
    return () => {
      window.removeEventListener('pointermove', updateRocketTone)
      root.classList.remove('rocket-cursor-active')
      root.style.removeProperty('--rocket-cursor')
    }
  }, [])

  return null
}
