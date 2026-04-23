import { lazy, Suspense, type ComponentType } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { PageTransition } from './layout/PageTransition'

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-accent)]" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-neon-blue)]" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">Loading...</span>
      </div>
    </div>
  )
}

function LazyPage({ Component }: { Component: ComponentType }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PageTransition>
        <Component />
      </PageTransition>
    </Suspense>
  )
}

const HomePage = lazy(() => import('@/pages/Home/HomePage'))
const TypographyPage = lazy(() => import('@/pages/Typography/TypographyPage'))
const AnimationsPage = lazy(() => import('@/pages/Animations/AnimationsPage'))
const LayoutsPage = lazy(() => import('@/pages/Layouts/LayoutsPage'))
const ThreeDPage = lazy(() => import('@/pages/ThreeD/ThreeDPage'))
const InteractivePage = lazy(() => import('@/pages/Interactive/InteractivePage'))
const ColorPage = lazy(() => import('@/pages/ColorGradients/ColorPage'))
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
const EcommercePage = lazy(() => import('@/pages/Ecommerce/EcommercePage'))
const PortfolioPage = lazy(() => import('@/pages/Portfolio/PortfolioPage'))
const GamesPage = lazy(() => import('@/pages/Games/GamesPage'))
const MobilePage = lazy(() => import('@/pages/MobileUI/MobilePage'))
const GenerativePage = lazy(() => import('@/pages/GenerativeArt/GenerativePage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LazyPage Component={HomePage} /> },
      { path: 'typography', element: <LazyPage Component={TypographyPage} /> },
      { path: 'animations', element: <LazyPage Component={AnimationsPage} /> },
      { path: 'layouts', element: <LazyPage Component={LayoutsPage} /> },
      { path: '3d', element: <LazyPage Component={ThreeDPage} /> },
      { path: 'interactive', element: <LazyPage Component={InteractivePage} /> },
      { path: 'colors', element: <LazyPage Component={ColorPage} /> },
      { path: 'dashboard', element: <LazyPage Component={DashboardPage} /> },
      { path: 'ecommerce', element: <LazyPage Component={EcommercePage} /> },
      { path: 'portfolio', element: <LazyPage Component={PortfolioPage} /> },
      { path: 'games', element: <LazyPage Component={GamesPage} /> },
      { path: 'mobile', element: <LazyPage Component={MobilePage} /> },
      { path: 'generative', element: <LazyPage Component={GenerativePage} /> },
    ],
  },
])
