"use client"

import React, { useId, useEffect, useState } from "react"
import { gsap } from "gsap"
import { getGlobalTimeline, queuePlay } from "@/animations/globalTimeline"
import { CIRCULAR_TEXT_FADE_START, CIRCULAR_TEXT_LETTERS_DELAY } from "@/animations/timing"

type CircularTextProps = {
  text: string
  radius?: number
  className?: string
  fontSize?: number
  startAngleDeg?: number
  clockwise?: boolean
  strokeColor?: string
  strokeWidth?: number
  textColor?: string
  fontFamily?: string
  fontWeight?: number | string
  spread?: boolean
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs'
  padding?: number
  gap?: number
  // Nouvelles props pour l'animation
  animate?: boolean
  animationDelay?: number // Délai entre chaque lettre en ms
  animationDuration?: number // Durée de l'animation d'une lettre en ms
  startAnimation?: boolean // Pour contrôler le début de l'animation
  // Prop pour la rotation
  rotate?: boolean // Active/désactive la rotation continue
  rotationSpeed?: number // Vitesse de rotation en secondes (défaut: 20s)
}

export default function CircularText({
  text,
  radius = 220,
  className = "",
  fontSize = 14,
  startAngleDeg = -90,
  clockwise = true,
  strokeColor = "hsl(0 100% 50% / 0.5)",
  strokeWidth = 0,
  textColor = "currentColor",
  fontFamily = "var(--font-red-hat), var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  fontWeight = 400,
  spread = true,
  lengthAdjust = 'spacing',
  padding,
  gap = 0,
  // Nouvelles props avec valeurs par défaut
  animate = false,
  animationDelay = 100,
  animationDuration = 300,
  startAnimation = true,
  // Props pour la rotation
  rotate = false,
  rotationSpeed = 20,
}: CircularTextProps) {
  const id = useId()
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const [startFromTimeline, setStartFromTimeline] = useState(false)
  const computedPadding = padding ?? Math.ceil(fontSize * 1.25)
  const size = radius * 2 + computedPadding * 2
  const center = radius + computedPadding
  const r = radius - strokeWidth
  const pathId = `circlePath-${id}`
  const rotationId = `rotation-${id}`
  const groupRotation = clockwise ? startAngleDeg : startAngleDeg * -1

  const d = `M ${center - r}, ${center} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`
  const circumference = Math.PI * 2 * r - gap

  // Générer les styles CSS pour la rotation
  const generateRotationStyles = () => {
    if (!rotate) return ''
    
    return `
      @keyframes rotate-${rotationId} {
        from { transform: rotate(${groupRotation}deg); }
        to { transform: rotate(${groupRotation + 360}deg); }
      }
      
      .rotating-group-${rotationId} {
        animation: rotate-${rotationId} ${rotationSpeed}s linear infinite;
        transform-origin: ${center}px ${center}px;
      }
    `
  }

  // Animation des caractères
  useEffect(() => {
    if (!animate) {
      setVisibleCharacters(text.length)
      return
    }

    // Wait for external trigger (timeline) if not ready
    if (!startAnimation || !startFromTimeline) {
      setVisibleCharacters(0)
      return
    }

    setVisibleCharacters(0)
    const interval = setInterval(() => {
      setVisibleCharacters(prev => {
        if (prev >= text.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, animationDelay)

    return () => clearInterval(interval)
  }, [text, animate, startAnimation, startFromTimeline, animationDelay])

  // Global timeline: fade in the group once Stripe and MainTitle have run, then start letters
  useEffect(() => {
    // Only when this component is present
    const tl = getGlobalTimeline()
    tl.add(gsap.fromTo(`#${rotationId}`, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }), CIRCULAR_TEXT_FADE_START)
    tl.add(() => setStartFromTimeline(true), CIRCULAR_TEXT_FADE_START + CIRCULAR_TEXT_LETTERS_DELAY)
    queuePlay()
  }, [rotationId])

  // Fonction pour créer une courbe ease-in-out pour les délais
  const easeInOutDelay = (index: number, totalLength: number, baseDelay: number) => {
    // Normaliser l'index entre 0 et 1
    const normalizedIndex = index / (totalLength - 1)
    
    // Appliquer la fonction ease-in-out : 3t² - 2t³
    const easedProgress = 15 * normalizedIndex * normalizedIndex - 2 * normalizedIndex * normalizedIndex * normalizedIndex
    
    // Appliquer le délai de base avec la courbe
    return easedProgress * baseDelay * totalLength
  }

  // Fonction pour créer le texte avec animation d'opacité par caractère
  const createAnimatedText = () => {
    if (!animate) return text
    
    const textLength = text.length
    
    return text.split('').map((char, index) => {
      const isVisible = index < visibleCharacters
      const delay = easeInOutDelay(index, textLength, animationDelay)
      
      return (
        <tspan
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction: 'ease-in-out',
            transitionDelay: `${delay}ms`
          }}
        >
          {char}
        </tspan>
      )
    })
  }

  return (
    <div className={`relative select-none ${className}`} style={{ width: size, height: size }}>
      {/* Styles CSS pour la rotation */}
      {rotate && (
        <style dangerouslySetInnerHTML={{ __html: generateRotationStyles() }} />
      )}
      
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block" style={{ overflow: "visible" }}>
        <g 
          id={rotationId}
          className={rotate ? `rotating-group-${rotationId}` : ''}
          transform={rotate ? `rotate(${groupRotation} ${center} ${center})` : `rotate(${groupRotation} ${center} ${center})`}
          style={{ opacity: 0 }}
        >
          {strokeWidth > 0 && (
            <path d={d} fill="none" strokeWidth={strokeWidth} stroke={strokeColor} />
          )}
          <text
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill={textColor}
          >
            <textPath
              href={`#${pathId}`}
              {...(spread
                ? { textLength: Math.max(0, Math.floor(circumference)) as unknown as number, lengthAdjust }
                : {})}
            >
              {createAnimatedText()}
            </textPath>
          </text>
          {/* hidden path definition used by textPath */}
          <path id={pathId} d={d} fill="none" />
        </g>
      </svg>
    </div>
  )
}


