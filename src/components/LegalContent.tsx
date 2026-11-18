import { legalIntro, legalNotice, legalSections } from '@/i18n/legal'

/** 《全球用戶法律、合規與風險聲明》全文；顏色繼承父層，可放在淺色彈窗或深色頁面。 */
export function LegalContent() {
  return (
    <div className="legal-content">
      <p>{legalNotice}</p>
      {legalIntro.map((text) => <p key={text}>{text}</p>)}
      {legalSections.map((section) => (
        <section key={section.heading}>
          <h3>{section.heading}</h3>
          {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
          {section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}
          {section.closing?.map((text) => <p key={text}>{text}</p>)}
        </section>
      ))}
    </div>
  )
}
