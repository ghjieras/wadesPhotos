import { useEffect, useRef, useState } from 'react'
import './App.css'
import imageConfig from './assets/images/imageConfig'
import contentConfig from './assets/content/contentConfig'

// 使用 import.meta.glob 按需載入圖片（lazy loading）
const imageModules = import.meta.glob('./assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: false })

// LazyImage 組件：處理異步圖片加載
function LazyImage({ sectionId, imageName, alt, style, className = '' }) {
  const [src, setSrc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sectionKey = `section-${String(sectionId).padStart(2, '0')}`
    const imagePath = `./assets/images/${sectionKey}/${imageName}`
    const imageLoader = imageModules[imagePath]

    if (imageLoader) {
      imageLoader().then((module) => {
        setSrc(module.default)
        setLoading(false)
      }).catch(err => {
        console.error(`Failed to load image: ${imagePath}`, err)
        setLoading(false)
      })
    } else {
      console.error(`Image not found: ${imagePath}`)
      setLoading(false)
    }
  }, [sectionId, imageName])

  if (loading) {
    return <div className={`image-loading ${className}`} style={style} />
  }

  return src ? (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      loading="lazy"
      decoding="async"
    />
  ) : null
}

// 移除舊的 loadImage 函數（已由 LazyImage 組件取代）

// 動態載入內容的輔助函數
const loadContent = (sectionId) => {
  const sectionKey = `section-${String(sectionId).padStart(2, '0')}`
  return contentConfig[sectionKey] || {}
}

function App() {
  // 只需定義 section ID，內容從 contentConfig 讀取
  const portfolioSections = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ]

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

    // 創建當前 refs 的快照，避免 stale closure
    const currentRefs = imageRefs.current

    currentRefs.forEach((img) => {
      if (img) observer.observe(img)
    })

    return () => {
      // 使用快照中的 refs 進行清理，確保正確解綁
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

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-logo">Wade's Photography Story</h1>
      </header>

      {portfolioSections.map((section, index) => {
        const content = loadContent(section.id)
        return (
        <div key={section.id} className="spread-container">
          <div className="spread">
            {/* Left Page */}
            <div className="page page-left">
              <div className="page-number">{(index * 2) + 1}</div>

              {index % 2 === 0 ? (
                <>
                  <div className="content-block">
                    <p className="section-label">Section {String(section.id).padStart(2, '0')}</p>
                    <h2 className="section-title">{content.title}</h2>
                    <p className="section-description">{content.description}</p>

                    {content.details && (
                      <div className="details-list">
                        <div className="detail-item">
                          <span className="detail-label">Title:</span>
                          <span className="detail-value">{content.details.title}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Place:</span>
                          <span className="detail-value">{content.details.place}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Photography:</span>
                          <span className="detail-value">{content.details.photography}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Country:</span>
                          <span className="detail-value">{content.details.country}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Creation Time:</span>
                          <span className="detail-value">{content.details.creationTime}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="image-placeholder main-image" ref={addToRefs}>
                    {(() => {
                      const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                      const config = imageConfig[sectionKey]
                      return config?.main ? (
                        <LazyImage
                          sectionId={section.id}
                          imageName={config.main}
                          alt={content.title}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                      ) : (
                        <span className="image-label">Main Image</span>
                      )
                    })()}
                  </div>
                </>
              ) : (
                <>
                  <div className="image-placeholder main-image full-bleed" ref={addToRefs}>
                    {(() => {
                      const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                      const config = imageConfig[sectionKey]
                      return config?.hero ? (
                        <LazyImage
                          sectionId={section.id}
                          imageName={config.hero}
                          alt={content.title}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                      ) : (
                        <span className="image-label">Hero Image</span>
                      )
                    })()}
                  </div>
                  {content.articleContent && (
                    <div className="content-block article-content">
                      <h3 className="content-heading">{content.articleContent.heading}</h3>
                      {content.articleContent.text.map((paragraph, i) => (
                        <p key={i} className="content-text">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Page */}
            <div className="page page-right">
              <div className="page-number">{(index * 2) + 2}</div>

              {index % 2 === 0 ? (
                <div className="gallery-grid">
                  {(() => {
                    const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                    const config = imageConfig[sectionKey]
                    const galleries = config?.gallery || []

                    return (
                      <>
                        <div className="image-placeholder gallery-image large" ref={addToRefs}>
                          {galleries[0] ? (
                            <LazyImage
                              sectionId={section.id}
                              imageName={galleries[0]}
                              alt="Gallery 1"
                              style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                          ) : (
                            <span className="image-label">Gallery 1</span>
                          )}
                        </div>
                        <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                          {galleries[1] ? (
                            <LazyImage
                              sectionId={section.id}
                              imageName={galleries[1]}
                              alt="Gallery 2"
                              style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                          ) : (
                            <span className="image-label">Gallery 2</span>
                          )}
                        </div>
                        <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                          {galleries[2] ? (
                            <LazyImage
                              sectionId={section.id}
                              imageName={galleries[2]}
                              alt="Gallery 3"
                              style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                          ) : (
                            <span className="image-label">Gallery 3</span>
                          )}
                        </div>
                      </>
                    )
                  })()}
                  {content.rightContent && (
                    <div className="content-block right-content">
                      {content.rightContent.heading && (
                        <h3 className="content-heading">{content.rightContent.heading}</h3>
                      )}
                      {content.rightContent.text && content.rightContent.text.map((paragraph, i) => (
                        <p key={i} className="content-text">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mixed-layout">
                  {index === 1 ? (
                    <div className="grid-layout-vertical">
                      {(() => {
                        const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                        const config = imageConfig[sectionKey]
                        const galleries = config?.gallery || []

                        return (
                          <>
                            <div className="image-placeholder gallery-image small" ref={addToRefs}>
                              {galleries[0] ? (
                                <LazyImage
                                  sectionId={section.id}
                                  imageName={galleries[0]}
                                  alt="Gallery 1"
                                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                              ) : (
                                <span className="image-label">Gallery 1</span>
                              )}
                            </div>
                            <div className="image-placeholder gallery-image small" ref={addToRefs}>
                              {galleries[1] ? (
                                <LazyImage
                                  sectionId={section.id}
                                  imageName={galleries[1]}
                                  alt="Gallery 2"
                                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                              ) : (
                                <span className="image-label">Gallery 2</span>
                              )}
                            </div>
                          </>
                        )
                      })()}
                      {content.rightContent && content.rightContent.text && (
                        <div className="content-block inline-content">
                          {content.rightContent.text.map((paragraph, i) => (
                            <p key={i} className="content-text">{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : index === 3 ? (
                    <div className="grid-layout-mixed">
                      {content.rightContent && (
                        <div className="content-block top-content">
                          {content.rightContent.heading && (
                            <p className="section-label">{content.rightContent.heading}</p>
                          )}
                          {content.rightContent.text && content.rightContent.text.map((paragraph, i) => (
                            <p key={i} className="content-text">{paragraph}</p>
                          ))}
                        </div>
                      )}
                      {(() => {
                        const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                        const config = imageConfig[sectionKey]
                        const galleries = config?.gallery || []

                        return (
                          <>
                            <div className="image-placeholder gallery-image tall" ref={addToRefs}>
                              {galleries[0] ? (
                                <LazyImage
                                  sectionId={section.id}
                                  imageName={galleries[0]}
                                  alt="Gallery 1"
                                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                              ) : (
                                <span className="image-label">Gallery 1</span>
                              )}
                            </div>
                            <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                              {galleries[1] ? (
                                <LazyImage
                                  sectionId={section.id}
                                  imageName={galleries[1]}
                                  alt="Gallery 2"
                                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                              ) : (
                                <span className="image-label">Gallery 2</span>
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  ) : (
                    <div className="gallery-grid-alt">
                      <div className="image-placeholder gallery-image" ref={addToRefs}>
                        {(() => {
                          const sectionKey = `section-${String(section.id).padStart(2, '0')}`
                          const config = imageConfig[sectionKey]
                          const galleries = config?.gallery || []

                          return galleries[0] ? (
                            <LazyImage
                              sectionId={section.id}
                              imageName={galleries[0]}
                              alt="Gallery"
                              style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                          ) : (
                            <span className="image-label">Gallery</span>
                          )
                        })()}
                      </div>
                      {content.rightContent && content.rightContent.text && (
                        <div className="content-block">
                          {content.rightContent.text.map((paragraph, i) => (
                            <p key={i} className="content-text">{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
