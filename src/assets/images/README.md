# 照片上傳指南

## 資料夾結構

```
src/assets/images/
├── section-01/
│   ├── main.jpg
│   ├── gallery-01.jpg
│   ├── gallery-02.jpg
│   └── gallery-03.jpg
├── section-02/
│   ├── main.jpg
│   ├── gallery-01.jpg
│   └── gallery-02.jpg
├── section-03/
│   ├── hero.jpg
│   └── gallery-01.jpg
├── section-04/
│   ├── main.jpg
│   ├── gallery-01.jpg
│   ├── gallery-02.jpg
│   └── gallery-03.jpg
└── imageConfig.js (配置檔案)
```

## 如何上傳照片

1. **將照片放入對應的資料夾**
   - Section 1: `src/assets/images/section-01/`
   - Section 2: `src/assets/images/section-02/`
   - Section 3: `src/assets/images/section-03/`
   - Section 4: `src/assets/images/section-04/`

2. **照片命名規則**
   - 主要圖片：`main.jpg` 或 `hero.jpg`
   - 畫廊圖片：`gallery-01.jpg`, `gallery-02.jpg`, `gallery-03.jpg`
   - 支援格式：.jpg, .jpeg, .png, .webp

3. **修改配置檔案（如需更改檔名）**
   - 編輯 `src/assets/images/imageConfig.js`
   - 更新對應 section 的檔案名稱

## 安全性說明

- 照片存放在 `src/assets/` 下，經過 Vite 打包
- 不會直接暴露原始檔案路徑
- 只有在配置檔案中指定的圖片才會被載入
- 相對安全且不易被直接存取

## 範例配置

```javascript
'section-01': {
  main: 'main.jpg',
  gallery: ['gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg']
}
```
