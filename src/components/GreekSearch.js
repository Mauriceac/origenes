import React, { useState } from 'react';

// Helper to flatten completedDictionary to array of word objects
function flattenDictionary(dict) {
  const result = [];
  Object.values(dict).forEach(arr => {
    arr.forEach(entry => {
      if (entry.lemma && entry.word && entry.lines) result.push(entry);
    });
  });
  return result;
}

// Helper to get all unique lemmas present in the completed dictionary, sorted alphabetically
function getUniqueLemmas(dict) {
  const lemmas = new Set();
  Object.values(dict).forEach(arr => {
    arr.forEach(entry => {
      if (entry.lemma) lemmas.add(entry.lemma);
    });
  });
  // Sort using localeCompare for proper Greek alphabetical order
  return Array.from(lemmas).sort((a, b) => a.localeCompare(b, 'el'));
}

export default function GreekLemmaSearch({ completedDictionary, lemmaDefinitions, content }) {
  const [selectedLemma, setSelectedLemma] = useState('');
  const [results, setResults] = useState([]);

  const completedWords = flattenDictionary(completedDictionary);
  const uniqueLemmas = getUniqueLemmas(completedDictionary);

  // Get definition for a lemma
  function getDefinition(lemma) {
    const def = lemmaDefinitions.find(d => d.lemma === lemma);
    return def ? def.definition : '';
  }

  // When a lemma is selected, find all matching words and sentences
  function handleLemmaSelect(lemma) {
    setSelectedLemma(lemma);

    // Find all dictionary entries for this lemma
    const lemmaEntries = completedWords.filter(entry => entry.lemma === lemma);

    // Collect all line numbers for this lemma
    const lineNumbers = Array.from(new Set(lemmaEntries.flatMap(entry => entry.lines.map(String))));

    // For each line number, find the corresponding sentence in content
    const sentences = [];
    content.forEach(section => {
      (section.translation || []).forEach(tr => {
        if (tr.lines && tr.text?.originalGreekText) {
          // If any line matches, add sentence
          if (tr.lines.some(line => lineNumbers.includes(line.toString()))) {
            // Find which words in this sentence match the lemma
            const matchedWords = lemmaEntries
              .map(entry => entry.word)
              .filter(word => tr.text.originalGreekText.includes(word));
            sentences.push({
              greek: tr.text.originalGreekText,
              spanish: tr.text.spanishTranslation,
              notes: tr.notes,
              lines: tr.lines,
              matchedWords
            });
          }
        }
      });
    });

    setResults(sentences);
  }

  // Highlight matched words in Greek sentence
  function highlightWords(text, words) {
    if (!words || words.length === 0) return text;
    // Sort by length descending to avoid partial matches
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    let highlighted = text;
    sortedWords.forEach(word => {
      // Escape regex special chars
      const safeWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Use CSS variable for highlight color
      highlighted = highlighted.replace(
        new RegExp(safeWord, 'g'),
        `<span style="background: var(--highlight); border-radius: 3px; padding: 0 2px;">${word}</span>`
      );
    });
    return highlighted;
  }

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
          {uniqueLemmas.map(lemma => (
            <div
              key={lemma}
              style={{
                padding: '0.4em 0.5em',
                cursor: 'pointer',
                background: selectedLemma === lemma ? 'var(--ifm-color-primary-lightest)' : 'transparent',
                borderRadius: 4,
                fontWeight: selectedLemma === lemma ? 'bold' : 'normal'
              }}
              onClick={() => handleLemmaSelect(lemma)}
              title={getDefinition(lemma)}
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
            <div style={{ fontSize: '1em', color: 'var(--ifm-color-primary)', marginBottom: 8 }}>
              <b>Definición:</b> {getDefinition(selectedLemma) || <span style={{ color: '#c00' }}>No disponible</span>}
            </div>
          </div>
        )}
        {results.length === 0 && selectedLemma && (
          <div style={{ color: '#c00', marginTop: '2em' }}>No se encontraron resultados para este lema.</div>
        )}
        {results.map((sentence, idx) => (
          <div key={idx} style={{
            marginBottom: '1.5em',
            padding: '1em',
            background: 'var(--text-box)',
            borderRadius: 6,
            border: '1px solid var(--ifm-color-primary-lightest)'
          }}>
            <div
              style={{ fontWeight: 'bold', marginBottom: 4, fontSize: '1.1em' }}
              dangerouslySetInnerHTML={{
                __html: highlightWords(sentence.greek, sentence.matchedWords)
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
            <div style={{ fontSize: '0.8em', color: 'var(--ifm-color-primary-light)', marginTop: 4 }}>
              <strong>Líneas:</strong> {sentence.lines && sentence.lines.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}