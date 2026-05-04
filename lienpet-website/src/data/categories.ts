export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: SubCategory[];
}

export interface ProductLink {
  id: string;
  url: string;
  label: string;
}

export interface ProductTranslation {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  images: string[];
  links: ProductLink[];
  price?: string;
  isFavorite: boolean;
  isOEM: boolean;
  isODM: boolean;
  translations?: Record<string, ProductTranslation>;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'suggestion' | 'product-request';
  content: string;
  createdAt: string;
}

export const categories: Category[] = [
  {
    id: 'health-supplements',
    name: '宠物保健品',
    image: '/images/cat-health.png',
    subcategories: [
      { id: 'soft-chews', name: '软咀嚼' },
      { id: 'powders', name: '粉剂' },
      { id: 'tablets', name: '片剂' },
      { id: 'pastes', name: '膏剂' },
      { id: 'capsules', name: '胶囊' },
      { id: 'drops', name: '滴剂' },
    ],
  },
  {
    id: 'small-exotic-pets',
    name: '小宠&异宠用品',
    image: '/images/small-pets.png',
    subcategories: [
      { id: 'exotic-health', name: '保健品' },
      { id: 'exotic-clothing', name: '服装' },
      { id: 'exotic-supplies', name: '用品' },
    ],
  },
  {
    id: 'smart-products',
    name: '宠物智能产品',
    image: '/images/pet-smart.png',
    subcategories: [
      { id: 'smart-litter', name: '智能猫砂盆' },
      { id: 'smart-feeder', name: '喂食器' },
      { id: 'smart-fountain', name: '饮水机' },
      { id: 'smart-other', name: '其他智能' },
    ],
  },
  {
    id: 'snacks-wet-food',
    name: '宠物零食 & 湿粮',
    image: '/images/pet-snacks.png',
    subcategories: [
      { id: 'cat-sticks', name: '猫条' },
      { id: 'canned-food', name: '罐头' },
      { id: 'snacks-other', name: '其他' },
    ],
  },
  {
    id: 'daily-supplies',
    name: '宠物日用品',
    image: '/images/pet-daily.png',
    subcategories: [
      { id: 'outdoor-portable', name: '外出便携用品' },
      { id: 'home-supplies', name: '家庭饲养用品' },
      { id: 'daily-other', name: '其他' },
    ],
  },
  {
    id: 'perfume-fragrance',
    name: '宠物香水 & 香氛护理',
    image: '/images/pet-perfume.png',
    subcategories: [
      { id: 'perfume-deodorizer', name: '香水和除臭剂' },
      { id: 'daily-cleaning', name: '日常清洁用品' },
      { id: 'fragrance-other', name: '其他' },
    ],
  },
  {
    id: 'toys',
    name: '宠物玩具',
    image: '/images/pet-toys.png',
    subcategories: [
      { id: 'interactive-toys', name: '互动玩具' },
      { id: 'chew-toys', name: '磨牙玩具' },
      { id: 'puzzle-toys', name: '益智玩具' },
      { id: 'toys-other', name: '其他' },
    ],
  },
  {
    id: 'clothing-accessories',
    name: '宠物服装&配饰',
    image: '/images/pet-clothing.png',
    subcategories: [
      { id: 'valentines', name: '情人节' },
      { id: 'wedding', name: '婚礼' },
      { id: 'halloween', name: '万圣节' },
      { id: 'christmas', name: '圣诞节' },
      { id: 'raincoat', name: '雨衣' },
      { id: 'autumn-winter', name: '秋冬款' },
      { id: 'spring-summer', name: '春夏款' },
      { id: 'clothing-other', name: '其他' },
    ],
  },
  {
    id: 'memorial',
    name: '宠物纪念用品',
    image: '/images/pet-memorial.png',
    subcategories: [
      { id: 'urns', name: '骨灰盒' },
      { id: 'fur-collection', name: '毛发收集' },
      { id: '3d-painting', name: '3D定制油画' },
      { id: 'memorial-other', name: '其他' },
    ],
  },
];

export const sampleProducts: Product[] = [
  // ============ 宠物保健品分类 ============
  {
    id: 'p1',
    name: '宠物关节保健软咀嚼',
    description: '富含葡萄糖胺和软骨素，帮助宠物维护关节健康，缓解关节炎症状。美味鸡肉味，适合老年犬和大型犬。',
    categoryId: 'health-supplements',
    subcategoryId: 'soft-chews',
    images: ['/images/cat-health.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Joint Health Soft Chews',
        description: 'Rich in glucosamine and chondroitin to help maintain joint health and relieve arthritis symptoms. Delicious chicken flavor, suitable for senior and large dogs.',
      },
    },
  },
  {
    id: 'p2',
    name: '宠物益生菌粉',
    description: '含5种活性益生菌，每袋50亿CFU，调理宠物肠道健康，改善腹泻和便秘问题。独立小包装，方便携带。',
    categoryId: 'health-supplements',
    subcategoryId: 'powders',
    images: ['/images/cat-health.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Pet Probiotic Powder',
        description: 'Contains 5 active probiotics, 5 billion CFU per bag, regulates intestinal health, improves diarrhea and constipation. Individually packaged for portability.',
      },
    },
  },
  {
    id: 'p3',
    name: '宠物复合维生素片',
    description: '12种必需维生素和8种矿物质，全面补充宠物日常营养需求。片剂易喂食，适合全年龄段宠物。',
    categoryId: 'health-supplements',
    subcategoryId: 'tablets',
    images: ['/images/cat-health.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Multivitamin Tablets',
        description: '12 essential vitamins and 8 minerals, comprehensive daily nutrition. Easy to feed tablets for pets of all ages.',
      },
    },
  },
  {
    id: 'p4',
    name: '宠物化毛营养膏',
    description: '专为猫咪设计，含天然植物油和膳食纤维，帮助猫咪排出体内毛球，预防毛球症。',
    categoryId: 'health-supplements',
    subcategoryId: 'pastes',
    images: ['/images/cat-health.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Pet Hairball Nutrient Paste',
        description: 'Specially designed for cats, containing natural plant oils and dietary fiber to help eliminate hairballs and prevent hairball disease.',
      },
    },
  },

  // ============ 宠物智能产品分类 ============
  {
    id: 'p5',
    name: '智能宠物喂食器带摄像头',
    description: 'APP远程控制，定时定量喂食，1080P高清摄像头，实时视频和语音对讲。6L大容量，支持干粮和冻干。',
    categoryId: 'smart-products',
    subcategoryId: 'smart-feeder',
    images: ['/images/pet-smart.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: false,
    isODM: true,
    translations: {
      en: {
        name: 'Smart Pet Feeder with Camera',
        description: 'APP remote control, scheduled feeding, 1080P HD camera, real-time video and voice chat. 6L capacity, supports dry food and freeze-dried.',
      },
    },
  },
  {
    id: 'p6',
    name: '智能宠物饮水机',
    description: '循环过滤系统，四重过滤去除杂质，静音水泵低于30dB，缺水自动提醒，2L大容量适合多宠家庭。',
    categoryId: 'smart-products',
    subcategoryId: 'smart-fountain',
    images: ['/images/pet-smart.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Smart Pet Water Fountain',
        description: 'Circulation filter system, 4-layer filtration, ultra-quiet pump (<30dB), automatic low-water alert, 2L capacity for multi-pet households.',
      },
    },
  },
  {
    id: 'p7',
    name: '全自动智能猫砂盆',
    description: '自动清理功能，使用后7分钟自动清理，APP远程监控，健康数据分析，超大空间适合20斤以下猫咪。',
    categoryId: 'smart-products',
    subcategoryId: 'smart-litter',
    images: ['/images/pet-smart.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Automatic Smart Litter Box',
        description: 'Auto-cleaning 7 minutes after use, APP remote monitoring, health data analysis, extra large space for cats under 10kg.',
      },
    },
  },

  // ============ 宠物玩具分类 ============
  {
    id: 'p8',
    name: '猫咪三层转盘玩具',
    description: '三层转盘设计，内置彩色小球和羽毛，激发猫咪狩猎天性，满足运动和玩耍需求。',
    categoryId: 'toys',
    subcategoryId: 'interactive-toys',
    images: ['/images/pet-toys.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Cat 3-Tier Tower Toy',
        description: 'Three-tier tower design with colorful balls and feathers, stimulates hunting instinct, satisfies exercise and play needs.',
      },
    },
  },
  {
    id: 'p9',
    name: '狗狗耐咬磨牙棒',
    description: '天然橡胶材质，凹凸纹理设计，帮助狗狗清洁牙齿，缓解长牙期牙痒，适合中小型犬。',
    categoryId: 'toys',
    subcategoryId: 'chew-toys',
    images: ['/images/pet-toys.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Durable Dog Chew Toy',
        description: 'Natural rubber material with textured design, helps clean teeth and relieve teething discomfort. Suitable for small and medium dogs.',
      },
    },
  },
  {
    id: 'p10',
    name: '宠物益智漏食玩具',
    description: '可调节难度设计，通过玩耍获得食物，锻炼宠物智力，延缓进食速度，预防消化问题。',
    categoryId: 'toys',
    subcategoryId: 'puzzle-toys',
    images: ['/images/pet-toys.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Puzzle Feeder Toy',
        description: 'Adjustable difficulty design, pets get food through play, exercises intelligence, slows eating speed, prevents digestive issues.',
      },
    },
  },

  // ============ 宠物服装配饰分类 ============
  {
    id: 'p11',
    name: '宠物圣诞服装套装',
    description: '包含圣诞老人上衣、圣诞帽和围巾，加厚保暖面料，适合秋冬穿着，多尺码可选。',
    categoryId: 'clothing-accessories',
    subcategoryId: 'christmas',
    images: ['/images/pet-clothing.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Christmas Costume Set',
        description: 'Includes Santa top, Christmas hat and scarf, thick and warm fabric for autumn/winter, multiple sizes available.',
      },
    },
  },
  {
    id: 'p12',
    name: '宠物万圣节南瓜装',
    description: '可爱南瓜造型，柔软面料，适合派对和节日拍照，魔术贴设计方便穿脱。',
    categoryId: 'clothing-accessories',
    subcategoryId: 'halloween',
    images: ['/images/pet-clothing.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Pet Halloween Pumpkin Costume',
        description: 'Adorable pumpkin design, soft fabric, perfect for parties and holiday photos. Hook-and-loop closure for easy wear.',
      },
    },
  },
  {
    id: 'p13',
    name: '宠物雨衣防水透气',
    description: '高密度防水面料，透明帽檐不挡视线，反光条设计夜行更安全，轻盈舒适不闷热。',
    categoryId: 'clothing-accessories',
    subcategoryId: 'raincoat',
    images: ['/images/pet-clothing.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Waterproof Raincoat',
        description: 'High-density waterproof fabric, clear brim doesn\'t block vision, reflective strips for night safety, lightweight and breathable.',
      },
    },
  },

  // ============ 宠物零食湿粮分类 ============
  {
    id: 'p14',
    name: '猫咪流质零食猫条',
    description: '精选金枪鱼、三文鱼、鸡肉三种口味，添加牛磺酸保护视力，细腻流质易舔食。',
    categoryId: 'snacks-wet-food',
    subcategoryId: 'cat-sticks',
    images: ['/images/pet-snacks.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Cat Liquid Treat Sticks',
        description: 'Premium tuna, salmon and chicken flavors, added taurine for eye health, fine liquid texture easy to lick.',
      },
    },
  },
  {
    id: 'p15',
    name: '猫咪主食罐头85g',
    description: '96%高肉含量，无谷物添加，含丰富动物蛋白，增肥发腮，多种口味可选。',
    categoryId: 'snacks-wet-food',
    subcategoryId: 'canned-food',
    images: ['/images/pet-snacks.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Cat Wet Food Cans 85g',
        description: '96% high meat content, grain-free, rich in animal protein, helps gain weight and cheeks, multiple flavors available.',
      },
    },
  },

  // ============ 宠物香水香氛护理分类 ============
  {
    id: 'p16',
    name: '宠物持久淡香水',
    description: '植物提取配方，温和不刺激，持久留香48小时，多种香型可选，适合犬猫通用。',
    categoryId: 'perfume-fragrance',
    subcategoryId: 'perfume-deodorizer',
    images: ['/images/pet-perfume.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: false,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Long-Lasting Perfume',
        description: 'Plant-based formula, gentle and non-irritating, 48-hour fragrance, multiple scents available, suitable for both dogs and cats.',
      },
    },
  },
  {
    id: 'p17',
    name: '宠物环境除臭喷雾',
    description: '生物酶分解技术，从根源分解异味，不只是遮盖。安全无毒，可直接喷在猫砂盆、狗窝等。',
    categoryId: 'perfume-fragrance',
    subcategoryId: 'daily-cleaning',
    images: ['/images/pet-perfume.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Environment Deodorizing Spray',
        description: 'Bio-enzyme decomposition technology, eliminates odors from source, not just masking. Safe and non-toxic, can spray directly on litter box, dog bed, etc.',
      },
    },
  },

  // ============ 宠物日用品分类 ============
  {
    id: 'p18',
    name: '宠物双肩透气背包',
    description: '四面透气网面，舒适肩带减压，侧开口方便进出，承重15斤以内，适合小型犬和猫咪。',
    categoryId: 'daily-supplies',
    subcategoryId: 'outdoor-portable',
    images: ['/images/pet-daily.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Pet Breathable Backpack Carrier',
        description: 'Four-side breathable mesh, comfortable padded shoulder straps, side opening for easy access, supports pets under 7.5kg.',
      },
    },
  },
  {
    id: 'p19',
    name: '宠物自动喂食碗',
    description: '重力自动出水设计，3.8L大容量，无需插电，适合出差旅游使用，食品级材质安全放心。',
    categoryId: 'daily-supplies',
    subcategoryId: 'home-supplies',
    images: ['/images/pet-daily.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Gravity Feeder Bowl',
        description: 'Gravity automatic water dispensing, 3.8L large capacity, no electricity needed, perfect for travel. Food-grade material safe and reliable.',
      },
    },
  },

  // ============ 小宠异宠用品分类 ============
  {
    id: 'p20',
    name: '小宠维生素营养膏',
    description: '专为仓鼠、兔子、龙猫设计，含多种维生素和矿物质，补充日常营养，促进食欲。',
    categoryId: 'small-exotic-pets',
    subcategoryId: 'exotic-health',
    images: ['/images/small-pets.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Small Pet Vitamin Nutrition Paste',
        description: 'Specially designed for hamsters, rabbits, chinchillas, contains multiple vitamins and minerals, supplements daily nutrition, promotes appetite.',
      },
    },
  },
  {
    id: 'p21',
    name: '小宠仓鼠保暖窝',
    description: '超柔短毛绒面料，内置PP棉填充，冬季保暖舒适，可拆卸清洗，适合仓鼠、刺猬、蜜袋鼯。',
    categoryId: 'small-exotic-pets',
    subcategoryId: 'exotic-supplies',
    images: ['/images/small-pets.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: false,
    translations: {
      en: {
        name: 'Small Pet Hamster Warm Nest',
        description: 'Super soft plush fabric, PP cotton filling, warm and comfortable in winter, removable and washable, suitable for hamsters, hedgehogs, sugar gliders.',
      },
    },
  },

  // ============ 宠物纪念用品分类 ============
  {
    id: 'p22',
    name: '宠物实木纪念骨灰盒',
    description: '优质胡桃木/橡木制作，可定制雕刻宠物照片和名字，多种尺寸可选，附赠天鹅绒袋。',
    categoryId: 'memorial',
    subcategoryId: 'urns',
    images: ['/images/pet-memorial.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: false,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Solid Wood Memorial Urn',
        description: 'Premium walnut/oak craftsmanship, customizable engraved photo and name, multiple sizes available, includes velvet pouch.',
      },
    },
  },
  {
    id: 'p23',
    name: '宠物毛发纪念收集盒',
    description: '精美玻璃展示盒，可保存宠物毛发、爪印等，内置LED灯光，怀念宠物的温馨选择。',
    categoryId: 'memorial',
    subcategoryId: 'fur-collection',
    images: ['/images/pet-memorial.png'],
    links: [],
    price: '询价',
    isFavorite: false,
    isOEM: true,
    isODM: true,
    translations: {
      en: {
        name: 'Pet Fur Memorial Collection Box',
        description: 'Beautiful glass display box, preserves pet fur, paw prints, etc., built-in LED lighting, a warm way to remember your pet.',
      },
    },
  },
];
