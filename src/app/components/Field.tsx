'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, whenReady } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

/*
 * The resonance field: one fixed WebGL canvas behind the whole page.
 * Tens of thousands of particles hold five formations at once, and the
 * section in view picks which one they settle into, the way sand on a
 * vibrating plate finds a new figure when the frequency changes.
 *
 *   0  sphere         hero
 *   1  Chladni (3,5)  studio
 *   2  tunnel         work (particles stream past the edges, framing cards)
 *   3  Chladni (6,1)  services + process
 *   4  ring           contact
 *
 * Markup opts in with data-morph="<index>" on a section. The HUD reads the
 * current mode from the `trace:mode` event.
 */

export const MODES = ['Sphere', 'Mode 3:5', 'Tunnel', 'Mode 6:1', 'Ring']

const vertex = /* glsl */ `
  attribute vec3 aB;
  attribute vec3 aC;
  attribute vec3 aD;
  attribute vec3 aE;
  attribute float aRand;

  uniform float uTime;
  uniform float uMorph;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vRand;
  varying float vGlow;
  varying float vFade;

  mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

  // Each particle leaves a little later than its neighbours, so a change
  // of figure ripples through the cloud instead of snapping.
  float seg(float k) {
    return smoothstep(0.0, 1.0, clamp((uMorph - k) * 1.5 - aRand * 0.5, 0.0, 1.0));
  }

  void main() {
    vRand = aRand;
    float t = uTime;

    vec3 a = position;
    a.xz *= rot(t * 0.07);
    a += 0.06 * vec3(sin(t * 0.9 + aRand * 40.0), cos(t * 0.7 + aRand * 30.0), sin(t * 0.8 + aRand * 20.0));

    vec3 b = aB;
    b.z += 0.04 * sin(t * 2.0 + aRand * 50.0);
    b.xy *= rot(sin(t * 0.1) * 0.15);

    // Tunnel: flow toward the camera and twist with depth.
    vec3 c = aC;
    c.z = mod(c.z + t * 1.1 + 12.0, 16.0) - 12.0;
    c.xy *= rot(c.z * 0.12 + t * 0.05);

    vec3 d = aD;
    d.z += 0.04 * sin(t * 2.4 + aRand * 50.0);
    d.xy *= rot(-sin(t * 0.1) * 0.15);

    vec3 e = aE;
    e.xy *= rot(t * 0.12);
    e.z += 0.08 * sin(t + aRand * 60.0);

    float s1 = seg(0.0), s2 = seg(1.0), s3 = seg(2.0), s4 = seg(3.0);
    vec3 p = mix(a, b, s1);
    p = mix(p, c, s2);
    p = mix(p, d, s3);
    p = mix(p, e, s4);

    // Mid-flight turbulence, strongest halfway through a change.
    float flight = sin(s1 * 3.1416) + sin(s2 * 3.1416) + sin(s3 * 3.1416) + sin(s4 * 3.1416);
    p += flight * 0.55 * vec3(
      sin(p.y * 2.1 + t + aRand * 6.0),
      cos(p.z * 1.7 + t * 1.3 + aRand * 5.0),
      sin(p.x * 1.9 + t * 0.8)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;

    // Pointer pushes particles aside in screen space.
    vec2 ndc = clip.xy / clip.w;
    vec2 dir = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(dir);
    float push = smoothstep(0.32, 0.0, dist);
    mv.xy += normalize(dir + 1e-5) * push * 0.45 * min(-mv.z, 8.0) * 0.25;
    vGlow = push;

    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aRand * 0.9) / max(depth, 0.4);
    vFade = smoothstep(0.2, 1.6, depth) * (1.0 - smoothstep(9.0, 15.0, depth));
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  varying float vRand;
  varying float vGlow;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(uColorA, uColorB, smoothstep(0.15, 0.85, vRand));
    col = mix(col, uColorC, step(0.965, vRand));
    col = mix(col, vec3(1.0), vGlow * 0.8);
    gl_FragColor = vec4(col, a * vFade * (0.55 + vGlow * 0.6));
  }
`

// Chladni figure: points where the plate stays still for mode (n, m).
function chladni(count: number, n: number, m: number, scale: number, tilt: number) {
  const out = new Float32Array(count * 3)
  const pi = Math.PI
  const ct = Math.cos(tilt), st = Math.sin(tilt)
  let i = 0
  while (i < count) {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1
    const f = Math.cos(n * pi * x) * Math.cos(m * pi * y) - Math.cos(m * pi * x) * Math.cos(n * pi * y)
    if (Math.abs(f) > 0.035) continue
    const px = x * scale * 1.25
    const py = y * scale
    out[i * 3] = px
    out[i * 3 + 1] = py * ct
    out[i * 3 + 2] = py * st + (Math.random() - 0.5) * 0.05
    i++
  }
  return out
}

function buildGeometry(count: number) {
  const a = new Float32Array(count * 3)
  const c = new Float32Array(count * 3)
  const e = new Float32Array(count * 3)
  const rand = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Sphere shell with a soft inner haze.
    const u = Math.random(), v = Math.random()
    const theta = u * Math.PI * 2
    const phi = Math.acos(2 * v - 1)
    const r = 2.1 * (Math.random() < 0.85 ? 1 + (Math.random() - 0.5) * 0.04 : Math.cbrt(Math.random()))
    a[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    a[i * 3 + 2] = r * Math.cos(phi)

    // Tunnel wall around the camera axis.
    const ang = Math.random() * Math.PI * 2
    const tr = 2.4 + Math.random() * 2
    c[i * 3] = Math.cos(ang) * tr * 1.25
    c[i * 3 + 1] = Math.sin(ang) * tr
    c[i * 3 + 2] = Math.random() * 16 - 12

    // Ring: a thin torus seen almost face-on.
    const ra = Math.random() * Math.PI * 2
    const rb = Math.random() * Math.PI * 2
    const tube = 0.12 * Math.pow(Math.random(), 0.6)
    const R = 2.3 + tube * Math.cos(rb)
    e[i * 3] = R * Math.cos(ra)
    e[i * 3 + 1] = R * Math.sin(ra)
    e[i * 3 + 2] = tube * Math.sin(rb) * 3

    rand[i] = Math.random()
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(a, 3))
  g.setAttribute('aB', new THREE.BufferAttribute(chladni(count, 3, 5, 2.3, -0.5), 3))
  g.setAttribute('aC', new THREE.BufferAttribute(c, 3))
  g.setAttribute('aD', new THREE.BufferAttribute(chladni(count, 6, 1, 2.3, -0.5), 3))
  g.setAttribute('aE', new THREE.BufferAttribute(e, 3))
  g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20)
  return g
}

export default function Field() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    } catch {
      el.classList.add('is-fallback')
      return
    }

    const reduced = prefersReducedMotion()
    const small = window.matchMedia('(max-width: 760px)').matches
    const count = small ? 11000 : 26000

    const dpr = Math.min(window.devicePixelRatio, 1.75)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60)
    camera.position.set(0, 0, 7)

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: 1 },
      uSize: { value: small ? 38 : 36 },
      uPixelRatio: { value: dpr },
      uColorA: { value: new THREE.Color('#4de8ff') },
      uColorB: { value: new THREE.Color('#7b5cff') },
      uColorC: { value: new THREE.Color('#ff5cc8') },
    }

    const geometry = buildGeometry(count)
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // Keep the figures inside narrow screens.
      camera.position.z = w / h < 0.8 ? 10.5 : 7
      camera.updateProjectionMatrix()
      uniforms.uAspect.value = w / h
    }
    resize()
    window.addEventListener('resize', resize)

    // Pointer: eased in the shader uniform, plus a gentle tilt of the cloud.
    const target = { x: 9, y: 9, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = -(e.clientY / window.innerHeight) * 2 + 1
      target.tx = target.x
      target.ty = target.y
    }
    const onLeave = () => { target.x = 9; target.y = 9 }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    const state = { morph: 0, mode: 0 }
    const setMode = (k: number) => {
      if (state.mode === k) return
      state.mode = k
      window.dispatchEvent(new CustomEvent('trace:mode', { detail: k }))
      if (reduced) {
        state.morph = k
        render(0)
        return
      }
      gsap.to(state, { morph: k, duration: 2.4, ease: 'power2.inOut', overwrite: true })
    }

    // The active figure belongs to the last section whose top has passed
    // 55% of the viewport. Checked on every scroll, so fast jumps land right.
    const triggers: ScrollTrigger[] = []
    const bindSections = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-morph]'))
      const pick = () => {
        const line = window.innerHeight * 0.55
        let k = 0
        for (const sec of sections) {
          if (sec.getBoundingClientRect().top <= line) k = Number(sec.dataset.morph)
        }
        setMode(k)
      }
      triggers.push(ScrollTrigger.create({ start: 0, end: 'max', onUpdate: pick, onRefresh: pick }))
    }

    let time = 0
    let last = performance.now()
    const mouse = uniforms.uMouse.value
    const render = (dt: number) => {
      time += dt
      uniforms.uTime.value = time
      uniforms.uMorph.value = state.morph
      if (target.x > 5 || mouse.x > 5) {
        mouse.set(target.x, target.y)
      } else {
        mouse.x += (target.x - mouse.x) * 0.12
        mouse.y += (target.y - mouse.y) * 0.12
      }
      points.rotation.y += (target.tx * 0.18 - points.rotation.y) * 0.04
      points.rotation.x += (-target.ty * 0.12 - points.rotation.x) * 0.04
      renderer.render(scene, camera)
    }

    const tick = () => {
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      render(dt)
    }

    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(el)
    const loop = () => { if (visible && !document.hidden) tick(); else last = performance.now() }

    if (reduced) {
      render(0)
    } else {
      gsap.ticker.add(loop)
      // Reveal: the cloud condenses from a wide scatter.
      gsap.fromTo(points.scale, { x: 2.6, y: 2.6, z: 2.6 }, { x: 1, y: 1, z: 1, duration: 3, ease: 'expo.out', delay: 0.2 })
      gsap.fromTo(renderer.domElement, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' })
    }

    let cancelled = false
    whenReady().then(() => {
      if (cancelled) return
      bindSections()
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      gsap.ticker.remove(loop)
      triggers.forEach((t) => t.kill())
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className="gl-field" aria-hidden="true" />
}
