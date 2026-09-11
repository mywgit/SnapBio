export interface ComparisonRow {
  feature: string;
  featureZh: string;
  snapbio: string;
  snapbioZh: string;
  competitor: string;
  competitorZh: string;
}

export interface AlternativePageData {
  slug: string;
  path: string;
  title: string;
  titleZh: string;
  metaDesc: string;
  metaDescZh: string;
  badge: string;
  badgeZh: string;
  h1: string;
  h1Zh: string;
  subheading: string;
  subheadingZh: string;
  competitorName: string;
  whySwitchTitle: string;
  whySwitchTitleZh: string;
  whySwitchDesc: string;
  whySwitchDescZh: string;
  comparisons: ComparisonRow[];
  faqs: { question: string; questionZh: string; answer: string; answerZh: string }[];
}

export const ALTERNATIVE_PAGES: AlternativePageData[] = [
  {
    slug: "linktree-alternative",
    path: "/linktree-alternative",
    title: "Best Free Linktree Alternative (2026) - Notion Style & Custom Domains | SnapBio",
    titleZh: "Linktree 最佳免费替代品 (2026) - Notion 美学与独立域名 | SnapBio",
    metaDesc: "Looking for the best Linktree alternative in 2026? SnapBio offers 100% free Notion-style bio pages, 8 premium themes, custom domain connection, and 0% commission tip jar.",
    metaDescZh: "寻找 2026 年最佳 Linktree 免费替代品？SnapBio 提供 100% 免费的 Notion 风格个人主页、8 套高端磨砂主题、顶级独立域名绑定与 0 抽成打赏功能。",
    badge: "2026 Best Linktree Alternative",
    badgeZh: "2026 最佳 Linktree 替代品",
    h1: "The Modern, Notion-Style Alternative to Linktree",
    h1Zh: "超越 Linktree 的现代 Notion 风格创作者多合一主页",
    subheading: "Stop paying $5-$24/month for basic customization. SnapBio delivers luxury Notion aesthetics, instant real-time editing, custom domain SSL binding, and 100% in-browser privacy.",
    subheadingZh: "无需每月支付 $5 到 $24 美元购买基础功能。SnapBio 为你带来 Notion 级高端视觉美学、实时毫秒级编辑、独立域名自动绑定与 100% 本地隐私保护。",
    competitorName: "Linktree",
    whySwitchTitle: "Why top creators & indie hackers switch from Linktree to SnapBio",
    whySwitchTitleZh: "为什么越来越多的顶尖博主与独立开发者选择从 Linktree 迁移至 SnapBio？",
    whySwitchDesc: "Linktree charges aggressive subscription tiers for custom domains and removes basic design freedom behind paywalls. SnapBio re-imagines the link-in-bio experience with Notion modular blocks, direct Stripe integration, and zero platform commission.",
    whySwitchDescZh: "Linktree 对绑定独立域名收取昂贵的阶梯月费，并将许多基础设计样式锁在付费墙后。SnapBio 用模块化 Notion 网格、直连 Stripe 零抽成收款与自动化顶级域名绑定重新定义了创作者主页。",
    comparisons: [
      {
        feature: "Custom Domain Connection (顶级独立域名)",
        featureZh: "绑定个人独立域名 (Custom Domain)",
        snapbio: "Automated Vercel SSL integration ($5/mo Pro)",
        snapbioZh: "全自动 Vercel 云端绑定 + 免费 SSL 证书 ($5/月)",
        competitor: "Requires Linktree Premium ($24/month)",
        competitorZh: "需订阅高阶 Linktree Premium ($24/月)",
      },
      {
        feature: "Design Aesthetic & Themes (视觉美学)",
        featureZh: "页面设计与主题质感",
        snapbio: "8 Luxury Notion & Cyberpunk Glassmorphism Themes",
        snapbioZh: "8 套高品质 Notion 极简与赛博朋克玻璃拟态主题",
        competitor: "Generic button stack with limited palette",
        competitorZh: "同质化严重的常规按钮列表",
      },
      {
        feature: "Platform Commission on Tips (打赏抽成)",
        featureZh: "粉丝打赏与商品抽成",
        snapbio: "0% Platform Fee (Direct Stripe Payout)",
        snapbioZh: "0% 平台抽成 (直接结算到个人 Stripe 账户)",
        competitor: "Takes up to 9% fee on free plans",
        competitorZh: "免费版抽取高达 9% 的交易手续费",
      },
      {
        feature: "Embeds & Rich Media (多媒体嵌入)",
        featureZh: "YouTube 视频与多媒体嵌入",
        snapbio: "Native interactive video players & newsletter forms",
        snapbioZh: "原生交互式 YouTube 播放器与邮件订阅组件",
        competitor: "Limited interactive embeds on lower tiers",
        competitorZh: "低阶套餐对富媒体嵌入限制严格",
      },
      {
        feature: "Speed & Performance (加载速度)",
        featureZh: "首屏秒开与访问速度",
        snapbio: "Sub-second global CDN edge rendering",
        snapbioZh: "全球 Edge CDN 边缘节点渲染，毫秒级秒开",
        competitor: "Heavy tracking scripts and third-party bloat",
        competitorZh: "带有大量分析跟踪脚本，移动端加载较慢",
      },
    ],
    faqs: [
      {
        question: "Is SnapBio really free compared to Linktree?",
        questionZh: "相比 Linktree，SnapBio 真的可以免费使用吗？",
        answer: "Yes! All core features including 8 premium themes, YouTube video embeds, social icon links, and instant mobile preview are 100% free with no credit card required.",
        answerZh: "是的！SnapBio 的核心功能（包括 8 套高级主题、YouTube 视频直接嵌入、社交图标矩阵和实时手机预览）全部 100% 免费，无需绑定信用卡。",
      },
      {
        question: "Can I connect my own custom domain (e.g. bio.myname.com)?",
        questionZh: "我可以绑定自己的个人顶级独立域名吗？",
        answer: "Absolutely. SnapBio Pro includes automated custom domain registration and SSL certificate provisioning powered by Vercel edge infrastructure.",
        answerZh: "当然可以。SnapBio Pro 会员支持一键全自动绑定个人独立域名，并由 Vercel 全球云端自动签发免费 HTTPS SSL 证书。",
      },
    ],
  },
  {
    slug: "bento-me-alternative",
    path: "/bento-me-alternative",
    title: "Best Bento.me Alternative (2026) - Fast Notion Grid Bio Pages | SnapBio",
    titleZh: "Bento.me 最佳替代品 (2026) - 极速 Notion 网格流个人主页 | SnapBio",
    metaDesc: "Looking for a customizable Bento.me alternative? SnapBio offers Bento-style modular grid cards, instant in-browser editing, custom domain support, and zero ads.",
    metaDescZh: "寻找比 Bento.me 更灵活自由的微官网替代品？SnapBio 提供 Bento 式模块化网格卡片、免注册即刻编辑、独立域名绑定与零广告体验。",
    badge: "Bento.me Alternative",
    badgeZh: "Bento.me 极简替代品",
    h1: "A Faster, More Customizable Alternative to Bento.me",
    h1Zh: "比 Bento.me 更自由、加载更快的创作者主页工坊",
    subheading: "Love the Bento grid aesthetic but want custom domains, instant zero-login editing, and direct Stripe tipping? SnapBio is designed for developers, creators, and nomad hackers.",
    subheadingZh: "喜欢 Bento 的网格质感，但想要绑定独立顶级域名与免登录极速编辑？SnapBio 专为开发者、数字游民与海外博主量身打造。",
    competitorName: "Bento.me",
    whySwitchTitle: "Why creators choose SnapBio over Bento.me",
    whySwitchTitleZh: "为什么创作者选择 SnapBio 而不是 Bento.me？",
    whySwitchDesc: "Bento.me is visually pleasing but locks you into their proprietary closed ecosystem with waiting lists and limited monetization options. SnapBio gives you complete ownership with instant export, custom domain routing, and native Notion styling.",
    whySwitchDescZh: "Bento.me 设计优秀但生态封闭，排队限制多且商业化变现功能匮乏。SnapBio 赋予你 100% 的数据自主权、免排队即开即用、专属独立域名直连与纯粹的 Notion 美学风格。",
    comparisons: [
      {
        feature: "Account Onboarding (开箱即用)",
        featureZh: "使用门槛与开箱速度",
        snapbio: "Instant In-Browser Editing (Zero Waitlist)",
        snapbioZh: "打开网页即刻编辑，无需排队审批",
        competitor: "Requires invitation or account signup",
        competitorZh: "需要排队邀请或繁琐注册",
      },
      {
        feature: "Custom Domain Freedom (独立域名)",
        featureZh: "个人顶级域名解析",
        snapbio: "Full self-service automated DNS verification",
        snapbioZh: "提供专属 DNS 配置表与一键自检",
        competitor: "Requires expensive Pro upgrade",
        competitorZh: "需要订阅高价方案",
      },
      {
        feature: "Theme Diversity (主题多样性)",
        featureZh: "主题风格与预设",
        snapbio: "8 Custom Luxury Themes (Cyberpunk, Obsidian, Pastel)",
        snapbioZh: "8 套预设主题（黑曜石暗黑、赛博朋克、极简暖白等）",
        competitor: "Standard fixed dark/light mode",
        competitorZh: "仅支持基础黑白网格样式",
      },
    ],
    faqs: [
      {
        question: "How does SnapBio differ from Bento.me?",
        questionZh: "SnapBio 与 Bento.me 最大的区别是什么？",
        answer: "SnapBio focuses on open-web creator independence: faster sub-second load times, instant live mobile phone preview, automated custom domain routing, and 0% fee creator monetization.",
        answerZh: "SnapBio 专注于开放与创作者独立性：更快的首屏加载、右侧 iPhone 实时 1:1 预览、全自动化独立域名接入以及 0 平台抽成的打赏体系。",
      },
    ],
  },
  {
    slug: "beacons-ai-alternative",
    path: "/beacons-ai-alternative",
    title: "Beacons AI Alternative (2026) - Best Free Link-in-Bio with Zero Fees | SnapBio",
    titleZh: "Beacons.ai 最佳免费替代方案 (2026) - 零抽成与极速微官网 | SnapBio",
    metaDesc: "Looking for the best Beacons.ai alternative in 2026? SnapBio offers high-converting Notion-style bio pages, 0% commission on tips, custom domains, and sub-second load times.",
    metaDescZh: "寻找 2026 年最佳 Beacons.ai 替代工具？SnapBio 提供高转化 Notion 风格创作者主页、0% 打赏抽成、独立域名绑定与毫秒级首屏加载。",
    badge: "2026 Best Beacons.ai Alternative",
    badgeZh: "2026 最佳 Beacons.ai 替代方案",
    h1: "The Best Free Beacons AI Alternative for Creators",
    h1Zh: "专为创作者打造的最佳 Beacons AI 免费替代工具",
    subheading: "Stop paying 9% transaction fees and battling cluttered marketing dashboards. SnapBio puts your personal brand front and center with elegant Notion styling, custom domain routing, and zero ads.",
    subheadingZh: "摆脱高达 9% 的交易手续费与层层嵌套的繁杂仪表盘。SnapBio 以优雅的 Notion 美学、独立顶级域名接入与 100% 纯净无广告体验让你的品牌脱颖而出。",
    competitorName: "Beacons.ai",
    whySwitchTitle: "Why creators migrate from Beacons.ai to SnapBio",
    whySwitchTitleZh: "为什么越来越多的海外创作者从 Beacons.ai 迁移到 SnapBio？",
    whySwitchDesc: "Beacons.ai has evolved into a bloated marketing suite with aggressive upsells and high fees on free plans. SnapBio keeps what creators love: a fast, beautiful, Notion-inspired hub that converts visitors into followers and buyers without commission cuts.",
    whySwitchDescZh: "Beacons.ai 逐渐演变成一个臃肿复杂的营销套件，免费版抽取高达 9% 的佣金。SnapBio 坚守创作者最本质的需求：快速、优美、转化率极高且平台 0 抽成的高级个人品牌主页。",
    comparisons: [
      {
        feature: "Platform Commission on Sales/Tips (打赏抽成)",
        featureZh: "商品与打赏交易抽成",
        snapbio: "0% Commission (Keep 100% of your earnings)",
        snapbioZh: "0% 平台抽成 (100% 收益直接归创作者所有)",
        competitor: "Takes up to 9% fee on Free plan",
        competitorZh: "免费套餐抽取高达 9% 的交易手续费",
      },
      {
        feature: "Custom Domain SSL Connection (独立顶级域名)",
        featureZh: "绑定个人独立顶级域名",
        snapbio: "Automated Vercel edge SSL ($5/mo Pro)",
        snapbioZh: "全自动 Vercel 云端全球解析 + 免费 SSL",
        competitor: "Locked behind $10 - $30/month tiers",
        competitorZh: "仅限每月 $10 到 $30 美元的高阶付费方案",
      },
      {
        feature: "Simplicity & Dashboard Speed (极简专注度)",
        featureZh: "后台操作流畅度与直观性",
        snapbio: "Clean 4-tab workflow with 1:1 live phone preview",
        snapbioZh: "4 个核心标签页 + 手机 1:1 毫秒级实时所见即所得",
        competitor: "Bloated multi-layered marketing dashboard",
        competitorZh: "繁杂的多层级菜单，加载较慢且推销弹窗多",
      },
      {
        feature: "Page Performance & Load Speed (加载性能)",
        featureZh: "移动端加载性能与首屏时间",
        snapbio: "Sub-second edge CDN rendering (< 0.5s)",
        snapbioZh: "全球 Edge CDN 边缘节点渲染，平均 < 0.5 秒",
        competitor: "Heavy scripts, analytics, and third-party tracking",
        competitorZh: "包含大量追踪脚本与分析插件，首屏加载沉重",
      },
    ],
    faqs: [
      {
        question: "What makes SnapBio the best alternative to Beacons.ai in 2026?",
        questionZh: "为什么 SnapBio 是 2026 年替代 Beacons.ai 的最佳选择？",
        answer: "Unlike Beacons.ai which takes up to a 9% commission on your sales and clutters your page with upsells, SnapBio offers a 100% free Notion-style design, zero commission on your Stripe payouts, and lightning-fast sub-second loading.",
        answerZh: "与收取高达 9% 交易抽成并频繁推送升级广告的 Beacons.ai 不同，SnapBio 提供优雅的 Notion 式视觉、0 平台抽成直连 Stripe，以及全球毫秒级秒开的高性能体验。",
      },
      {
        question: "Can I migrate my Beacons links to SnapBio easily?",
        questionZh: "从 Beacons 迁移链接到 SnapBio 方便吗？",
        answer: "Yes! You can set up your entire SnapBio profile, social links, and rich media blocks in under 2 minutes without writing a single line of code.",
        answerZh: "非常简单！在 SnapBio 填入你的社交媒体账号与重要链接，不到 2 分钟就能完成全套搭建与发布。",
      },
      {
        question: "Does SnapBio support custom domains like bio.myname.com?",
        questionZh: "SnapBio 是否支持绑定类似于 bio.myname.com 的个人域名？",
        answer: "Yes! SnapBio Pro supports one-click automated custom domain connection with free SSL certificates provisioned automatically.",
        answerZh: "完全支持！SnapBio Pro 支持一键绑定个人专属独立域名，系统自动签发终身免费的 HTTPS 安全证书。",
      },
    ],
  },
];

export function getAlternativeBySlug(slug: string): AlternativePageData | undefined {
  return ALTERNATIVE_PAGES.find((page) => page.slug === slug);
}
