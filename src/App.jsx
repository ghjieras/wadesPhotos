import { useEffect, useRef } from 'react'
import './App.css'
import imageConfig from './assets/images/imageConfig'
import contentConfig from './assets/content/contentConfig'

// 使用 import.meta.glob 預載入所有圖片
const imageModules = import.meta.glob('./assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true, import: 'default' })


// 動態載入圖片的輔助函數
const loadImage = (sectionId, imageName) => {
  const sectionKey = `section-${String(sectionId).padStart(2, '0')}`
  const imagePath = `./assets/images/${sectionKey}/${imageName}`
  const imageUrl = imageModules[imagePath]
  if (!imageUrl) {
    console.error(`  → 可用的圖片:`, Object.keys(imageModules).filter(k => k.includes(sectionKey)))
  }
  return imageUrl
}

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

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img)
    })

    return () => {
      imageRefs.current.forEach((img) => {
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
                      const imgSrc = config?.main ? loadImage(section.id, config.main) : null
                      return imgSrc ? (
                        <img src={imgSrc} alt={content.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                      const imgSrc = config?.hero ? loadImage(section.id, config.hero) : null
                      return imgSrc ? (
                        <img src={imgSrc} alt={content.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                          {galleries[0] && loadImage(section.id, galleries[0]) ? (
                            <img src={loadImage(section.id, galleries[0])} alt="Gallery 1" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <span className="image-label">Gallery 1</span>
                          )}
                        </div>
                        <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                          {galleries[1] && loadImage(section.id, galleries[1]) ? (
                            <img src={loadImage(section.id, galleries[1])} alt="Gallery 2" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <span className="image-label">Gallery 2</span>
                          )}
                        </div>
                        <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                          {galleries[2] && loadImage(section.id, galleries[2]) ? (
                            <img src={loadImage(section.id, galleries[2])} alt="Gallery 3" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                              {galleries[0] && loadImage(section.id, galleries[0]) ? (
                                <img src={loadImage(section.id, galleries[0])} alt="Gallery 1" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                              ) : (
                                <span className="image-label">Gallery 1</span>
                              )}
                            </div>
                            <div className="image-placeholder gallery-image small" ref={addToRefs}>
                              {galleries[1] && loadImage(section.id, galleries[1]) ? (
                                <img src={loadImage(section.id, galleries[1])} alt="Gallery 2" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                              {galleries[0] && loadImage(section.id, galleries[0]) ? (
                                <img src={loadImage(section.id, galleries[0])} alt="Gallery 1" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                              ) : (
                                <span className="image-label">Gallery 1</span>
                              )}
                            </div>
                            <div className="image-placeholder gallery-image medium" ref={addToRefs}>
                              {galleries[1] && loadImage(section.id, galleries[1]) ? (
                                <img src={loadImage(section.id, galleries[1])} alt="Gallery 2" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                          const imgSrc = galleries[0] ? loadImage(section.id, galleries[0]) : null

                          return imgSrc ? (
                            <img src={imgSrc} alt="Gallery" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
