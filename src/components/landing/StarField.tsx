import type { CSSProperties } from 'react'

function createRandom(seed: number) {
  let state = seed
  return () => (state = (state * 16807) % 2147483647) / 2147483647
}

const random = createRandom(11)
const dots = Array.from({ length: 44 }, () => ({
  left: `${random() * 100}%`,
  top: `${random() * 100}%`,
  '--s': `${1 + random() * 2.2}px`,
  '--d': `${2.4 + random() * 4}s`,
  '--t': `${-random() * 6}s`,
}))
const sparks = [
  { left: '8%', top: '20%', '--s': '16px', '--d': '3.4s', '--t': '-0.4s' },
  { left: '46%', top: '12%', '--s': '11px', '--d': '4.2s', '--t': '-2s' },
  { left: '91%', top: '30%', '--s': '20px', '--d': '3.8s', '--t': '-1.2s' },
  { left: '58%', top: '78%', '--s': '13px', '--d': '4.6s', '--t': '-3s' },
  { left: '24%', top: '84%', '--s': '10px', '--d': '3.2s', '--t': '-1.6s' },
]
const meteors = [
  { left: '82%', top: '6%', '--d': '9s', '--t': '1.5s' },
  { left: '60%', top: '2%', '--d': '13s', '--t': '6s' },
  { left: '96%', top: '34%', '--d': '11s', '--t': '9s' },
]

const asStyle = (value: object) => value as CSSProperties

/** 純裝飾的星空動畫層：閃爍星點、四角星與流星。 */
export function StarField() {
  return <div className="starfield" aria-hidden="true">
    {dots.map((style, index) => <i className="starfield__dot" key={`d${index}`} style={asStyle(style)} />)}
    {sparks.map((style, index) => <i className="starfield__spark" key={`s${index}`} style={asStyle(style)} />)}
    {meteors.map((style, index) => <i className="starfield__meteor" key={`m${index}`} style={asStyle(style)} />)}
  </div>
}
