import { memo, useMemo, useCallback, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

const GLASS_CARD: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 20,
  overflow: 'hidden',
}

const SECTION_TITLE: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 20,
  fontWeight: 600,
  color: 'var(--color-text-primary)',
}

const SECTION_DESC: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  lineHeight: 1.6,
  color: 'var(--color-text-secondary)',
  maxWidth: 520,
}

/* ------------------------------------------------------------------ */
/*  Section 1: Particle Universe                                      */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 5000

const Particles = memo(function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const base = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)

    const accent = new THREE.Color('#6366f1')
    const neonBlue = new THREE.Color('#00d4ff')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = Math.random() * 4 + 0.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z
      base[i3] = x
      base[i3 + 1] = y
      base[i3 + 2] = z

      const t = Math.min(radius / 4, 1)
      const c = accent.clone().lerp(neonBlue, t)
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
    }

    return { positions: pos, basePositions: base, colors: col }
  }, [])

  const handlePointerMove = useCallback(
    (e: THREE.Event & { point?: THREE.Vector3 }) => {
      if ('point' in e && e.point) {
        mouse.current.set(
          (e.point.x / viewport.width) * 2,
          (e.point.y / viewport.height) * 2,
        )
      }
    },
    [viewport],
  )

  useFrame((state) => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const time = state.clock.elapsedTime

    const mx = state.pointer.x
    const my = state.pointer.y

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const bx = basePositions[i3]
      const by = basePositions[i3 + 1]
      const bz = basePositions[i3 + 2]

      const dist = Math.sqrt(bx * bx + by * by + bz * bz)
      const speed = 0.15 / Math.max(dist, 0.3)
      const angle = time * speed

      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      arr[i3] = bx * cosA - bz * sinA + mx * 0.3 * (1 - dist / 5)
      arr[i3 + 1] = by + Math.sin(time * 0.5 + i * 0.01) * 0.05 + my * 0.3 * (1 - dist / 5)
      arr[i3 + 2] = bx * sinA + bz * cosA
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} onPointerMove={handlePointerMove as never}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
})

/* ------------------------------------------------------------------ */
/*  Section 2: Interactive 3D Objects                                  */
/* ------------------------------------------------------------------ */

interface GeometryCardProps {
  title: string
  materialDesc: string
  children: React.ReactNode
}

const GeometryCard = memo(function GeometryCard({
  title,
  materialDesc,
  children,
}: GeometryCardProps) {
  return (
    <div style={{ ...GLASS_CARD, width: 280, height: 320 }}>
      <div
        style={{
          height: 240,
          background: 'linear-gradient(135deg, #f0f2ff 0%, #e8f4ff 100%)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-3, -3, -3]} intensity={0.3} color="#818cf8" />
          {children}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={3} />
        </Canvas>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ ...SECTION_TITLE, fontSize: 15, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{materialDesc}</div>
      </div>
    </div>
  )
})

const MetallicTorusKnot = memo(function MetallicTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6366f1',
        metalness: 0.9,
        roughness: 0.15,
      }),
    [],
  )

  return (
    <mesh ref={meshRef} material={material}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
    </mesh>
  )
})

const NormalIcosahedron = memo(function NormalIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => new THREE.MeshNormalMaterial({ flatShading: true }), [])

  return (
    <mesh ref={meshRef} material={material}>
      <icosahedronGeometry args={[1.1, 1]} />
    </mesh>
  )
})

const WireframeOctahedron = memo(function WireframeOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  const baseMat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: '#aa00ff',
        transparent: true,
        opacity: 0.3,
        shininess: 100,
      }),
    [],
  )

  const wireMat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: '#aa00ff',
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      }),
    [],
  )

  return (
    <group>
      <mesh ref={meshRef} material={baseMat}>
        <octahedronGeometry args={[1.1, 0]} />
      </mesh>
      <mesh material={wireMat}>
        <octahedronGeometry args={[1.12, 0]} />
      </mesh>
    </group>
  )
})

const GlassSphere = memo(function GlassSphere() {
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#00d4ff',
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 1.5,
        ior: 1.5,
        envMapIntensity: 1,
        clearcoat: 1,
      }),
    [],
  )

  return (
    <mesh material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  )
})

/* ------------------------------------------------------------------ */
/*  Section 3: 3D Card Tilt Effect (CSS-only)                         */
/* ------------------------------------------------------------------ */

const TiltCard = memo(function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 20
    const rotateX = -((y - centerY) / centerY) * 20
    setTransform({ rotateX, rotateY })
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTransform({ rotateX: 0, rotateY: 0 })
  }, [])

  const glareAngle = useMemo(
    () => Math.atan2(transform.rotateY, -transform.rotateX) * (180 / Math.PI),
    [transform],
  )

  return (
    <div
      style={{
        perspective: 800,
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: 400,
          height: 250,
          borderRadius: 20,
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          background:
            'linear-gradient(135deg, #6366f1 0%, #818cf8 30%, #00d4ff 60%, #aa00ff 100%)',
          boxShadow: isHovered
            ? '0 30px 60px rgba(99,102,241,0.4), 0 0 40px rgba(0,212,255,0.2)'
            : '0 15px 30px rgba(99,102,241,0.2)',
        }}
      >
        {/* Holographic shimmer overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            background: isHovered
              ? `linear-gradient(${glareAngle}deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)`
              : 'none',
            transition: 'background 0.1s',
            pointerEvents: 'none',
          }}
        />
        {/* Glare spot */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            background: isHovered
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
              : 'none',
            pointerEvents: 'none',
          }}
        />
        {/* Card content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: '#fff',
            justifyContent: 'space-between',
            transform: 'translateZ(30px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase' }}>
                Virtual Card
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                3D Tilt Effect
              </div>
            </div>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="12" r="6" fill="rgba(255,255,255,0.9)" />
                <circle cx="15" cy="12" r="6" fill="rgba(255,255,255,0.6)" />
              </svg>
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
                letterSpacing: 4,
                marginBottom: 12,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              4218 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 7392
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.85 }}>
              <div>
                <div style={{ fontSize: 9, opacity: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>
                  Card Holder
                </div>
                WEBGL DESIGN STUDIO
              </div>
              <div>
                <div style={{ fontSize: 9, opacity: 0.6, textTransform: 'uppercase', marginBottom: 2 }}>
                  Expires
                </div>
                12/29
              </div>
            </div>
          </div>
        </div>
        {/* Embossed circles background */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            right: -20,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -10,
            right: -40,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  )
})

/* ------------------------------------------------------------------ */
/*  Section 4: Material Showcase                                       */
/* ------------------------------------------------------------------ */

type MaterialType = 'metallic' | 'glass' | 'wireframe' | 'normal' | 'holographic'

const MATERIAL_CONFIG: Record<
  MaterialType,
  { label: string; color: string }
> = {
  metallic: { label: 'Metallic', color: '#6366f1' },
  glass: { label: 'Glass', color: '#00d4ff' },
  wireframe: { label: 'Wireframe', color: '#aa00ff' },
  normal: { label: 'Normal Map', color: '#00ff88' },
  holographic: { label: 'Holographic', color: '#ff00aa' },
}

const MaterialSphere = memo(function MaterialSphere({
  materialType,
}: {
  materialType: MaterialType
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  const material = useMemo(() => {
    switch (materialType) {
      case 'metallic':
        return new THREE.MeshStandardMaterial({
          color: '#6366f1',
          metalness: 0.95,
          roughness: 0.1,
        })
      case 'glass':
        return new THREE.MeshPhysicalMaterial({
          color: '#00d4ff',
          metalness: 0,
          roughness: 0,
          transmission: 0.95,
          thickness: 2,
          ior: 2.33,
          clearcoat: 1,
          clearcoatRoughness: 0,
        })
      case 'wireframe':
        return new THREE.MeshStandardMaterial({
          color: '#aa00ff',
          wireframe: true,
          emissive: '#aa00ff',
          emissiveIntensity: 0.3,
        })
      case 'normal':
        return new THREE.MeshNormalMaterial({ flatShading: false })
      case 'holographic': {
        return new THREE.MeshPhysicalMaterial({
          color: '#ff00aa',
          metalness: 0.5,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          iridescence: 1,
          iridescenceIOR: 1.8,
          iridescenceThicknessRange: [100, 400],
          sheen: 1,
          sheenColor: new THREE.Color('#00ff88'),
          sheenRoughness: 0.3,
        })
      }
    }
  }, [materialType])

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1.5, 64, 64]} />
    </mesh>
  )
})

function MaterialShowcase() {
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>('metallic')
  const [displayMaterial, setDisplayMaterial] = useState<MaterialType>('metallic')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSwitch = useCallback((type: MaterialType) => {
    if (type === activeMaterial) return
    setIsTransitioning(true)
    setActiveMaterial(type)
    setTimeout(() => {
      setDisplayMaterial(type)
      setIsTransitioning(false)
    }, 200)
  }, [activeMaterial])

  const buttons = useMemo(
    () =>
      (Object.entries(MATERIAL_CONFIG) as [MaterialType, { label: string; color: string }][]).map(
        ([type, config]) => (
          <button
            key={type}
            onClick={() => handleSwitch(type)}
            style={{
              padding: '8px 18px',
              borderRadius: 10,
              border:
                activeMaterial === type
                  ? `1.5px solid ${config.color}`
                  : '1px solid var(--color-border)',
              background:
                activeMaterial === type ? `${config.color}18` : 'var(--color-surface)',
              color: activeMaterial === type ? config.color : 'var(--color-text-secondary)',
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: activeMaterial === type ? 600 : 400,
            }}
          >
            {config.label}
          </button>
        ),
      ),
    [activeMaterial, handleSwitch],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        style={{
          width: '100%',
          height: 360,
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #f0f2ff 0%, #e8e8f0 100%)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, 2, -4]} intensity={0.5} color="#818cf8" />
          <pointLight position={[0, -3, 3]} intensity={0.5} color="#00d4ff" />
          <motion.div animate={{ scale: isTransitioning ? 0.92 : 1 }} transition={{ duration: 0.2 }}>
            <MaterialSphere materialType={displayMaterial} />
          </motion.div>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {buttons}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5: Floating Geometry Scene                                 */
/* ------------------------------------------------------------------ */

interface FloatingShapeProps {
  geometry: THREE.BufferGeometry
  color: string
  position: [number, number, number]
  phase: number
  speed: number
  scale: number
}

const FloatingShape = memo(function FloatingShape({
  geometry,
  color,
  position,
  phase,
  speed,
  scale,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.4,
        roughness: 0.3,
        transparent: true,
        opacity: 0.9,
      }),
    [color],
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * speed * 0.3
    meshRef.current.rotation.z = t * speed * 0.2
    meshRef.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.35
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
    />
  )
})

const FloatingScene = memo(function FloatingScene() {
  const shapes = useMemo(() => {
    const geos: { geo: THREE.BufferGeometry; color: string; pos: [number, number, number]; phase: number; speed: number; scale: number }[] = [
      {
        geo: new THREE.BoxGeometry(0.7, 0.7, 0.7),
        color: '#00d4ff',
        pos: [-4, 0.5, -1],
        phase: 0,
        speed: 0.6,
        scale: 1,
      },
      {
        geo: new THREE.SphereGeometry(0.45, 32, 32),
        color: '#ff00aa',
        pos: [-2.2, -0.3, 0.5],
        phase: 1.2,
        speed: 0.8,
        scale: 1,
      },
      {
        geo: new THREE.TorusGeometry(0.4, 0.15, 16, 48),
        color: '#6366f1',
        pos: [0, 0.6, -0.5],
        phase: 2.4,
        speed: 0.7,
        scale: 1.1,
      },
      {
        geo: new THREE.ConeGeometry(0.4, 0.8, 6),
        color: '#00ff88',
        pos: [2.2, -0.2, 0.8],
        phase: 3.6,
        speed: 0.5,
        scale: 1,
      },
      {
        geo: new THREE.DodecahedronGeometry(0.45),
        color: '#aa00ff',
        pos: [4, 0.3, -0.3],
        phase: 4.8,
        speed: 0.65,
        scale: 0.9,
      },
      {
        geo: new THREE.CylinderGeometry(0.3, 0.3, 0.7, 8),
        color: '#818cf8',
        pos: [-3, -0.5, 1],
        phase: 5.5,
        speed: 0.55,
        scale: 0.85,
      },
      {
        geo: new THREE.OctahedronGeometry(0.4),
        color: '#00d4ff',
        pos: [1, -0.6, 1.2],
        phase: 0.8,
        speed: 0.75,
        scale: 0.95,
      },
      {
        geo: new THREE.TorusKnotGeometry(0.3, 0.1, 64, 8),
        color: '#ff00aa',
        pos: [3, 0.8, 0.3],
        phase: 2,
        speed: 0.45,
        scale: 0.8,
      },
    ]
    return geos
  }, [])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#818cf8" />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#00d4ff" />
      {shapes.map((s, i) => (
        <FloatingShape
          key={i}
          geometry={s.geo}
          color={s.color}
          position={s.pos}
          phase={s.phase}
          speed={s.speed}
          scale={s.scale}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
})

/* ------------------------------------------------------------------ */
/*  Page layout                                                        */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function ThreeDPage() {
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    setCanvasReady(true)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--color-bg)',
        padding: '0 0 80px',
      }}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          textAlign: 'center',
          paddingTop: 80,
          paddingBottom: 48,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 18,
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
            marginBottom: 24,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4L28 12V24L16 28L4 24V12L16 4Z"
              stroke="var(--color-accent-light)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M16 4V16M16 16L28 12M16 16L4 12M16 16V28"
              stroke="var(--color-neon-blue)"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 44,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}
        >
          3D & WebGL
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            maxWidth: 520,
            margin: '0 auto 20px',
          }}
        >
          Interactive 3D experiences powered by React Three Fiber and Three.js.
          Explore particle systems, materials, and spatial interfaces.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Three.js', 'R3F', 'Particles', 'Materials', 'Spatial UI'].map((tag) => (
            <span
              key={tag}
              style={{
                padding: '5px 13px',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {/* Section 1: Particle Universe */}
        <motion.section
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={SECTION_TITLE}>Particle Universe</div>
            <div style={{ ...SECTION_DESC, marginTop: 4 }}>
              5,000 particles orbiting in 3D space. Move your mouse to warp the field.
              Colors shift from accent indigo to neon blue based on orbital radius.
            </div>
          </div>
          <div style={{ ...GLASS_CARD, height: 400 }}>
            {canvasReady && (
              <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #111128 100%)' }}
                gl={{ antialias: true, alpha: false }}
              >
                <Particles />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
              </Canvas>
            )}
          </div>
        </motion.section>

        {/* Section 2: Interactive 3D Objects */}
        <motion.section
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={SECTION_TITLE}>Interactive 3D Objects</div>
            <div style={{ ...SECTION_DESC, marginTop: 4 }}>
              Drag to rotate each shape. Four geometries with distinct material styles
              from metallic to glass to wireframe overlays.
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            <GeometryCard title="Torus Knot" materialDesc="MeshStandardMaterial &middot; Metallic">
              <MetallicTorusKnot />
            </GeometryCard>
            <GeometryCard title="Icosahedron" materialDesc="MeshNormalMaterial &middot; Flat Shading">
              <NormalIcosahedron />
            </GeometryCard>
            <GeometryCard title="Octahedron" materialDesc="MeshPhongMaterial &middot; Wireframe Overlay">
              <WireframeOctahedron />
            </GeometryCard>
            <GeometryCard title="Sphere" materialDesc="MeshPhysicalMaterial &middot; Transmission Glass">
              <GlassSphere />
            </GeometryCard>
          </div>
        </motion.section>

        {/* Section 3: 3D Card Tilt Effect */}
        <motion.section
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <div style={{ marginBottom: 8 }}>
            <div style={SECTION_TITLE}>3D Card Tilt Effect</div>
            <div style={{ ...SECTION_DESC, marginTop: 4 }}>
              Pure CSS perspective transforms and holographic shimmer. No WebGL
              needed -- just mouse tracking with spring physics.
            </div>
          </div>
          <div style={GLASS_CARD}>
            <TiltCard />
          </div>
        </motion.section>

        {/* Section 4: Material Showcase */}
        <motion.section
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={SECTION_TITLE}>Material Showcase</div>
            <div style={{ ...SECTION_DESC, marginTop: 4 }}>
              A single sphere cycles through five material presets. Switch between
              metallic, glass, wireframe, normal-mapped, and holographic iridescent
              finishes.
            </div>
          </div>
          <div style={GLASS_CARD}>
            <div style={{ padding: 24 }}>
              <MaterialShowcase />
            </div>
          </div>
        </motion.section>

        {/* Section 5: Floating Geometry Scene */}
        <motion.section
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
        >
          <div style={{ marginBottom: 16 }}>
            <div style={SECTION_TITLE}>Floating Geometry Scene</div>
            <div style={{ ...SECTION_DESC, marginTop: 4 }}>
              Eight geometric shapes at varying depths bob and rotate with
              sine-wave motion. Neon palette on a soft gradient backdrop.
            </div>
          </div>
          <div style={{ ...GLASS_CARD, height: 300 }}>
            {canvasReady && (
              <Canvas
                camera={{ position: [0, 1, 6], fov: 55 }}
                style={{ background: 'linear-gradient(180deg, #f0f2ff 0%, #e4e6f0 100%)' }}
                gl={{ antialias: true, alpha: false }}
              >
                <FloatingScene />
              </Canvas>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
