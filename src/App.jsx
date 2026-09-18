import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: 1, name: 'ARC TEE 001', category: 'T-SHIRTS', price: 95, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'NORTH TEE', category: 'T-SHIRTS', price: 110, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'CORE HEAVY TEE', category: 'T-SHIRTS', price: 120, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'VECTOR HOODIE', category: 'HOODIES', price: 180, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'SYSTEM HOODIE', category: 'HOODIES', price: 210, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'ZERO ZIP', category: 'HOODIES', price: 220, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'ARC SHELL', category: 'JACKETS', price: 340, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'NORTH BOMBER', category: 'JACKETS', price: 390, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'FIELD JACKET', category: 'JACKETS', price: 360, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'ARC TROUSER', category: 'PANTS', price: 210, image: 'https://images.unsplash.com/photo-1506629905607-d9e3b9d6e3e0?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'WIDE TECH PANT', category: 'PANTS', price: 240, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'METAL CAP', category: 'ACCESSORIES', price: 75, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85' },
]

const scenes = [
  {
    kicker: '01 / ARRIVAL',
    title: 'ENTER',
    accent: 'THE NORTH.',
    text: 'A new language for modern menswear. Designed around movement, structure and restraint.',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1500&q=85',
  },
  {
    kicker: '02 / SYSTEM',
    title: 'BUILT',
    accent: 'FOR MOTION.',
    text: 'Technical silhouettes meet everyday essentials. Every layer has a purpose.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1500&q=85',
  },
  {
    kicker: '03 / FORM',
    title: 'CUT',
    accent: 'WITH INTENT.',
    text: 'Clean proportions, controlled volume and materials chosen for daily movement.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=85',
  },
  {
    kicker: '04 / LAYER',
    title: 'MOVE',
    accent: 'THROUGH SPACE.',
    text: 'Outer layers, heavyweight essentials and engineered details create the complete system.',
    image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1500&q=85',
  },
  {
    kicker: '05 / AFTER DARK',
    title: 'NIGHT',
    accent: 'HAS A FORM.',
    text: 'A darker expression of the collection. Minimal, sharp and built for the city.',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1500&q=85',
  },
  {
    kicker: '06 / XCSHO',
    title: 'FIND',
    accent: 'YOUR FORM.',
    text: 'The collection is now open. Explore the pieces that define the system.',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1500&q=85',
  },
]

function ParticleField() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  const count = 1800
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 22
    positions[i3 + 1] = (Math.random() - 0.5) * 16
    positions[i3 + 2] = (Math.random() - 0.5) * 18
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.28} />
    </points>
  )
}

function RingField() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.025
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12
  })

  return (
    <group ref={ref}>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2 + i * 0.08, i * 0.14, 0]}
          position={[0, 0, -2 - i * 0.7]}
          scale={1 + i * 0.32}
        >
          <torusGeometry args={[2.2, 0.008, 8, 100]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.08 - i * 0.006}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime

    state.camera.position.x = Math.sin(t * 0.16) * 0.45
    state.camera.position.y = Math.cos(t * 0.13) * 0.3
    state.camera.position.z = 7 + Math.sin(t * 0.11) * 0.6

    state.camera.lookAt(
      Math.sin(t * 0.12) * 0.25,
      Math.cos(t * 0.16) * 0.2,
      -1
    )
  })

  return null
}

function World() {
  return (
    <>
      <color attach="background" args={['#030303']} />
      <fog attach="fog" args={['#030303', 7, 22]} />

      <ambientLight intensity={0.25} />

      <pointLight position={[4, 3, 3]} intensity={18} />
      <pointLight position={[-5, -1, 2]} intensity={12} />
      <pointLight position={[0, 5, -5]} intensity={15} />

      <Environment preset="night" />

      <ParticleField />
      <RingField />
      <CameraRig />
    </>
  )
}

function CinematicStage({ stageRef }) {
  const sceneRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenesEls = sceneRefs.current.filter(Boolean)

      gsap.set(scenesEls, { autoAlpha: 0 })
      gsap.set(scenesEls[0], { autoAlpha: 1 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'cinematic',
          trigger: stageRef.current,
          start: 'top top',
          end: '+=6200',
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      })

      scenes.forEach((scene, index) => {
        const current = scenesEls[index]
        const next = scenesEls[index + 1]

        if (!current) return

        const image = current.querySelector('.scene-image')
        const copy = current.querySelector('.scene-copy')
        const kicker = current.querySelector('.scene-kicker')
        const title = current.querySelector('h2')
        const text = current.querySelector('p')

        gsap.set([copy, kicker, title, text], { willChange: 'transform, opacity' })

        timeline
          .to(image, {
            scale: 1.12,
            x: index % 2 === 0 ? -25 : 25,
            duration: 1.8,
            ease: 'none',
          }, index)
          .to(copy, {
            y: -18,
            duration: 1.8,
            ease: 'none',
          }, index)
          .to(image, {
            filter: 'grayscale(65%) contrast(1.15)',
            duration: 0.8,
          }, index + 0.7)
          .to(current, {
            autoAlpha: 0,
            scale: 1.03,
            duration: 0.7,
            ease: 'power2.inOut',
          }, index + 1.35)

        if (next) {
          const nextImage = next.querySelector('.scene-image')
          const nextCopy = next.querySelector('.scene-copy')

          timeline.fromTo(
            next,
            {
              autoAlpha: 0,
              scale: 1.06,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
            },
            index + 1.05
          )

          timeline.fromTo(
            nextImage,
            {
              scale: 1.16,
              x: index % 2 === 0 ? 30 : -30,
            },
            {
              scale: 1,
              x: 0,
              duration: 1.4,
              ease: 'power3.out',
            },
            index + 1.05
          )

          timeline.fromTo(
            nextCopy,
            {
              y: 35,
            },
            {
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
            },
            index + 1.1
          )
        }
      })
    }, stageRef)

    return () => ctx.revert()
  }, [stageRef])

  return (
    <div className="cinematic-content">
      {scenes.map((scene, index) => (
        <div
          className={`scene scene-${index}`}
          key={scene.kicker}
          ref={(el) => (sceneRefs.current[index] = el)}
        >
          <div
            className="scene-image"
            style={{ backgroundImage: `url(${scene.image})` }}
          />

          <div className="scene-copy">
            <div className="scene-kicker">
              {scene.kicker}
            </div>

            <h2>
              {scene.title}
              <em>{scene.accent}</em>
            </h2>

            <p>{scene.text}</p>
          </div>
        </div>
      ))}

      <div className="cinematic-ui">
        <span>SCROLL</span>
        <div className="scroll-line" />
        <span>01—06</span>
      </div>
    </div>
  )
}

function CartDrawer({ cart, setCart, onClose }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const updateQty = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + amount) } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  return (
    <aside className="cart-drawer">
      <div className="cart-head">
        <div>
          <span>BAG</span>
          <h3>YOUR SELECTION</h3>
        </div>
        <button onClick={onClose}>×</button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span>00</span>
          <p>Your bag is empty.</p>
          <small>Explore the collection below.</small>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>CAD ${item.price}</span>

                  <div className="qty">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <b>{item.qty}</b>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>SUBTOTAL</span>
            <strong>CAD ${total}</strong>
          </div>

          <button
            className="checkout"
            onClick={() => alert('Demo checkout — connect Stripe or Shopify here.')}
          >
            CHECKOUT →
          </button>
        </>
      )}
    </aside>
  )
}

function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div
          className="modal-image"
          style={{ backgroundImage: `url(${product.image})` }}
        />

        <div className="modal-info">
          <span>{product.category}</span>
          <h2>{product.name}</h2>
          <p>
            A XCSHO essential designed around clean structure,
            everyday movement and modern utility.
          </p>

          <strong>CAD ${product.price}</strong>

          <div className="sizes">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button key={size}>{size}</button>
            ))}
          </div>

          <button className="modal-add" onClick={() => onAdd(product)}>
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  )
}

function Shop({ setCart, setSelectedProduct }) {
  const [category, setCategory] = useState('ALL')

  const categories = [
    'ALL',
    'T-SHIRTS',
    'HOODIES',
    'JACKETS',
    'PANTS',
    'ACCESSORIES',
  ]

  const filtered =
    category === 'ALL'
      ? products
      : products.filter((product) => product.category === category)

  useEffect(() => {
    const cards = gsap.utils.toArray('.product-card')
    const section = document.querySelector('.shop-section')

    if (!section || !cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-section .section-header',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        '.category-bar',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: .8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      )

      cards.forEach((card, index) => {
        const image = card.querySelector('.product-image')
        const img = card.querySelector('img')

        gsap.fromTo(
          card,
          {
            y: 120,
            rotateX: 12,
            rotateY: index % 2 === 0 ? -5 : 5,
            scale: .88,
            opacity: 0,
          },
          {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: index * .035,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        )

        if (image && img) {
          gsap.to(img, {
            yPercent: -8,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })

          gsap.to(image, {
            rotateY: index % 2 === 0 ? 2 : -2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: 1,
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [category])

  const addToBag = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }

      return [...current, { ...product, qty: 1 }]
    })
  }

  return (
    <section className="shop-section" id="shop">
      <div className="section-header">
        <div>
          <span>02 / COLLECTION</span>
          <h2>THE SHOP<span>.</span></h2>
        </div>

        <p>
          Essential pieces. Technical layers.
          <br />
          One complete system.
        </p>
      </div>

      <div className="category-bar">
        {categories.map((item) => (
          <button
            className={category === item ? 'active' : ''}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <article
            className="product-card"
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85" }} />
              <span>VIEW +</span>
            </div>

            <div className="product-meta">
              <div>
                <small>{product.category}</small>
                <h3>{product.name}</h3>
              </div>

              <strong>CAD ${product.price}</strong>
            </div>

            <button
              className="add-button"
              onClick={(e) => {
                e.stopPropagation()
                addToBag(product)
              }}
            >
              ADD TO BAG +
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Lookbook() {
  const images = [
    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1516257984-b1b4d3060e3e?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=85',
  ]

  return (
    <section className="lookbook-section" id="lookbook">
      <div className="section-header">
        <div>
          <span>03 / VISUAL SYSTEM</span>
          <h2>LOOKBOOK<span>.</span></h2>
        </div>

        <p>TORONTO / 2026</p>
      </div>

      <div className="lookbook-grid">
        {images.map((image, index) => (
          <div className={`look-image look-${index}`} key={image}>
            <img src={image} alt={`XCSHO look ${index + 1}`} />
            <span>LOOK / 0{index + 1}</span>
          </div>
        ))}
      </div>
    </section>
  )
}


function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message received — this demo form is ready to connect to your email service.')
    e.currentTarget.reset()
  }

  return (
    <section className="contact-section" id="contact-page">
      <div className="contact-top">
        <div>
          <span>05 / CONTACT</span>
          <h2>LET'S<br /><em>TALK.</em></h2>
        </div>

        <p>
          Questions about the collection,
          collaborations or XCSHO?
          Send us a message.
        </p>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            NAME
            <input type="text" placeholder="Your name" required />
          </label>

          <label>
            EMAIL
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label>
            SUBJECT
            <input type="text" placeholder="What can we help with?" required />
          </label>

          <label>
            MESSAGE
            <textarea placeholder="Write your message..." rows="6" required />
          </label>

          <button type="submit">
            SEND MESSAGE →
          </button>
        </form>

        <div className="contact-info">
          <div>
            <span>EMAIL</span>
            <a href="mailto:hello@northarc.com">hello@northarc.com</a>
          </div>

          <div>
            <span>STUDIO</span>
            <p>
              TORONTO<br />
              CANADA
            </p>
          </div>

          <div>
            <span>FOLLOW</span>
            <div className="social-links">
              <a href="#" onClick={(e) => e.preventDefault()}>INSTAGRAM ↗</a>
              <a href="#" onClick={(e) => e.preventDefault()}>PINTEREST ↗</a>
              <a href="#" onClick={(e) => e.preventDefault()}>X ↗</a>
            </div>
          </div>

          <div className="contact-note">
            <span>XCSHO</span>
            <p>FORM IN MOTION.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Journal() {
  return (
    <section className="journal-section" id="journal">
      <div className="section-header">
        <div>
          <span>04 / JOURNAL</span>
          <h2>FIELD NOTES<span>.</span></h2>
        </div>
      </div>

      <div className="journal-grid">
        <article>
          <span>01 / MATERIAL</span>
          <h3>WHY WE BUILD IN LAYERS.</h3>
          <p>
            Clothing becomes more useful when every layer works independently
            and together.
          </p>
          <button>READ ARTICLE →</button>
        </article>

        <article>
          <span>02 / CITY</span>
          <h3>TORONTO AFTER DARK.</h3>
          <p>
            A visual study of movement through the city after the lights change.
          </p>
          <button>READ ARTICLE →</button>
        </article>

        <article>
          <span>03 / PROCESS</span>
          <h3>THE XCSHO SYSTEM.</h3>
          <p>
            From silhouette to finish, every decision starts with function.
          </p>
          <button>READ ARTICLE →</button>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  const stageRef = useRef(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const cards = document.querySelectorAll('.product-card')

    const animations = []

    cards.forEach((card, index) => {
      const image = card.querySelector('.product-image img')

      const animation = gsap.fromTo(
        card,
        {
          y: 45,
          rotateX: 5,
          rotateY: index % 2 === 0 ? -2 : 2,
          transformPerspective: 1000,
          opacity: 0.65,
        },
        {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      )

      const imageAnimation = gsap.fromTo(
        image,
        {
          scale: 1.12,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 1,
          },
        }
      )

      animations.push(animation, imageAnimation)
    })

    return () => {
      animations.forEach((animation) => animation.scrollTrigger?.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const home = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const addFromModal = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }

      return [...current, { ...product, qty: 1 }]
    })

    setSelectedProduct(null)
    setCartOpen(true)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <main>
      <header className="nav">
        <button className="brand" onClick={home}>
          NORTH<span>//</span>ARC
        </button>

        <nav>
          <button onClick={home}>HOME</button>
          <button onClick={() => goTo('shop')}>SHOP</button>
          <button onClick={() => goTo('lookbook')}>LOOKBOOK</button>
          <button onClick={() => goTo('journal')}>JOURNAL</button>
          <button onClick={() => goTo('contact-page')}>CONTACT</button>
        </nav>

        <button className="bag-button" onClick={() => setCartOpen(true)}>
          BAG [{String(cartCount).padStart(2, '0')}]
        </button>
      </header>

      <section className="experience" ref={stageRef}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 48 }}
          dpr={[1, 1.35]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <World />
        </Canvas>

        <CinematicStage stageRef={stageRef} />

        <div className="brand-mark">
          <span>XCSHO</span>
          <small>TORONTO / CANADA</small>
        </div>

        <div className="edition-mark">
          <span>COLLECTION 001</span>
          <span>EST. 2026</span>
        </div>
      </section>

      <Shop
        setCart={setCart}
        setSelectedProduct={setSelectedProduct}
      />

      <Lookbook />
      <Journal />
      <Contact />

      <footer>
        <div>
          <span>XCSHO</span>
          <h2>FORM<br /><em>IN MOTION.</em></h2>
        </div>

        <div className="footer-links">
          <button onClick={home}>HOME</button>
          <button onClick={() => goTo('shop')}>SHOP</button>
          <button onClick={() => goTo('lookbook')}>LOOKBOOK</button>
          <button onClick={() => goTo('journal')}>JOURNAL</button>
        </div>

        <div className="footer-bottom">
          <span>TORONTO / CANADA</span>
          <span>© 2026 XCSHO</span>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          onClose={() => setCartOpen(false)}
        />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addFromModal}
      />
    </main>
  )
}
