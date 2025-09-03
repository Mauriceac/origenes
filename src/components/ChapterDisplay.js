import React from 'react';

// Helper to extract sections from chapter JSON
function extractSections(chapterData) {
  // Find the chapters array
  const chaptersArr = chapterData.find(obj => Array.isArray(obj.chapters))?.chapters || [];
  let sections = [];
  chaptersArr.forEach(chap => {
    (chap.sections || []).forEach(section => {
      // If section.text is an array of objects with nested chapters/sections/text, flatten it
      let lines = [];
      (section.text || []).forEach(line => {
        if (line.chapters) {
          line.chapters.forEach(chap2 => {
            (chap2.sections || []).forEach(sec2 => {
              (sec2.text || []).forEach(txt => {
                lines.push(txt);
              });
            });
          });
        } else if (line.text) {
          // If line.text is an array, push each
          if (Array.isArray(line.text)) {
            line.text.forEach(txt => lines.push(txt));
          } else {
            lines.push(line.text);
          }
        } else {
          lines.push(line);
        }
      });
      sections.push({ ...section, text: lines });
    });
  });
  return sections;
}

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


export default function ChapterDisplay({ data }) {
  const sections = extractSections(data);

  return (
    <div style={{ margin: '2em 0' }}>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: '2em' }}>
          <h2 id={`section-${section.section}`}>Sección {section.section}</h2>
          <div style={{
            background: 'var(--ifm-card-background-color)',
            padding: '0.75em 1em',
            borderRadius: 6,
            marginBottom: '1em',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}>
            Sección: {section.section}
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
            {(section.text || []).map((line, idx) => (
              <React.Fragment key={idx}>                
                {/* add full-width row with line numbers */}
                {line.lineNumber && line.lineNumber.length > 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    background: 'var(--text-box)',
                    padding: '0.5em',
                    borderRadius: 4,
                    marginBottom: '0.5em',
                    fontSize: '0.9em'
                  }}>
                    <strong>Líneas:</strong> {line.lineNumber.join(', ')}
                  </div>
                )}
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  {/* Try to show originalText, else show nothing */}
                  {line.originalText ? line.originalText : <span style={{ color: '#aaa' }}>—</span>}
                </div>
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  {line.spanishTranslation || <span style={{ color: '#aaa' }}>—</span>}
                </div>
                <div style={{ padding: '0.5em 0', borderBottom: '1px solid #f0f0f0' }}>
                  <NotesBlock notes={line.notes} />
                </div>
                {/* If there are keywords, display them in a full-width row */}
                {line.keywords && line.keywords.length > 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    // background: 'var(--text-box)',
                    padding: '0.5em',
                    borderRadius: 4,
                    marginBottom: '0.5em',
                    fontSize: '0.9em'
                  }}>
                    <strong>Palabras clave:</strong> {line.keywords.join(', ')}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Generate TOC for Docusaurus
export function generateTOC(data) {
  const sections = extractSections(data);
  return sections.map(section => ({
    value: `Sección ${section.section}`,
    id: `section-${section.section}`,
    level: 2,
  }));
}
