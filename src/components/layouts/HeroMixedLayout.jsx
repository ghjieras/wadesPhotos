// Layout 4: Section-04 的混合佈局
export default function HeroMixedLayout({ section, pageOffset, renderImage, addToRefs }) {
  const { content, images } = section

  return (
    <div className="spread">
      {/* Left Page */}
      <div className="page page-left">
        <div className="page-number">{pageOffset + 1}</div>

        <div className="image-placeholder main-image full-bleed" ref={addToRefs}>
          {renderImage(section.id, images.hero, 'Hero', 'hero')}
        </div>

        {content.articleContent && (
          <div className="content-block article-content">
            <h3 className="content-heading">{content.articleContent.heading}</h3>
            {content.articleContent.text.map((paragraph, i) => (
              <p key={i} className="content-text">{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {/* Right Page */}
      <div className="page page-right">
        <div className="page-number">{pageOffset + 2}</div>

        <div className="mixed-layout">
          <div className="grid-layout-mixed">
            {content.rightContent && (
              <div className="content-block top-content">
                {content.rightContent.heading && (
                  <p className="section-label">{content.rightContent.heading}</p>
                )}
                {content.rightContent.text?.map((paragraph, i) => (
                  <p key={i} className="content-text">{paragraph}</p>
                ))}
              </div>
            )}

            <div className="image-placeholder gallery-image tall" ref={addToRefs}>
              {renderImage(section.id, images.gallery[0], 'Gallery 1', 'gallery')}
            </div>
            <div className="image-placeholder gallery-image medium" ref={addToRefs}>
              {renderImage(section.id, images.gallery[1], 'Gallery 2', 'gallery')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
