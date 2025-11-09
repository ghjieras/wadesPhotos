// Layout 1: 左邊內容+主圖，右邊畫廊網格
export default function ContentGalleryLayout({ section, pageOffset, renderImage, addToRefs }) {
  const { content, images } = section

  return (
    <div className="spread">
      {/* Left Page */}
      <div className="page page-left">
        <div className="page-number">{pageOffset + 1}</div>

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
          {renderImage(section.id, images.main, content.title, 'main')}
        </div>
      </div>

      {/* Right Page */}
      <div className="page page-right">
        <div className="page-number">{pageOffset + 2}</div>

        <div className="gallery-grid">
          <div className="image-placeholder gallery-image large" ref={addToRefs}>
            {renderImage(section.id, images.gallery[0], 'Gallery 1', 'gallery')}
          </div>
          <div className="image-placeholder gallery-image medium" ref={addToRefs}>
            {renderImage(section.id, images.gallery[1], 'Gallery 2', 'gallery')}
          </div>
          <div className="image-placeholder gallery-image medium" ref={addToRefs}>
            {renderImage(section.id, images.gallery[2], 'Gallery 3', 'gallery')}
          </div>

          {content.rightContent && (
            <div className="content-block right-content">
              {content.rightContent.heading && (
                <h3 className="content-heading">{content.rightContent.heading}</h3>
              )}
              {content.rightContent.text?.map((paragraph, i) => (
                <p key={i} className="content-text">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
