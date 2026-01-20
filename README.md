# Rakuten Contentful Portfolio

A modern, headless CMS-powered portfolio and blog website built with Next.js and Contentful. This project showcases professional work, case studies, and blog articles with a focus on user experience and content management.

## 🚀 Features

### Core Features
- **Contentful CMS Integration** - Headless content management with GraphQL API
- **Blog System** - Dynamic blog posts with rich text content, images, quotes, and case studies
- **Portfolio Showcase** - Featured projects with detailed case studies
- **Internationalization (i18n)** - Multi-language support with locale routing
- **Contentful Live Preview** - Real-time content preview with inspector mode
- **Page View Tracking** - Session-based tracking of viewed articles with visual indicators
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **SEO Optimized** - Dynamic metadata, sitemap generation, and structured data

### User Experience Features
- **Article View Tracking** - Visual checkmarks on viewed articles
- **Scroll Position Restoration** - Maintains scroll position when navigating back
- **Smooth Animations** - Hover effects and transitions
- **Rich Content Components** - Support for images, quotes, feature sections, and project case studies

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Contentful
- **GraphQL**: GraphQL Code Generator for type-safe queries
- **Internationalization**: next-i18n-router, react-i18next
- **Analytics**: Vercel Analytics & Speed Insights
- **Live Preview**: @contentful/live-preview

## 📋 Prerequisites

- Node.js >= 18
- Yarn (package manager)
- Contentful account with a space configured

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/K-Zimny/rakuten-contentful.git
cd rakuten-contentful
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token
CONTENTFUL_SPACE_ENVIRONMENT=master
CONTENTFUL_PREVIEW_SECRET=your_preview_secret

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Where to find these values:**
- **Space ID**: Contentful web app → Settings → General settings
- **Delivery API Token**: Contentful web app → Settings → API keys → Content delivery / preview tokens
- **Preview Secret**: Generate a random secret string for preview authentication

### 4. Generate GraphQL Types

```bash
yarn graphql-codegen:generate
```

This generates TypeScript types from your Contentful GraphQL schema.

### 5. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
rakuten-contentful/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── page.tsx       # Landing page
│   │   │   └── [slug]/        # Blog post pages
│   │   └── api/               # API routes
│   │       └── enable-draft/ # Draft mode endpoint
│   ├── components/
│   │   ├── features/          # Feature components
│   │   │   ├── article/      # Article-related components
│   │   │   └── contentful/   # Contentful integration components
│   │   ├── shared/           # Shared UI components
│   │   └── templates/        # Layout components (Header, Footer)
│   ├── lib/
│   │   ├── __generated/       # Generated GraphQL types
│   │   ├── graphql/          # GraphQL query files
│   │   └── client.ts         # GraphQL client setup
│   ├── i18n/                 # Internationalization config
│   └── utils/                # Utility functions
│       └── pageViewed.js     # Page view tracking
├── public/
│   └── locales/             # Translation files
└── config/                  # Next.js configuration
```

## 🎨 Key Components

### Article Components
- **ArticleHero** - Featured article hero section with image and metadata
- **ArticleTile** - Article card with view tracking indicator
- **ArticleTileGrid** - Grid layout for article listings
- **ArticleContent** - Rich text content renderer
- **ArticleProject** - Case study/project showcase
- **ArticleQuote** - Quote block component
- **ArticleFeatureSection** - Feature section with customizable layouts
- **BackToHome** - Navigation component with scroll restoration

### Contentful Integration
- **CtfRichText** - Renders Contentful rich text fields
- **CtfImage** - Optimized image component
- **CtfPreviewProvider** - Live preview provider wrapper

## 🔄 Contentful Live Preview

The project includes Contentful Live Preview integration for real-time content editing:

1. **Configuration**: Live preview is configured in `src/app/[locale]/layout.tsx`
2. **Inspector Mode**: Click on content elements to jump to fields in Contentful
3. **Live Updates**: Content updates automatically as you type in Contentful
4. **Setup**: Configure preview URLs in Contentful Settings → Content Preview

## 📊 Page View Tracking

The application tracks viewed articles using session storage:

- **Storage**: Uses `sessionStorage` to track viewed article titles
- **Visual Indicator**: Green checkmark badge appears on viewed articles
- **Persistence**: Tracks views across page navigation within the session
- **Implementation**: `src/utils/pageViewed.js` handles storage logic

## 🌐 Internationalization

The project supports multiple locales:

- **Configuration**: `src/i18n/config.ts`
- **Translation Files**: `public/locales/{locale}/common.json`
- **Routing**: Automatic locale detection and routing via `next-i18n-router`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_SECRET`
- `NEXT_PUBLIC_BASE_URL` (your production URL)

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking
- `yarn graphql-codegen:generate` - Generate GraphQL types
- `yarn graphql-codegen:watch` - Watch mode for GraphQL codegen

## 🎯 Content Models

The project uses the following Contentful content types:

- **PageBlogPost** - Blog articles
- **PageLanding** - Landing page content
- **ProjectCaseStudy** - Project case studies
- **ComponentQuote** - Quote blocks
- **ComponentRichImage** - Rich image blocks
- **ComponentFeatureSection** - Feature sections
- **ComponentAuthor** - Author information
- **ComponentSeo** - SEO metadata

## 🔐 Security

- Preview secret is required for draft mode access
- Environment variables are not exposed to the client
- Contentful API tokens should be kept secure

## 📄 License

MIT

## 👤 Author

Kenneth Zimny

---

Built with ❤️ using Next.js and Contentful
