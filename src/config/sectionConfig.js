// 統一的 Section 配置文件
// 數據驅動設計：layout type 決定渲染邏輯，消除條件分支

const LAYOUT_TYPES = {
  CONTENT_GALLERY: 'CONTENT_GALLERY',     // 左：內容+主圖，右：畫廊
  HERO_ARTICLE: 'HERO_ARTICLE',           // 左：大圖+文章，右：垂直圖片+文字
  CONTENT_GALLERY_ALT: 'CONTENT_GALLERY_ALT', // section-03 的佈局
  HERO_MIXED: 'HERO_MIXED'                // section-04 的佈局
}

const sectionConfig = [
  {
    id: 1,
    layoutType: LAYOUT_TYPES.CONTENT_GALLERY,
    images: {
      main: 'main.jpg',
      gallery: ['gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg']
    },
    content: {
      title: 'Why did I start?',
      subtitle: 'Explore ancient architectures',
      location: 'Taiwan (Taichung)',
      description: 'It all began with a friend who bought a full-frame camera, and I happened to be at a stage in life where I was searching for passion and interests. So I started learning photography together with this friend, and I told myself to be brave in trying new things, to persevere, and to give it my all, believing that everything would move in a positive direction.',
      details: {
        title: 'Ancient Heritage Collection',
        place: 'Shin Sei Green Waterway',
        photography: 'Wade Lu',
        country: 'Taiwan (Taichung)',
        creationTime: 'Summer 2025'
      },
      rightContent: {
        heading: 'Courage',
        text: [
          'When I first started this activity, my friends and I would get excited at our fixed weekly meetup times. During photo shoots, we would always arrive on time or even early at the meeting point, enthusiastically sharing with each other about newly bought equipment and lenses, discussing cool cameras we saw online, what kind of content we wanted to shoot, how long we needed to save up money, where to buy things cheaper, and so on.',
          'But after some time, the passion inevitably returned to ordinary simplicity. Some people became less enthusiastic. From that point on, my fear of going out alone with my camera was magnified again and again. Without someone to accompany me, I didn\'t dare to go shooting by myself. I spent a lot of time in self-dialogue: "Why am I afraid?"',
          'Finally, I told myself: "No matter what, I must go out and use my camera, even if it\'s just to take one photo." I found a solution—I asked a good friend on Discord to stay online with me. I would wear my earphones and chat with him while giving myself constant encouragement. Then, it gradually evolved into me wearing earphones and playing calm music, immersing myself in my own world. To this day, I still use this approach for my photography practice.'
        ]
      }
    }
  },
  {
    id: 2,
    layoutType: LAYOUT_TYPES.HERO_ARTICLE,
    images: {
      hero: 'main-02.jpg',
      gallery: ['gallery-01.jpg', 'gallery-02.jpg']
    },
    content: {
      title: 'Life on the Street',
      subtitle: 'New Interest & New Experiences',
      description: 'Suspendisse potenti. Nunc euismod sollicitudin magna, ac facilisis orci bibendum vel. Integer at turpis sapien. Mauris nec.',
      articleContent: {
        heading: 'New Interest & New Experiences',
        text: [
          'I find it fascinating that a small LCD screen can display the world as I see it. I also began learning to view the world from different perspectives—what should be presented in a photo, how to balance the relationship between subject and background, as well as the relationship between aperture and shutter speed. All this knowledge started to make me feel excited.',
          'Since I started doing this, my life began to expand into another world. I started meeting people I wouldn\'t normally meet and experiencing things I wouldn\'t normally experience—whether it\'s a father who gave up photography, a girl who braved wind and rain to get a lens, or new photography partners, and so on. My life started to become a bit different.'
        ]
      },
      rightContent: {
        text: [
          'Learning to see the world from different angles applies not just to photography, but also to how we interact with others and navigate life.'
        ]
      }
    }
  },
  {
    id: 3,
    layoutType: LAYOUT_TYPES.CONTENT_GALLERY_ALT,
    images: {
      main: 'main.jpg',
      gallery: ['gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg']
    },
    content: {
      title: 'Between The City',
      description: 'Ever since I began learning photography, my weekends have been spent roaming between cities.',
      details: {
        title: 'The Old Memory',
        place: 'Taichung Motan Street',
        photography: 'Wade Lu',
        country: 'Taiwan (Taichung)',
        creationTime: 'Autumn 2025'
      },
      rightContent: {
        heading: 'Simple Happiness',
        text: [
          'Whether it\'s a new lens I saved up for a long time to buy, or capturing a photo I\'m satisfied with during today\'s photography journey, happiness has become a visible destination, and those experiences have become a compass for finding happiness.',
          'The listless and boring days have begun to become rich and interesting.'
        ]
      }
    }
  },
  {
    id: 4,
    layoutType: LAYOUT_TYPES.HERO_MIXED,
    images: {
      hero: 'main-04.jpg',
      gallery: ['gallery-01.jpg', 'gallery-02.jpg']
    },
    content: {
      rightContent: {
        heading: 'Words to Myself',
        text: [
          'I don\'t know how long I can maintain this interest, but I will treasure every single moment of now and indulge myself in this romantic journey.'
        ]
      }
    }
  }
]

export { LAYOUT_TYPES, sectionConfig }
