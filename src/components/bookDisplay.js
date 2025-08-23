// Use React to display book in three columns: original text, translation, and notes.

import React from 'react';
import GreekWordDictionary from '@site/src/components/GreekWordDictionary.js'; 


// Spanish labels for notes
const NOTES_LABELS = {
  notesBiblical: "Referencias bíblicas",
  notesGeneral: "Notas en general",
  notesGreek: "Notas sobre términos griegos",
  notesLinguistics: "Notas sobre lingüística griega"
};

const NotesBlock = ({ notes }) => {
  if (!notes) return null;
  const noteEntries = Object.entries(notes).filter(([_, v]) => v && v.trim() !== '');
  if (noteEntries.length === 0) return null;
  return (
    <div style={{ fontSize: '0.85em', color: 'var(--ifm-color-primary-light)', marginTop: 4 }}>
      {noteEntries.map(([key, value]) => (
        <div key={key}>
          <strong>{NOTES_LABELS[key] || key.replace('notes', '')}:</strong> {value}
        </div>
      ))}
    </div>
  );
};


export default function BookDisplay({ data }) {
  if (!Array.isArray(data)) return <div>No data found.</div>;
  return (
    <div style={{ margin: '2em 0' }}>
      {data.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: '2em' }}>
          <h2 id={`section-${section.section}`}>Section {section.section}</h2>
          <div style={{
            background: 'var(--ifm-card-background-color)', 
            padding: '0.75em 1em',
            borderRadius: 6,
            marginBottom: '1em',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}>
            Capítulo: {section.chapter} &nbsp; | &nbsp; Sección: {section.section}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1.5fr',
            gap: '1em',
            background: 'var(--ifm-card-background-color)',
            borderRadius: 6,
            border: '1px solid #eee',
            padding: '1em'
          }}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Griego</div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Traducción Española</div>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Notas</div>
            {(section.translation || []).map((tr, idx) => (
              <React.Fragment key={idx}>
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  <GreekWordDictionary>
                    {tr.text?.originalGreekText || <span style={{ color: '#aaa' }}>—</span>}
                  </GreekWordDictionary>
                </div>
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  {tr.text?.spanishTranslation || <span style={{ color: '#aaa' }}>—</span>}
                </div>
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  <NotesBlock notes={tr.notes} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Named export for Docusaurus TOC integration
export function generateTOC(data) {
  if (!Array.isArray(data)) return [];
  return data.map(section => ({
    value: `Section ${section.section}`,
    id: `section-${section.section}`,
    level: 2,
  }));
}

