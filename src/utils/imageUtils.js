// 圖片路徑解析 - 單一職責：把邏輯 ID 轉成物理路徑
// LazyImage 組件不需要知道文件系統結構

// 使用 import.meta.glob 按需載入圖片
const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: false })

/**
 * 解析圖片路徑
 * @param {number} sectionId - section ID
 * @param {string} imageName - 圖片檔名
 * @returns {string} 完整的圖片路徑
 */
export function resolveImagePath(sectionId, imageName) {
  const sectionKey = `section-${String(sectionId).padStart(2, '0')}`
  return `../assets/images/${sectionKey}/${imageName}`
}

/**
 * 加載圖片模組
 * @param {string} imagePath - 圖片路徑
 * @returns {Promise<string|null>} 圖片 URL 或 null
 */
export async function loadImageModule(imagePath) {
  const imageLoader = imageModules[imagePath]

  if (!imageLoader) {
    console.error(`Image not found: ${imagePath}`)
    return null
  }

  try {
    const module = await imageLoader()
    return module.default
  } catch (err) {
    console.error(`Failed to load image: ${imagePath}`, err)
    return null
  }
}
