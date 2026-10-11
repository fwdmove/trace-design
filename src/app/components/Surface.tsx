'use client'

import { useEffect, useRef } from 'react'

/*
 * The page's background: a soft sheet of paper-like fabric, lit from the top
 * left, that slowly drifts. Moving across it presses a shallow groove into
 * the surface, a trace, which relaxes and fades over a few seconds.
 *
 * Two passes: a small "trace" texture that diffuses and decays each frame
 * and takes new pressure along the pointer's path, and a full-screen shade
 * pass that lights the combined height field.
 */

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`

const SIM = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform vec2 uA;
uniform vec2 uB;
uniform float uAspect;
uniform float uRadius;
uniform float uStrength;

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float c = texture(uPrev, vUv).r;
  float n = texture(uPrev, vUv + vec2(0.0, uTexel.y)).r
          + texture(uPrev, vUv - vec2(0.0, uTexel.y)).r
          + texture(uPrev, vUv + vec2(uTexel.x, 0.0)).r
          + texture(uPrev, vUv - vec2(uTexel.x, 0.0)).r;
  float h = mix(c, n * 0.25, 0.1) * 0.988;

  vec2 asp = vec2(uAspect, 1.0);
  float d = segDist(vUv * asp, uA * asp, uB * asp) / uRadius;
  float press = uStrength * exp(-d * d);
  h += press * (1.0 - h);
  outColor = vec4(h, 0.0, 0.0, 1.0);
}`

const SHADE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTrace;
uniform vec2 uTexel;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Long, soft folds: stretched noise so the sheet reads as draped fabric.
float fabric(vec2 p) {
  float t = uTime * 0.035;
  vec2 q = vec2(p.x * 0.9 + p.y * 0.35, p.y * 1.6 - p.x * 0.2);
  float f = snoise(q * 0.9 + vec2(t, -t * 0.6)) * 0.62;
  f += snoise(q * 1.9 + vec2(-t * 1.3, t)) * 0.26;
  f += snoise(q * 3.8 + vec2(t * 0.7, t * 1.1)) * 0.08;
  return f;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y + uScroll);

  // Fabric slope, by finite differences.
  float e = 0.004;
  float f0 = fabric(p);
  float fx = (fabric(p + vec2(e, 0.0)) - f0) / e;
  float fy = (fabric(p + vec2(0.0, e)) - f0) / e;

  // Trace slope from the simulation texture.
  float tr = texture(uTrace, vUv).r;
  float tx = (texture(uTrace, vUv + vec2(uTexel.x, 0.0)).r - texture(uTrace, vUv - vec2(uTexel.x, 0.0)).r) / (2.0 * uTexel.x * aspect);
  float ty = (texture(uTrace, vUv + vec2(0.0, uTexel.y)).r - texture(uTrace, vUv - vec2(0.0, uTexel.y)).r) / (2.0 * uTexel.y);

  // The trace is pressed in, so it subtracts from the height.
  vec2 slope = vec2(fx, fy) * 0.055 - vec2(tx, ty) * 0.06;
  vec3 n = normalize(vec3(-slope, 1.0));

  vec3 L = normalize(vec3(-0.55, 0.65, 0.75));
  float diff = dot(n, L) - dot(vec3(0.0, 0.0, 1.0), L);
  vec3 R = reflect(-L, n);
  float sheen = pow(max(R.z, 0.0), 40.0);

  vec3 paper = vec3(0.937, 0.929, 0.906);
  vec3 lit = vec3(0.985, 0.978, 0.962);
  vec3 shade = vec3(0.835, 0.812, 0.772);
  vec3 col = paper;
  col = mix(col, lit, clamp(diff * 3.2, 0.0, 1.0));
  col = mix(col, shade, clamp(-diff * 3.2, 0.0, 1.0));
  col += sheen * 0.025;
  // A faint warmth inside the groove.
  col = mix(col, vec3(0.86, 0.82, 0.76), clamp(tr, 0.0, 1.0) * 0.16);

  // Soft falloff toward the edges, and fine grain.
  vec2 c = vUv - 0.5;
  col *= 1.0 - dot(c, c) * 0.09;
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.022;

  outColor = vec4(col, 1.0);
}`

type Target = { tex: WebGLTexture; fbo: WebGLFramebuffer }

export default function Surface() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, premultipliedAlpha: false })
    if (!gl) {
      canvas.dataset.fallback = 'true'
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const floatOk = !!gl.getExtension('EXT_color_buffer_float') || !!gl.getExtension('EXT_color_buffer_half_float')

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
      return s
    }
    const program = (frag: string) => {
      const p = gl.createProgram()!
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag))
      gl.bindAttribLocation(p, 0, 'aPos')
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link')
      return p
    }

    let sim: WebGLProgram, shade: WebGLProgram
    try {
      sim = program(SIM)
      shade = program(SHADE)
    } catch {
      canvas.dataset.fallback = 'true'
      return
    }
    const u = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name)

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    let simW = 0, simH = 0
    let targets: Target[] = []
    const makeTarget = (w: number, h: number): Target => {
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex)
      if (floatOk) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null)
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fbo = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      return { tex, fbo }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.round(window.innerWidth * dpr)
      const h = Math.round(window.innerHeight * dpr)
      if (canvas.width === w && canvas.height === h) return
      canvas.width = w
      canvas.height = h
      const scale = Math.min(1, 360 / window.innerWidth) * (coarse ? 1.4 : 1)
      simW = Math.max(64, Math.round(window.innerWidth * scale))
      simH = Math.max(64, Math.round(window.innerHeight * scale))
      targets.forEach((t) => { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo) })
      targets = [makeTarget(simW, simH), makeTarget(simW, simH)]
    }
    resize()

    // Pointer path, in uv space (0..1, y up).
    let cur: [number, number] | null = null
    let last: [number, number] | null = null
    let lastInput = 0
    const toUv = (x: number, y: number): [number, number] => [x / window.innerWidth, 1 - y / window.innerHeight]
    const onMove = (e: PointerEvent) => {
      cur = toUv(e.clientX, e.clientY)
      lastInput = performance.now()
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      cur = toUv(t.clientX, t.clientY)
      lastInput = performance.now()
    }
    const onLeave = () => { cur = null; last = null }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)

    // A slow sweep under the headline on arrival shows what the surface does;
    // on touch screens a gentle path keeps drawing while the hand is away.
    const start = performance.now()
    const ghost = (t: number): [number, number] | null => {
      const s = (t - start) / 1000
      if (s > 0.6 && s < 3.4) {
        const k = (s - 0.6) / 2.8
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2
        return [0.06 + e * 0.9, 0.34 + Math.sin(e * Math.PI * 1.6) * 0.07]
      }
      if (coarse && t - lastInput > 3500 && s > 4) {
        const g = s * 0.22
        return [0.5 + Math.sin(g) * 0.36, 0.42 + Math.sin(g * 2) * 0.14]
      }
      return null
    }

    let raf = 0
    let src = 0
    let time = 0
    let prevT = performance.now()

    const step = (a: [number, number], b: [number, number], strength: number) => {
      const from = targets[src]
      const to = targets[1 - src]
      gl.useProgram(sim)
      gl.bindFramebuffer(gl.FRAMEBUFFER, to.fbo)
      gl.viewport(0, 0, simW, simH)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, from.tex)
      gl.uniform1i(u(sim, 'uPrev'), 0)
      gl.uniform2f(u(sim, 'uTexel'), 1 / simW, 1 / simH)
      gl.uniform2f(u(sim, 'uA'), a[0], a[1])
      gl.uniform2f(u(sim, 'uB'), b[0], b[1])
      gl.uniform1f(u(sim, 'uAspect'), window.innerWidth / window.innerHeight)
      gl.uniform1f(u(sim, 'uRadius'), coarse ? 0.04 : 0.028)
      gl.uniform1f(u(sim, 'uStrength'), strength)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      src = 1 - src
    }

    const draw = () => {
      gl.useProgram(shade)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, targets[src].tex)
      gl.uniform1i(u(shade, 'uTrace'), 0)
      gl.uniform2f(u(shade, 'uTexel'), 1 / simW, 1 / simH)
      gl.uniform2f(u(shade, 'uRes'), window.innerWidth, window.innerHeight)
      gl.uniform1f(u(shade, 'uTime'), time)
      gl.uniform1f(u(shade, 'uScroll'), (window.scrollY / window.innerHeight) * 0.35)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let ghostLast: [number, number] | null = null
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (t - prevT) / 1000)
      prevT = t
      time += dt

      let a: [number, number] = [-1, -1], b: [number, number] = [-1, -1], strength = 0
      const g = ghost(t)
      if (cur) {
        const from = last ?? cur
        const len = Math.hypot(cur[0] - from[0], cur[1] - from[1])
        a = from; b = cur
        strength = Math.min(1, len * 26) * 0.32
        last = cur
        ghostLast = null
      } else if (g) {
        const from = ghostLast ?? g
        a = from; b = g
        strength = 0.26
        ghostLast = g
      } else {
        ghostLast = null
      }
      step(a, b, strength)
      draw()
    }

    if (reduced) {
      draw()
    } else {
      raf = requestAnimationFrame(frame)
    }

    const onVis = () => {
      if (reduced) return
      cancelAnimationFrame(raf)
      if (!document.hidden) { prevT = performance.now(); raf = requestAnimationFrame(frame) }
    }
    document.addEventListener('visibilitychange', onVis)
    canvas.dataset.ready = 'true'

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchstart', onTouch)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="surface" aria-hidden="true" />
}
