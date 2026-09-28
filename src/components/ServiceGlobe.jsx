import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import '../styles/ServiceGlobe.css'

/**
 * Compact interactive Three.js globe used as a decorative service-section visual.
 * It is self-contained: no external image texture or remote shader source is required.
 */
export default function ServiceGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    const group = new THREE.Group()
    const controls = new OrbitControls(camera, canvas)
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })
    const geometry = new THREE.IcosahedronGeometry(1.2, 5)
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xB79A68, size: 0.024, sizeAttenuation: true, transparent: true, opacity: 0.88 }))
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.2, 2)), new THREE.LineBasicMaterial({ color: 0xB79A68, transparent: true, opacity: 0.2 }))
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1.18, 36, 24), new THREE.MeshBasicMaterial({ color: 0xF8F3E9, transparent: true, opacity: 0.12 }))

    camera.position.set(0, 0, 4.7)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.55
    controls.rotateSpeed = 0.65
    group.add(shell, wire, points)
    scene.add(group)
    resizeObserver.observe(canvas.parentElement)

    let frameId
    const render = () => {
      controls.update()
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      controls.dispose()
      geometry.dispose()
      points.material.dispose()
      wire.geometry.dispose()
      wire.material.dispose()
      shell.geometry.dispose()
      shell.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div className="service-globe" aria-hidden="true"><canvas ref={canvasRef} /></div>
}
