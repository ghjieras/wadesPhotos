#!/usr/bin/env node

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_DIR = path.join(__dirname, '../src/assets/images')
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const QUALITY = 85

async function getImageFiles(dir) {
  const files = []
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath)
      files.push(...subFiles)
    } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

async function optimizeImage(filePath) {
  try {
    const stats = await fs.stat(filePath)
    const originalSize = stats.size

    // Skip if already small enough
    if (originalSize < 500 * 1024) {
      console.log(`⏭️  Skip: ${path.basename(filePath)} (${(originalSize / 1024).toFixed(0)}KB)`)
      return
    }

    const image = sharp(filePath)
    const metadata = await image.metadata()

    // Resize if needed
    let resizeOptions = {}
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      resizeOptions = {
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true
      }
    }

    // Create backup
    const backupPath = filePath + '.backup'
    await fs.copyFile(filePath, backupPath)

    // Optimize and save
    // rotate() will auto-orient based on EXIF, then remove EXIF orientation tag
    await image
      .rotate()
      .resize(resizeOptions)
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(filePath + '.tmp')

    // Replace original
    await fs.rename(filePath + '.tmp', filePath)

    const newStats = await fs.stat(filePath)
    const newSize = newStats.size
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1)

    console.log(
      `✅ ${path.basename(filePath)}: ` +
      `${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024).toFixed(0)}KB ` +
      `(${reduction}% reduction)`
    )
  } catch (error) {
    console.error(`❌ Failed to optimize ${filePath}:`, error.message)
  }
}

async function main() {
  console.log('🔍 Scanning for images...\n')
  const imageFiles = await getImageFiles(IMAGES_DIR)
  console.log(`Found ${imageFiles.length} images\n`)

  console.log('🔨 Optimizing images...\n')
  for (const file of imageFiles) {
    await optimizeImage(file)
  }

  console.log('\n✨ Done!')
  console.log('\n💡 Backup files created with .backup extension')
  console.log('   If everything looks good, run: find src/assets/images -name "*.backup" -delete')
}

main().catch(console.error)
