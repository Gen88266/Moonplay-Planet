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
    market: '店鋪', account: '我的帳戶', preorder: '立即預購', support: '服務支援', contact: '聯絡我們', terms: '服務條款', privacy: '隱私政策', afterSales: '售後政策',
    heroTitle: ['AI 驅動全球', '創意潮玩生態'], heroLead: '以 AI 創新為核心，融合 IP 孵化、智能製造與全球零售，讓創意走向商品，讓商品連接全球。', heroBody: '讓 AI 創意，成為真實商業價值。\nTurning AI Creativity into Real Business.\nAI 創作 × IP 孵化 × 智能製造 × 全球零售', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'AI 賦能創意 · 連接全球潮玩生態', aboutLead: '讓創意落地，讓潮玩走向全球',
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
    market: 'Store', account: 'My Account', preorder: 'Explore the Store', support: 'Customer Support', contact: 'Contact Us', terms: 'Terms of Service', privacy: 'Privacy Policy', afterSales: 'After-Sales Policy',
    heroTitle: ['AI-Powered Global', 'Creative Art Toy Ecosystem'], heroLead: 'Driven by AI innovation, we integrate IP incubation, smart manufacturing, and global retail to transform creative ideas into products and connect them with markets worldwide.', heroBody: 'Turning AI Creativity into Real Business Value.\nTurning AI Creativity into Real Business.\nAI Creation × IP Incubation × Smart Manufacturing × Global Retail', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'Empowering Creativity with AI · Connecting the Global Art Toy Ecosystem', aboutLead: 'Bringing Creativity to Life, Taking Art Toys Global',
    about: [
      { title: 'Who We Are', english: 'AI-Powered Creative Art Toy Platform', body: 'Empowering creative commerce through AI technology and industry resources.' },
      { title: 'What We Do', english: 'Global Art Toy Retail & Consignment', body: 'Providing art toy retail, individual storefront consignment services, and connections to consumers worldwide.' },
      { title: 'How We Do It', english: 'Integrated Online and Offline Ecosystem', body: 'Integrating online shopping, offline experiences, and AI-powered creation to build diverse consumer experiences.' },
      { title: 'Our Vision', english: 'Building a Global Creative Art Toy Ecosystem', body: 'We aspire to become a global leader in AI-powered creative art toy ecosystem platforms.' },
    ],
    aiTitle: 'AI-Driven Creative Commerce · Connecting the Global Industry Ecosystem', aiLead: 'AI Computing × Application Innovation × Industry Collaboration × Global Expansion',
    ai: [
      { title: 'AI Industry Development', english: 'MOONPLAY', body: 'Synergy Across Technology, Investment, and Industry Resources' },
      { title: 'AI Computing Infrastructure', english: 'GPU Computing', body: 'ASEAN AI Computing Network' },
      { title: 'AI Applications', english: 'AI Applications', body: 'Synergy Across Technology, Investment, and Industry Resources' },
      { title: 'Global Industry Collaboration', english: 'Global Partnerships', body: 'Global Network for Investment, Technology, and Business Partnerships' },
    ],
    resourcesTitle: 'Global Resources · Building the Art Toy Ecosystem Together', resourcesLead: 'Integrating industry capital, AI technology, smart manufacturing, and global distribution resources to build an AI-powered creative art toy industry ecosystem.',
    resources: [
      { title: 'Industry Capital', english: '42X FUND', body: 'Industry Investment & Resource Synergy' },
      { title: 'Research & Technology', english: 'Singapore Research Institutions', body: 'AI Research Collaboration & Technological Innovation' },
      { title: 'AI Computing Power', english: 'GPU Computing Centers', body: 'ASEAN AI Computing Network' },
      { title: 'Art Toy Brand Partnerships', english: 'Mighty Jaxx', body: 'International Art Toy Brand, Licensing & Distribution Partnerships' },
      { title: 'Global Industry Network', english: 'Factory + Creator', body: 'Flexible Manufacturing, Creators & Marketing Networks' },
      { title: 'Proprietary Platform Development', english: 'Marketplace + Studio', body: 'Art Toy Marketplace, IP Incubation & Product Development' },
    ],
    retailTitle: 'From Art Toy Retail to a Global AI Creative Ecosystem', retailLead: 'Starting with Art Toy Retail, Expanding into a Global Creative Ecosystem',
    retail: [
      { title: 'Business Beginnings · Building the Retail Foundation', english: 'COMMERCE FOUNDATION', body: 'AI-Powered Creative Art Toy Retail Platform\nCreative Product Development & Art Toy Retail\nOnline Channel Development & Membership Operations' },
      { title: 'Channel Expansion · Connecting Global Markets', english: 'GLOBAL RETAIL EXPANSION', body: 'AI-Powered New Retail and Creator Platform\nExpanding Global Creator and Supply Chain Networks\nDeveloping Offline Experiences and Brand Pop-Up Spaces' },
      { title: 'Business Beginnings · Building a Retail Foundation', english: 'COMMERCE FOUNDATION', body: 'AI-Powered Creative Art Toy Retail Platform\nCreative Product Development & Art Toy Retail\nOnline Channel Development & Membership Operations' },
    ],
    productsTitle: 'Products & Services', productsLead: 'Our products include art toys and AI tools, supported by end-to-end services spanning creation, production, and global delivery.',
    products: [
      { title: 'Creative Art Toy Marketplace', english: '01', body: 'Branded Art Toys · Original Art Toys · Creative Cards · Personalized Customization' },
      { title: 'Offline Art Toy Experiences', english: '02', body: 'Physical Art Toy Stores · Brand Showcases · AI Creation Experiences' },
      { title: 'AI Art Toy Creation Platform', english: '03', body: 'AI-Powered Creative Design · IP Incubation · Product Development' },
    ],
  },
  ko: {
    market: '스토어', account: '내 계정', preorder: '스토어 둘러보기', support: '고객 지원', contact: '문의하기', terms: '서비스 이용약관', privacy: '개인정보 처리방침', afterSales: '교환·반품 및 사후 서비스 정책',
    heroTitle: ['AI가 이끄는 글로벌', '크리에이티브 아트토이 생태계'], heroLead: 'AI 혁신을 핵심으로 IP 인큐베이팅, 스마트 제조 및 글로벌 유통을 융합하여 창의적인 아이디어를 상품으로 구현하고, 이를 전 세계 시장과 연결합니다.', heroBody: 'AI 창의성을 실질적인 비즈니스 가치로 전환합니다.\nTurning AI Creativity into Real Business.\nAI 창작 × IP 인큐베이팅 × 스마트 제조 × 글로벌 유통', heroTag: 'Powered by Moonplay AI',
    aboutTitle: 'AI로 창의성에 힘을 더하고 · 글로벌 아트토이 생태계를 연결하다', aboutLead: '창의성을 현실로, 아트토이를 세계로',
    about: [
      { title: '우리는 누구인가', english: 'AI 기반 크리에이티브 아트토이 플랫폼', body: 'AI 기술과 산업 자원을 활용하여 창의적인 소비에 새로운 가치를 더합니다.' },
      { title: '우리가 하는 일', english: '글로벌 아트토이 판매 및 위탁판매', body: '아트토이 상품 판매, 개인 스토어 위탁판매 및 글로벌 소비자 연계 서비스를 제공합니다.' },
      { title: '우리의 운영 방식', english: '온라인과 오프라인이 융합된 생태계', body: '온라인 쇼핑몰, 오프라인 체험 및 AI 창작을 융합하여 다양한 소비 환경을 구축합니다.' },
      { title: '우리의 목표', english: '글로벌 크리에이티브 아트토이 생태계 구축', body: '세계를 선도하는 AI 기반 크리에이티브 아트토이 생태계 플랫폼으로 성장하는 것을 목표로 합니다.' },
    ],
    aiTitle: 'AI가 주도하는 창의적 소비 · 글로벌 산업 생태계 연결', aiLead: 'AI 컴퓨팅 파워 × 응용 혁신 × 산업 협력 × 글로벌 확장',
    ai: [
      { title: 'AI 산업 전략', english: 'MOONPLAY', body: '기술, 투자 및 산업 자원의 유기적 협력' },
      { title: 'AI 컴퓨팅 인프라', english: 'GPU Computing', body: '아세안 AI 컴퓨팅 네트워크' },
      { title: 'AI 응용 서비스', english: 'AI Applications', body: '기술, 투자 및 산업 자원의 유기적 협력' },
      { title: '글로벌 산업 협력', english: 'Global Partnerships', body: '글로벌 투자, 기술 및 비즈니스 협력 네트워크' },
    ],
    resourcesTitle: '글로벌 자원 · 함께 만들어가는 아트토이 생태계', resourcesLead: '산업 자본, AI 기술, 스마트 제조 및 글로벌 유통 채널 자원을 통합하여 AI 기반 크리에이티브 아트토이 산업 생태계를 구축합니다.',
    resources: [
      { title: '산업 자본', english: '42X FUND', body: '산업 투자 및 자원 협력' },
      { title: '연구개발 기술', english: '싱가포르 연구기관', body: 'AI 연구 협력 및 기술 혁신' },
      { title: 'AI 컴퓨팅 파워', english: 'GPU Computing Centers', body: '아세안 AI 컴퓨팅 네트워크' },
      { title: '아트토이 브랜드 협력', english: 'Mighty Jaxx', body: '글로벌 아트토이 브랜드, 라이선싱 및 유통 채널 협력' },
      { title: '글로벌 산업 네트워크', english: 'Factory + Creator', body: '유연 생산 시스템, 크리에이터 및 마케팅 네트워크' },
      { title: '자체 플랫폼 구축', english: 'Marketplace + Studio', body: '아트토이 쇼핑몰, IP 인큐베이팅 및 제품 개발' },
    ],
    retailTitle: '아트토이 리테일에서 글로벌 AI 크리에이티브 생태계로', retailLead: '아트토이 리테일에서 글로벌 AI 크리에이티브 생태계로',
    retail: [
      { title: '비즈니스의 시작 · 리테일 기반 구축', english: 'COMMERCE FOUNDATION', body: 'AI 기반 크리에이티브 아트토이 리테일 플랫폼\n창의적인 상품 개발 및 아트토이 판매\n온라인 유통 채널 구축 및 회원 운영' },
      { title: '유통 채널 확장 · 글로벌 시장 연결', english: 'GLOBAL RETAIL EXPANSION', body: 'AI 기반의 새로운 리테일 및 크리에이터 플랫폼\n글로벌 크리에이터 및 공급망 네트워크 확대\n오프라인 체험 공간 및 브랜드 팝업스토어 확대' },
      { title: '비즈니스의 시작 · 리테일 기반 구축', english: 'COMMERCE FOUNDATION', body: 'AI 기반 크리에이티브 아트토이 리테일 플랫폼\n창의적인 상품 개발 및 아트토이 판매\n온라인 유통 채널 구축 및 회원 운영' },
    ],
    productsTitle: '제품 및 서비스', productsLead: '아트토이와 AI 도구를 핵심 제품으로 제공하며, 창작부터 글로벌 배송까지 전 과정을 아우르는 통합 서비스를 제공합니다.',
    products: [
      { title: '크리에이티브 아트토이 스토어', english: '01', body: '브랜드 아트토이 · 오리지널 아트토이 · 크리에이티브 카드 · 맞춤형 제작' },
      { title: '오프라인 아트토이 체험', english: '02', body: '아트토이 오프라인 매장 · 브랜드 전시 · AI 창작 체험' },
      { title: 'AI 아트토이 창작 플랫폼', english: '03', body: 'AI 크리에이티브 디자인 · IP 인큐베이팅 · 제품 개발' },
    ],
  },
}
