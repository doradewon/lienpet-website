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
}

export interface Message {
  id: string;
  name: string;
  email: string;
  type: 'suggestion' | 'product-request';
  content: string;
  createdAt: string;
}

export const categories: Category[] = [
  {
    id: 'health-supplements',
    name: '\u5ba0\u7269\u4fdd\u5065\u54c1',
    image: '/images/cat-health.png',
    subcategories: [
      { id: 'soft-chews', name: '软咀嚼' },
      { id: 'powders', name: '\u7c89\u5242' },
      { id: 'tablets', name: '\u7247\u5242' },
      { id: 'pastes', name: '\u818f\u5242' },
      { id: 'capsules', name: '\u80f6\u56ca' },
      { id: 'drops', name: '\u6ef4\u5242' },
    ],
  },
  {
    id: 'small-exotic-pets',
    name: '\u5c0f\u5ba0&\u5f02\u5ba0\u7528\u54c1',
    image: '/images/small-pets.png',
    subcategories: [
      { id: 'exotic-health', name: '\u4fdd\u5065\u54c1' },
      { id: 'exotic-clothing', name: '\u670d\u88c5' },
      { id: 'exotic-supplies', name: '\u7528\u54c1' },
    ],
  },
  {
    id: 'smart-products',
    name: '\u5ba0\u7269\u667a\u80fd\u4ea7\u54c1',
    image: '/images/pet-smart.png',
    subcategories: [
      { id: 'smart-litter', name: '\u667a\u80fd\u732b\u7802\u76c6' },
      { id: 'smart-feeder', name: '\u5582\u98df\u5668' },
      { id: 'smart-fountain', name: '\u996e\u6c34\u673a' },
      { id: 'smart-other', name: '\u5176\u4ed6\u667a\u80fd' },
    ],
  },
  {
    id: 'snacks-wet-food',
    name: '\u5ba0\u7269\u96f6\u98df & \u6e7f\u7cae',
    image: '/images/pet-snacks.png',
    subcategories: [
      { id: 'cat-sticks', name: '\u732b\u6761' },
      { id: 'canned-food', name: '\u7f50\u5934' },
      { id: 'snacks-other', name: '\u5176\u4ed6' },
    ],
  },
  {
    id: 'daily-supplies',
    name: '\u5ba0\u7269\u65e5\u7528\u54c1',
    image: '/images/pet-daily.png',
    subcategories: [
      { id: 'outdoor-portable', name: '\u5916\u51fa\u4fbf\u643a\u7528\u54c1' },
      { id: 'home-supplies', name: '\u5bb6\u5ead\u9972\u517b\u7528\u54c1' },
      { id: 'daily-other', name: '其他' },
    ],
  },
  {
    id: 'perfume-fragrance',
    name: '\u5ba0\u7269\u9999\u6c34 & \u9999\u6c1b\u62a4\u7406',
    image: '/images/pet-perfume.png',
    subcategories: [
      { id: 'perfume-deodorizer', name: '\u9999\u6c34\u548c\u9664\u81ed\u5242' },
      { id: 'daily-cleaning', name: '\u65e5\u5e38\u6e05\u6d01\u7528\u54c1' },
      { id: 'fragrance-other', name: '\u5176\u4ed6' },
    ],
  },
  {
    id: 'toys',
    name: '\u5ba0\u7269\u73a9\u5177',
    image: '/images/pet-toys.png',
    subcategories: [
      { id: 'interactive-toys', name: '\u4e92\u52a8\u73a9\u5177' },
      { id: 'chew-toys', name: '\u78e8\u7259\u73a9\u5177' },
      { id: 'puzzle-toys', name: '\u76ca\u667a\u73a9\u5177' },
      { id: 'toys-other', name: '\u5176\u4ed6' },
    ],
  },
  {
    id: 'clothing-accessories',
    name: '\u5ba0\u7269\u670d\u88c5&\u914d\u9970',
    image: '/images/pet-clothing.png',
    subcategories: [
      { id: 'valentines', name: '\u60c5\u4eba\u8282' },
      { id: 'wedding', name: '\u5a5a\u793c' },
      { id: 'halloween', name: '\u4e07\u5723\u8282' },
      { id: 'christmas', name: '\u5723\u8bde\u8282' },
      { id: 'raincoat', name: '\u96e8\u8863' },
      { id: 'autumn-winter', name: '\u79cb\u51ac\u6b3e' },
      { id: 'spring-summer', name: '\u6625\u590f\u6b3e' },
      { id: 'clothing-other', name: '\u5176\u4ed6' },
    ],
  },
  {
    id: 'memorial',
    name: '\u5ba0\u7269\u7eaa\u5ff5\u7528\u54c1',
    image: '/images/pet-memorial.png',
    subcategories: [
      { id: 'urns', name: '\u9aa8\u7070\u76d2' },
      { id: 'fur-collection', name: '\u6bdb\u53d1\u6536\u96c6' },
      { id: '3d-painting', name: '3D\u5b9a\u5236\u6cb9\u753b' },
      { id: 'memorial-other', name: '\u5176\u4ed6' },
    ],
  },
];

// Sample products for demonstration
export const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: '宠物保健品',
    description: '\u5bcc\u542b\u591a\u79cd\u7ef4\u751f\u7d20\u548c\u77ff\u7269\u8d28\uff0c\u5e2e\u52a9\u5ba0\u7269\u4fdd\u6301\u5065\u5eb7\u6d3b\u529b\u3002\u9002\u5408\u6240\u6709\u72ac\u79cd\u548c\u732b\u54aa\uff0c\u7f8e\u5473\u9e21\u8089\u5473\uff0c\u5ba0\u7269\u7231\u5403\u3002',
    categoryId: 'health-supplements',
    subcategoryId: 'soft-chews',
    images: ['/images/cat-health.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p2',
    name: '宠物智能产品',
    description: '\u652f\u6301APP\u8fdc\u7a0b\u63a7\u5236\uff0c\u5b9a\u65f6\u5b9a\u91cf\u5582\u98df\uff0c\u5185\u7f6e\u6444\u50cf\u5934\u53ef\u5b9e\u65f6\u67e5\u770b\u5ba0\u7269\u7528\u9910\u60c5\u51b5\u30025L\u5927\u5bb9\u91cf\u7cae\u6876\uff0c\u9002\u5408\u591a\u5ba0\u5bb6\u5ead\u3002',
    categoryId: 'smart-products',
    subcategoryId: 'smart-feeder',
    images: ['/images/pet-smart.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p3',
    name: '宠物玩具',
    description: '\u591a\u5c42\u8f6c\u76d8\u8bbe\u8ba1\uff0c\u523a\u6fc0\u732b\u54aa\u72e9\u730e\u672c\u80fd\uff0c\u5e2e\u52a9\u732b\u54aa\u8fd0\u52a8\u548c\u5a31\u4e50\u3002\u91c7\u7528\u5b89\u5168\u65e0\u6bd2ABS\u6750\u8d28\u3002',
    categoryId: 'toys',
    subcategoryId: 'interactive-toys',
    images: ['/images/pet-toys.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p4',
    name: '宠物服装&配饰',
    description: '\u5305\u542b\u5723\u8bde\u8001\u4eba\u5957\u88c5\u3001\u9e7f\u89d2\u5934\u9970\u548c\u8282\u65e5\u56f4\u5dfe\uff0c\u8ba9\u4f60\u7684\u5ba0\u7269\u6210\u4e3a\u8282\u65e5\u6d3e\u5bf9\u7684\u660e\u661f\u3002\u591a\u5c3a\u7801\u53ef\u9009\u3002',
    categoryId: 'clothing-accessories',
    subcategoryId: 'christmas',
    images: ['/images/pet-clothing.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p5',
    name: '宠物零食 & 湿粮',
    description: '\u7cbe\u9009\u91d1\u67aa\u9c7c\u3001\u4e09\u6587\u9c7c\u3001\u9e21\u8089\u4e09\u79cd\u53e3\u5473\uff0c\u8425\u517b\u5747\u8861\uff0c\u53e3\u611f\u7ec6\u817b\u3002\u72ec\u7acb\u5305\u88c5\uff0c\u65b0\u9c9c\u4fbf\u643a\u3002',
    categoryId: 'snacks-wet-food',
    subcategoryId: 'cat-sticks',
    images: ['/images/pet-snacks.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p6',
    name: '宠物香水 & 香氛护理',
    description: '\u6e29\u548c\u4e0d\u523a\u6fc0\u914d\u65b9\uff0c\u6301\u4e45\u6e05\u65b0\u82b1\u679c\u9999\uff0c\u6709\u6548\u53bb\u9664\u5ba0\u7269\u4f53\u5473\u3002\u5929\u7136\u690d\u7269\u63d0\u53d6\uff0c\u5b89\u5168\u65e0\u5bb3\u3002',
    categoryId: 'perfume-fragrance',
    subcategoryId: 'perfume-deodorizer',
    images: ['/images/pet-perfume.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p7',
    name: '宠物纪念用品',
    description: '\u7cbe\u7f8e\u5b9e\u6728\u5236\u4f5c\uff0c\u53ef\u5b9a\u5236\u96d5\u523b\u5ba0\u7269\u540d\u5b57\u548c\u65e5\u671f\u3002\u6c38\u6052\u7eaa\u5ff5\u4f60\u7684\u6bdb\u5b69\u5b50\uff0c\u6e29\u99a8\u800c\u5c0a\u8d35\u3002',
    categoryId: 'memorial',
    subcategoryId: 'urns',
    images: ['/images/pet-memorial.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p8',
    name: '宠物日用品',
    description: '\u900f\u6c14\u7f51\u9762\u8bbe\u8ba1\uff0c\u591a\u529f\u80fd\u53e3\u888b\uff0c\u8212\u9002\u80a9\u5e26\u3002\u9002\u5408\u5c0f\u578b\u72ac\u548c\u732b\u54aa\u5916\u51fa\u643a\u5e26\uff0c\u822a\u7a7a\u7ea7\u6750\u8d28\u3002',
    categoryId: 'daily-supplies',
    subcategoryId: 'outdoor-portable',
    images: ['/images/pet-daily.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
  {
    id: 'p9',
    name: '小宠&异宠用品',
    description: '\u4e13\u4e3a\u5c0f\u5ba0\u8bbe\u8ba1\u7684\u8425\u517b\u8865\u5145\u818f\uff0c\u542b\u591a\u79cd\u7ef4\u751f\u7d20\u548c\u76ca\u751f\u83cc\uff0c\u4fc3\u8fdb\u6d88\u5316\u548c\u514d\u75ab\u529b\u3002',
    categoryId: 'small-exotic-pets',
    subcategoryId: 'exotic-health',
    images: ['/images/small-pets.png'],
    links: [],
    price: '\u8be2\u4ef7',
    isFavorite: false,
  },
];