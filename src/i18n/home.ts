import type { Locale } from '@/utils/locale'

interface Card { title: string; english: string; body: string }
interface HomeCopy {
  market: string; account: string; preorder: string; support: string; contact: string; terms: string; privacy: string; afterSales: string
  heroTitle: [string, string]; heroLead: string; heroBody: string; heroTag: string
  aboutTitle: string; aboutLead: string; about: Card[]
  aiTitle: string; aiLead: string; ai: Card[]
  resourcesTitle: string; resourcesLead: string; resources: Card[]
  retailTitle: string; retailLead: string; retail: Card[]
  productsTitle: string; productsLead: string; products: Card[]
}

export const homeCopy: Record<Locale, HomeCopy> = {
  tw: {
    market: '潮玩商城', account: '我的帳戶', preorder: '立即預購', support: '服務支援', contact: '聯絡我們', terms: '服務條款', privacy: '隱私政策', afterSales: '售後政策',
    heroTitle: ['AI 驅動全球', '創意潮玩生態'], heroLead: '以 AI 創新為核心，融合 IP 孵化、智能製造與全球零售，讓創意走向商品，讓商品連接全球。', heroBody: '讓 AI 創意，成為真實商業價值。\nTurning AI Creativity into Real Business.\nAI 創作 × IP 孵化 × 智能製造 × 全球零售', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'AI 賦能創意 · 連接全球潮玩生態', aboutLead: '讓靈感落地，讓潮玩出海',
    about: [
      { title: '我們是誰', english: 'AI 創意潮玩平台', body: '以 AI 技術與產業資源賦能創意消費' },
      { title: '我們做什麼', english: '全球潮玩零售與寄售', body: '提供潮玩商品銷售、個人店鋪寄售及全球消費連接服務' },
      { title: '我們如何做', english: '線上線下融合生態', body: '融合線上商城、線下體驗與 AI 創作，構建多元消費場景' },
      { title: '我們的目標', english: '打造全球創意潮玩生態', body: '致力於成為全球領先的 AI 創意潮玩生態平台' },
    ],
    aiTitle: 'AI 驅動創意消費 · 連接全球產業生態', aiLead: 'AI 算力 × 應用創新 × 產業協同 × 全球拓展',
    ai: [
      { title: 'AI 產業佈局', english: 'MOONPLAY', body: '技術、投資與產業資源協同' },
      { title: 'AI 算力基礎', english: 'GPU Computing', body: '東盟 AI 算力網絡' },
      { title: 'AI 應用', english: 'AI Applications', body: '技術、投資與產業資源協同' },
      { title: '全球產業協作', english: 'Global Partnerships', body: '全球投資、技術與商業合作網絡' },
    ],
    resourcesTitle: '全球資源 · 共創潮玩生態', resourcesLead: '整合產業資本、AI 技術、智能製造與全球渠道資源，構建 AI 創意潮玩產業生態',
    resources: [
      { title: '產業資本', english: '42X FUND', body: '產業投資與資源協同' },
      { title: '科研技術', english: '新加坡科研機構', body: 'AI 科研合作與技術創新' },
      { title: 'AI 算力', english: 'GPU Computing Centers', body: '東盟 AI 算力網絡' },
      { title: '潮玩品牌合作', english: 'Mighty Jaxx', body: '國際潮玩品牌、授權與渠道合作' },
      { title: '全球產業網絡', english: 'Factory + Creator', body: '柔性製造、創作者與營銷網絡' },
      { title: '自有平台建設', english: 'Marketplace + Studio', body: '潮玩商城、IP 孵化與產品開發' },
    ],
    retailTitle: '從潮玩零售到全球 AI 創意生態', retailLead: '於潮玩零售，抵達全球創意生態',
    retail: [
      { title: '商業起步 · 構建零售基礎', english: 'COMMERCE FOUNDATION', body: 'AI 創意潮玩零售平台\n創意商品開發與潮玩零售\n線上渠道建設與會員運營' },
      { title: '渠道擴張 · 連接全球市場', english: 'GLOBAL RETAIL EXPANSION', body: 'AI 驅動的新零售與創作者平台\n拓展全球創作者與供應鏈網絡\n佈局線下體驗與品牌快閃空間' },
      { title: '商業起步 · 構建零售基礎', english: 'COMMERCE FOUNDATION', body: 'AI 創意潮玩零售平台\n創意商品開發與潮玩零售\n線上渠道建設與會員運營' },
    ],
    productsTitle: '產品與服務', productsLead: '產品是潮玩與 AI 工具，服務是從創作到全球交付的完整鏈路',
    products: [
      { title: '創意潮玩商城', english: '01', body: '品牌潮玩 · 原創潮玩 · 創意卡牌 · 個性化定制' },
      { title: '線下潮玩體驗', english: '02', body: '潮玩實體店 · 品牌展示 · AI 創作體驗' },
      { title: 'AI 潮玩創作平台', english: '03', body: 'AI 創意設計 · IP 孵化 · 產品開發' },
    ],
  },
  en: {
    market: 'Toy marketplace', account: 'My account', preorder: 'Explore products', support: 'Support', contact: 'Contact us', terms: 'Terms', privacy: 'Privacy', afterSales: 'After-sales',
    heroTitle: ['AI powers a global', 'creative toy ecosystem'], heroLead: 'Combining IP development, smart manufacturing and global retail to turn ideas into products and connect them with the world.', heroBody: 'Turning AI Creativity into Real Business.\nAI creation × IP incubation × smart manufacturing × global retail', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'AI creativity · A connected global toy ecosystem', aboutLead: 'Bring ideas to life and share them worldwide',
    about: [
      { title: 'Who we are', english: 'AI creative toy platform', body: 'Connecting creative commerce with AI and industry resources' },
      { title: 'What we do', english: 'Global retail & consignment', body: 'Toy sales, personal stores and global consumer connections' },
      { title: 'How we work', english: 'Online + offline ecosystem', body: 'A marketplace, physical experiences and AI creation' },
      { title: 'Our goal', english: 'A global creative ecosystem', body: 'Building a leading AI creative toy platform' },
    ],
    aiTitle: 'AI powered creation · Global industry connections', aiLead: 'AI computing × applications × industry × global reach',
    ai: [
      { title: 'AI industry', english: 'MOONPLAY', body: 'Technology, investment and industry resources' },
      { title: 'AI computing', english: 'GPU Computing', body: 'ASEAN AI computing network' },
      { title: 'AI applications', english: 'AI Applications', body: 'Technology and industry collaboration' },
      { title: 'Global partnerships', english: 'Global Partnerships', body: 'Investment, technology and commercial partners' },
    ],
    resourcesTitle: 'Global resources · A shared toy ecosystem', resourcesLead: 'Connecting capital, AI, smart manufacturing and global channels',
    resources: [
      { title: 'Industry capital', english: '42X FUND', body: 'Investment and resource collaboration' },
      { title: 'Research', english: 'Singapore research', body: 'AI research and technical innovation' },
      { title: 'AI computing', english: 'GPU Computing Centers', body: 'ASEAN AI computing network' },
      { title: 'Toy brand partners', english: 'Mighty Jaxx', body: 'Brands, licensing and distribution' },
      { title: 'Industry network', english: 'Factory + Creator', body: 'Manufacturing, creators and marketing' },
      { title: 'Our platforms', english: 'Marketplace + Studio', body: 'Retail, IP development and product design' },
    ],
    retailTitle: 'From toy retail to a global AI creative ecosystem', retailLead: 'Starting with retail, reaching a global creative community',
    retail: [
      { title: 'Build the retail foundation', english: 'COMMERCE FOUNDATION', body: 'AI creative toy marketplace\nProduct development and retail\nOnline channels and membership' },
      { title: 'Connect global markets', english: 'GLOBAL RETAIL EXPANSION', body: 'AI powered retail and creator platform\nGlobal creators and suppliers\nPhysical experiences and pop-ups' },
      { title: 'Grow creative commerce', english: 'CREATIVE COMMERCE', body: 'AI creative toy marketplace\nProduct development and retail\nOnline channels and membership' },
    ],
    productsTitle: 'Products & services', productsLead: 'Creative toys and AI tools, from creation to global delivery',
    products: [
      { title: 'Creative toy marketplace', english: '01', body: 'Designer toys · Original IP · Cards · Custom goods' },
      { title: 'Offline experiences', english: '02', body: 'Stores · Brand exhibits · AI creation' },
      { title: 'AI creation platform', english: '03', body: 'AI design · IP incubation · Product development' },
    ],
  },
  ko: {
    market: '아트 토이 스토어', account: '내 계정', preorder: '상품 둘러보기', support: '고객 지원', contact: '문의', terms: '이용약관', privacy: '개인정보 처리방침', afterSales: '교환·반품',
    heroTitle: ['AI가 이끄는 글로벌', '크리에이티브 토이 생태계'], heroLead: 'IP 개발, 스마트 제조, 글로벌 리테일을 연결해 아이디어를 상품으로 만들고 전 세계에 전합니다.', heroBody: 'AI 아이디어를 실제 비즈니스로.\nAI 창작 × IP 개발 × 스마트 제조 × 글로벌 리테일', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'AI 창의력 · 글로벌 아트 토이 생태계', aboutLead: '영감을 현실로, 세계로',
    about: [
      { title: '우리는 누구인가', english: 'AI 크리에이티브 토이 플랫폼', body: 'AI 기술과 산업 자원으로 창의적 소비를 연결합니다' },
      { title: '무엇을 하는가', english: '글로벌 리테일과 위탁 판매', body: '토이 판매, 개인 스토어와 글로벌 소비자를 연결합니다' },
      { title: '어떻게 하는가', english: '온·오프라인 생태계', body: '온라인 스토어, 오프라인 경험과 AI 창작을 결합합니다' },
      { title: '우리의 목표', english: '글로벌 창작 생태계', body: 'AI 크리에이티브 토이 플랫폼을 만듭니다' },
    ],
    aiTitle: 'AI 창작 · 글로벌 산업 연결', aiLead: 'AI 컴퓨팅 × 응용 혁신 × 산업 협력 × 글로벌 확장',
    ai: [
      { title: 'AI 산업', english: 'MOONPLAY', body: '기술, 투자와 산업 자원' },
      { title: 'AI 컴퓨팅', english: 'GPU Computing', body: '아세안 AI 컴퓨팅 네트워크' },
      { title: 'AI 응용', english: 'AI Applications', body: '기술과 산업 협력' },
      { title: '글로벌 협력', english: 'Global Partnerships', body: '투자, 기술과 비즈니스 파트너십' },
    ],
    resourcesTitle: '글로벌 자원 · 함께 만드는 토이 생태계', resourcesLead: '자본, AI, 스마트 제조와 글로벌 채널을 연결합니다',
    resources: [
      { title: '산업 자본', english: '42X FUND', body: '투자와 자원 협력' },
      { title: '연구 기술', english: '싱가포르 연구기관', body: 'AI 연구와 기술 혁신' },
      { title: 'AI 컴퓨팅', english: 'GPU Computing Centers', body: '아세안 AI 컴퓨팅 네트워크' },
      { title: '토이 브랜드 협력', english: 'Mighty Jaxx', body: '브랜드, 라이선스와 유통' },
      { title: '글로벌 산업망', english: 'Factory + Creator', body: '제조, 창작자와 마케팅' },
      { title: '자체 플랫폼', english: 'Marketplace + Studio', body: '스토어, IP와 제품 개발' },
    ],
    retailTitle: '토이 리테일에서 글로벌 AI 창작 생태계로', retailLead: '리테일에서 시작해 전 세계 창작자를 연결합니다',
    retail: [
      { title: '리테일 기반 구축', english: 'COMMERCE FOUNDATION', body: 'AI 크리에이티브 토이 스토어\n제품 개발과 판매\n온라인 채널과 회원 운영' },
      { title: '글로벌 시장 연결', english: 'GLOBAL RETAIL EXPANSION', body: 'AI 리테일과 창작자 플랫폼\n글로벌 창작자와 공급망\n오프라인 체험과 팝업' },
      { title: '창작 커머스 확장', english: 'CREATIVE COMMERCE', body: 'AI 크리에이티브 토이 스토어\n제품 개발과 판매\n온라인 채널과 회원 운영' },
    ],
    productsTitle: '제품과 서비스', productsLead: '토이와 AI 도구, 창작에서 글로벌 배송까지',
    products: [
      { title: '크리에이티브 토이 스토어', english: '01', body: '디자이너 토이 · 오리지널 IP · 카드 · 맞춤 굿즈' },
      { title: '오프라인 토이 체험', english: '02', body: '매장 · 브랜드 전시 · AI 창작' },
      { title: 'AI 창작 플랫폼', english: '03', body: 'AI 디자인 · IP 개발 · 제품 개발' },
    ],
  },
}
