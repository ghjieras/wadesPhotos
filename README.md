# Wade's Photography Portfolio 📸

A modern, magazine-style photography portfolio website built with React and Vite. Features elegant layouts, smooth scroll animations, and a content management system for easy updates.

## ✨ Features

- **Magazine-Style Layout** - Professional spread design inspired by high-end photography magazines
- **Scroll Animations** - Smooth fade-in effects as images enter the viewport
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Content Management** - Easy-to-update configuration files for images and text
- **Professional Typography** - Justified text alignment and carefully crafted spacing
- **Shadow Effects** - Multi-layer shadows for depth and visual interest

## 🚀 Live Demo

Visit the live site: [Wade's Photography Portfolio](https://ghjieras.github.io/wadesPhotos/)

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with animations
- **JavaScript (ES6+)** - Modern JavaScript features

## 📁 Project Structure

```
photographer-portfolio/
├── src/
│   ├── assets/
│   │   ├── images/          # Photography images organized by section
│   │   │   ├── section-01/
│   │   │   ├── section-02/
│   │   │   ├── section-03/
│   │   │   └── section-04/
│   │   └── content/         # Text content configuration
│   │       └── contentConfig.js
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.jsx             # Application entry point
├── public/
│   └── favicon.ico          # Site favicon
└── index.html               # HTML template
```

## 🎨 Customization

### Adding Your Photos

1. Navigate to `src/assets/images/section-XX/` (where XX is 01-04)
2. Replace the image files with your photos
3. Update `src/assets/images/imageConfig.js` with your image filenames

```javascript
const imageConfig = {
  'section-01': {
    main: 'your-main-photo.jpg',
    gallery: ['gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg']
  },
  // ... more sections
}
```

### Updating Text Content

Edit `src/assets/content/contentConfig.js` to update:
- Section titles and subtitles
- Descriptions
- Project details (place, photography credits, etc.)

```javascript
const contentConfig = {
  'section-01': {
    title: 'Your Project Title',
    subtitle: 'Your subtitle',
    description: 'Your description...',
    details: {
      title: 'Project Name',
      place: 'Location',
      photography: 'Photographer Name',
      country: 'Country',
      creationTime: 'Date'
    }
  }
}
```

## 💻 Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ghjieras/wadesPhotos.git

# Navigate to project directory
cd wadesPhotos

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 🌐 Deployment

This project is configured for GitHub Pages deployment.

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your hosting service
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Key Features Explained

### Scroll Animations

Images fade in with a subtle upward motion as they enter the viewport, powered by the Intersection Observer API.

### Content Management

All text and image references are stored in configuration files, making it easy to update content without touching the component code.

### Responsive Design

The layout adapts seamlessly across different screen sizes:
- Desktop: Full magazine spread layout
- Tablet: Stacked pages with adjusted spacing
- Mobile: Single column with optimized image sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Wade Lu**
- GitHub: [@ghjieras](https://github.com/ghjieras)
- Email: ghjieras@gmail.com

## 🙏 Acknowledgments

- Design inspired by professional photography magazines
- Built with modern web technologies
- Powered by React and Vite

---

⭐ If you like this project, please give it a star on GitHub!
