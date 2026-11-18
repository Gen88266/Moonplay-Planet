import type { CSSProperties } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Brand } from '@/components/Brand'
import { StarField } from '@/components/landing/StarField'
import { setNotice } from '@/features/site/siteSlice'
import { homeCopy } from '@/i18n/home'
import { messages } from '@/i18n/messages'
import { useHeroParallax } from '@/hooks/useHeroParallax'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const artwork = {
  about: ['about-who', 'about-what', 'about-how', 'about-goal'],
  ai: ['ai-industry', 'ai-computing', 'ai-applications', 'ai-partnerships'],
  resources: ['resource-capital', 'resource-research', 'resource-computing', 'resource-brand', 'resource-network', 'resource-platform'],
  retail: ['retail-foundation', 'retail-expansion', 'retail-creation'],
} as const

const stagger = (index: number) => ({ '--reveal-delay': `${index * 90}ms` }) as CSSProperties

function Heading({ title, lead }: { title: string; lead: string }) {
  return <div className="landing-heading reveal"><h2>{title}</h2><p>{lead}</p></div>
}

export function HomePage() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.site.locale)
  const copy = homeCopy[locale]
  const common = messages[locale]
  const signedInEmail = useAppSelector((state) => state.account.email)
  const heroRef = useHeroParallax<HTMLElement>()
  useScrollReveal('home')

  return <div className="landing">
    <main>
      <section className="landing-hero" aria-labelledby="landing-hero-title" ref={heroRef}>
        <div className="landing-hero__bg" aria-hidden="true" />
        <div className="landing-hero__glow" aria-hidden="true" />
        <StarField />
        <div className="landing-hero__scroll" aria-hidden="true" />
        <div className="landing-shell landing-hero__grid">
          <div className="landing-hero__copy">
            <p className="landing-hero__brand">MOONPLAY PLANET <small>{copy.heroTag}</small></p>
            <h1 id="landing-hero-title"><span>{copy.heroTitle[0]}</span><span>{copy.heroTitle[1]}</span></h1>
            <p className="landing-hero__lead">{copy.heroLead}</p>
            <p className="landing-hero__body">{copy.heroBody}</p>
            <a className="landing-cta" href={signedInEmail ? '/person' : '/#account'}>{copy.preorder}<span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--about" id="about">
        <div className="landing-shell">
          <Heading title={copy.aboutTitle} lead={copy.aboutLead} />
          <div className="about-grid">{copy.about.map((item, index) => <article className="about-card landing-card reveal" key={index} style={stagger(index)}>
            <img className="about-card__art" src={`/imgs/${artwork.about[index]}.webp`} alt="" loading="lazy" />
            <div className="about-card__copy"><h3>{item.title}</h3><strong>{item.english}</strong><p>{item.body}</p></div>
          </article>)}</div>
        </div>
      </section>

      <section className="landing-section landing-section--ai" id="ai">
        <div className="landing-shell">
          <Heading title={copy.aiTitle} lead={copy.aiLead} />
          <div className="ai-grid">{copy.ai.map((item, index) => <article className="ai-card landing-card reveal" key={index} style={stagger(index)}>
            <span className="ai-card__number">{String(index + 1).padStart(2, '0')}</span>
            <div className="ai-card__copy"><h3>{item.title}</h3><strong>{item.english}</strong><p>{item.body}</p></div>
            <img className="ai-card__art" src={`/imgs/${artwork.ai[index]}.webp`} alt="" loading="lazy" />
          </article>)}</div>
        </div>
      </section>

      <section className="landing-section landing-section--resources" id="resources">
        <div className="landing-shell">
          <Heading title={copy.resourcesTitle} lead={copy.resourcesLead} />
          <div className="resources-grid">{copy.resources.map((item, index) => <article className="resource-card landing-card reveal" key={index} style={stagger(index)}>
            <div className="resource-card__copy"><h3>{item.title}</h3><strong>{item.english}</strong><p>{item.body}</p></div>
            <img className="resource-card__art" src={`/imgs/${artwork.resources[index]}.webp`} alt="" loading="lazy" />
          </article>)}</div>
        </div>
      </section>

      <section className="landing-section landing-section--retail" id="retail">
        <div className="landing-shell">
          <Heading title={copy.retailTitle} lead={copy.retailLead} />
          <div className="retail-grid">{copy.retail.map((item, index) => <article className="retail-card landing-card reveal" key={index} style={stagger(index)}>
            <img className="retail-card__art" src={`/imgs/${artwork.retail[index]}.webp`} alt="" loading="lazy" />
            <div className="retail-card__copy"><small>{item.english}</small><h3>{item.title}</h3><p>{item.body}</p></div>
          </article>)}</div>
        </div>
      </section>

      <section className="landing-section landing-section--products" id="products">
        <div className="landing-shell">
          <Heading title={copy.productsTitle} lead={copy.productsLead} />
          <div className="services-grid">{copy.products.map((item, index) => <article className="service-card landing-card reveal" key={item.english} style={stagger(index)}>
            <span>{item.english}</span><div><h3>{item.title}</h3><p>{item.body}</p></div>
          </article>)}</div>
        </div>
      </section>
    </main>

    <footer className="landing-footer"><div className="landing-shell landing-footer__inner">
      <Brand />
      <div><strong>{copy.support}</strong><nav aria-label={copy.support}>
        <button type="button" onClick={() => dispatch(setNotice(common.soon))}>{copy.contact}</button>
        <a href="/#account/terms">{copy.terms}</a><a href="/#account/privacy">{copy.privacy}</a>
        <button type="button" onClick={() => dispatch(setNotice(common.soon))}>{copy.afterSales}</button>
      </nav></div>
      <small>© 2026 MOONPLAY PLANET. ALL RIGHTS RESERVED.</small>
    </div></footer>
  </div>
}
