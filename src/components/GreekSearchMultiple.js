

import React, { useState } from 'react';

// Helper to get all unique lemmas from all dictionaries
function getAllUniqueLemmas(dictionaries) {
  const lemmas = new Set();
  dictionaries.forEach(({ dict }) => {
    Object.values(dict).forEach(arr => {
      arr.forEach(entry => {
        if (entry.lemma) lemmas.add(entry.lemma);
      });
    });
  });
  return Array.from(lemmas).sort((a, b) => a.localeCompare(b, 'el'));
}

// Helper to flatten all entries for a lemma from all dictionaries
function getEntriesForLemma(dictionaries, lemma) {
  const entries = [];
  dictionaries.forEach(({ dict, text }, idx) => {
    Object.values(dict).forEach(arr => {
      arr.forEach(entry => {
        if (entry.lemma === lemma) {
          // Find corresponding text sections
          let textMatches = [];
          if (entry.lines) {
            text.forEach(section => {
              (section.translation || []).forEach(tr => {
                if (tr.lines && tr.text?.originalGreekText) {
                  if (tr.lines.some(line => entry.lines.includes(line.toString()) || entry.lines.includes(line))) {
                    textMatches.push({
                      greek: tr.text.originalGreekText,
                      spanish: tr.text.spanishTranslation,
                      notes: tr.notes,
                      lines: tr.lines,
                      chapter: tr.chapter !== undefined ? tr.chapter : section.chapter,
                      section: tr.section !== undefined ? tr.section : section.section
                    });
                  }
                }
              });
            });
          }
          // Get titleSpanish from first matching translation metadata
          let titleSpanish = '';
          if (textMatches.length > 0) {
            const firstMatch = textMatches[0];
            // Try to get from the corresponding section
            const sectionObj = text.find(section =>
              (section.translation || []).some(tr =>
                tr.text?.originalGreekText === firstMatch.greek
              )
            );
            if (sectionObj) {
              const trObj = (sectionObj.translation || []).find(tr => tr.text?.originalGreekText === firstMatch.greek);
              if (trObj && trObj.metadata && trObj.metadata.titleSpanish) {
                titleSpanish = trObj.metadata.titleSpanish;
              }
            }
          }
          entries.push({
            source: idx,
            word: entry.word,
            morph: entry.morph,
            lines: entry.lines,
            textMatches,
            titleSpanish
          });
        }
      });
    });
  });
  return entries;
}

// Highlight matched words in Greek sentence
function highlightWords(text, words) {
  if (!words || words.length === 0) return text;
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  let highlighted = text;
  sortedWords.forEach(word => {
    const safeWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    highlighted = highlighted.replace(
      new RegExp(safeWord, 'g'),
      `<span style="background: var(--highlight); border-radius: 3px; padding: 0 2px;">${word}</span>`
    );
  });
  return highlighted;
}

export default function MultiGreekSearch({ dictionaries }) {
  const [selectedLemma, setSelectedLemma] = useState('');
  const allLemmas = getAllUniqueLemmas(dictionaries);
  const results = selectedLemma ? getEntriesForLemma(dictionaries, selectedLemma) : [];

  return (
    <div style={{ display: 'flex', gap: '2em', margin: '2em 0' }}>
      {/* Lemma list */}
      <div style={{ flex: '1 1 0', maxWidth: 320 }}>
        <h3 style={{ marginBottom: 8 }}>Lemas griegos</h3>
        <div style={{
          maxHeight: 500,
          overflowY: 'auto',
          border: '1px solid var(--ifm-color-primary-lightest)',
          borderRadius: 6,
          background: 'var(--ifm-card-background-color)',
          padding: '0.5em'
        }}>
          {allLemmas.map(lemma => (
            <div
              key={lemma}
              style={{
                padding: '0.4em 0.5em',
                cursor: 'pointer',
                background: selectedLemma === lemma ? 'var(--ifm-color-primary-lightest)' : 'transparent',
                borderRadius: 4,
                fontWeight: selectedLemma === lemma ? 'bold' : 'normal'
              }}
              onClick={() => setSelectedLemma(lemma)}
            >
              {lemma}
            </div>
          ))}
        </div>
      </div>
      {/* Results */}
      <div style={{ flex: '2 1 0', minWidth: 0 }}>
        {selectedLemma && (
          <div style={{ marginBottom: '1em' }}>
            <h3>
              Resultados para: <span style={{ color: 'var(--ifm-color-primary)' }}>{selectedLemma}</span>
            </h3>
          </div>
        )}
        {results.length === 0 && selectedLemma && (
          <div style={{ color: '#c00', marginTop: '2em' }}>No se encontraron resultados para este lema.</div>
        )}
        {results.map((entry, idx) => (
          <div key={idx} style={{
            marginBottom: '1.5em',
            padding: '1em',
            background: 'var(--text-box)',
            borderRadius: 6,
            border: '1px solid var(--ifm-color-primary-lightest)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
              <span style={{ color: 'var(--ifm-color-primary)' }}>
                {entry.titleSpanish ? entry.titleSpanish : `Diccionario #${entry.source + 1}`}
              </span>
              <br/><span style={{ marginLeft: 12 }}>Palabra: <b>{entry.word}</b></span>
              <br/><span style={{ marginLeft: 12 }}>Morfología: {entry.morph || '—'}</span>
            </div>
            <br/>
            {entry.textMatches.length > 0 ? (
              entry.textMatches.map((sentence, sidx) => (
                <div key={sidx} style={{ marginBottom: 8 }}>
                  <div
                    style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                    dangerouslySetInnerHTML={{
                      __html: highlightWords(sentence.greek, [entry.word])
                    }}
                  />
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ color: 'var(--ifm-color-primary)' }}>{sentence.spanish}</span>
                  </div>
                  {sentence.notes && (
                    <div style={{ fontSize: '0.85em', color: 'var(--ifm-color-primary-light)' }}>
                      <strong>Notas:</strong> {Object.values(sentence.notes).join('; ')}
                    </div>
                  )}
                  <br/>
                  <div style={{ fontSize: '0.8em', color: 'var(--ifm-color-primary-light)', marginTop: 4 }}>
                    <strong>Capítulo:</strong> {sentence.chapter !== undefined ? sentence.chapter : '—'}
                    <span style={{ marginLeft: 12 }}><strong>Sección:</strong> {sentence.section !== undefined ? sentence.section : '—'}</span>
                    <span style={{ marginLeft: 12 }}><strong>Líneas:</strong> {sentence.lines && sentence.lines.join(', ')}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#c00' }}>No se encontró texto relacionado.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}