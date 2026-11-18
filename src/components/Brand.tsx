interface BrandProps { light?: boolean }

export function Brand({ light = false }: BrandProps) {
  return (
    <a className={`brand${light ? ' brand--light' : ''}`} href="/#top" aria-label="Moonplay Planet">
      {light ? <>
        <span className="brand__mark"><img src="/images/MoonPlay-Planet- LOGO.png" alt="" /></span>
        <span className="brand__type"><strong>MOONPLAY</strong><small>PLANET</small></span>
      </> : <img className="brand__image" src="/imgs/moonplay-header-logo.webp" alt="" />}
    </a>
  )
}
