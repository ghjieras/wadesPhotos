import { useEffect, useState } from 'react'
import { loadImageModule } from '../utils/imageUtils'

// LazyImage 組件：只負責異步加載和顯示
// 不關心路徑結構，不關心 section ID
export default function LazyImage({ imagePath, alt, style, className = '' }) {
  const [src, setSrc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImageModule(imagePath).then((url) => {
      setSrc(url)
      setLoading(false)
    })
  }, [imagePath])

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
