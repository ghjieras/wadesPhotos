import { useEffect, useRef } from 'react'
import './App.css'
import { LAYOUT_TYPES, sectionConfig } from './config/sectionConfig'
import { resolveImagePath } from './utils/imageUtils'
import LazyImage from './components/LazyImage'

// Layout Components
import ContentGalleryLayout from './components/layouts/ContentGalleryLayout'
import HeroArticleLayout from './components/layouts/HeroArticleLayout'
import ContentGalleryAltLayout from './components/layouts/ContentGalleryAltLayout'
import HeroMixedLayout from './components/layouts/HeroMixedLayout'

// Layout Components Map - 數據驅動設計，消除條件分支
const LAYOUT_COMPONENTS = {
  [LAYOUT_TYPES.CONTENT_GALLERY]: ContentGalleryLayout,
  [LAYOUT_TYPES.HERO_ARTICLE]: HeroArticleLayout,
  [LAYOUT_TYPES.CONTENT_GALLERY_ALT]: ContentGalleryAltLayout,
  [LAYOUT_TYPES.HERO_MIXED]: HeroMixedLayout
}

function App() {
  const imageRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const currentRefs = imageRefs.current

    currentRefs.forEach((img) => {
      if (img) observer.observe(img)
    })

    return () => {
      currentRefs.forEach((img) => {
        if (img) observer.unobserve(img)
      })
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el)
    }
  }

  // 統一的圖片渲染邏輯 - 消除重複的 IIFE
  const renderImage = (sectionId, imageName, alt, imageType) => {
    if (!imageName) {
      return <span className="image-label">{imageType}</span>
    }

    const imagePath = resolveImagePath(sectionId, imageName)

    return (
      <LazyImage
        imagePath={imagePath}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-logo">Wade's Photography Story</h1>
      </header>

      {sectionConfig.map((section, index) => {
        const LayoutComponent = LAYOUT_COMPONENTS[section.layoutType]
        const pageOffset = index * 2

        return (
          <div key={section.id} className="spread-container">
            <LayoutComponent
              section={section}
              pageOffset={pageOffset}
              renderImage={renderImage}
              addToRefs={addToRefs}
            />
          </div>
        )
      })}

      <footer className="portfolio-footer">
        <p>Wade 2025</p>
      </footer>
    </div>
  )
}

export default App
