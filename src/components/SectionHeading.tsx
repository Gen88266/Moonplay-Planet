interface SectionHeadingProps {
  kicker: string
  title: string
  body?: string
  light?: boolean
}

export function SectionHeading({ kicker, title, body, light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading reveal${light ? ' section-heading--light' : ''}`}>
      <div><p className="eyebrow">{kicker}</p><h2>{title}</h2></div>
      {body && <p className="section-heading__body">{body}</p>}
    </div>
  )
}
