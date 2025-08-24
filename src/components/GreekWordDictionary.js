import React, { useState } from 'react';

// Load both dictionaries as JSON imports
import completedDictionary from '@site/docs/san-juan-crisostomo/sobre-el-ayuno-01/iohannes-chrysostomus_de-jejunio-01_completed_dictionary.json';
import lemmaDefinitions from '@site/docs/san-juan-crisostomo/sobre-el-ayuno-01/iohannes-chrysostomus_de-jejunio-01_lemma_definitions.json';

// Helper to flatten completedDictionary to array of word objects
function flattenDictionary(dict) {
  const result = [];
  Object.values(dict).forEach(arr => {
    arr.forEach(entry => {
      if (entry.word) result.push(entry);
    });
  });
  return result;
}

const completedWords = flattenDictionary(completedDictionary);

function findWordData(word) {
  // Remove punctuation for matching
  const cleanWord = word.replace(/[.,;:·'’"!?()\[\]—]/g, '').trim();
  // Try to find by word (exact match or ignoring trailing punctuation)
  let entry = completedWords.find(e => e.word.replace(/[.,;:·'’"!?()\[\]—]/g, '').trim() === cleanWord);
  if (!entry) {
    // Try to find by lemma if not found by word
    entry = completedWords.find(e => e.lemma === cleanWord);
  }
  return entry;
}

function findDefinition(lemma) {
  return lemmaDefinitions.find(def => def.lemma === lemma);
}

export default function GreekWordDictionary({ children }) {
  const [popup, setPopup] = useState(null);

  // Convert children to string if needed
  let text = '';
  if (typeof children === 'string') {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.join('');
  } else if (children && children.props && children.props.children) {
    text = children.props.children;
  } else {
    text = String(children);
  }

  const handleClick = (e) => {
    const word = e.target.textContent;
    const wordData = findWordData(word);
    if (!wordData) {
      setPopup({
        word,
        lemma: null,
        morph: null,
        definition: null,
        notFound: true
      });
      return;
    }
    const def = findDefinition(wordData.lemma);
    setPopup({
      word: wordData.word,
      lemma: wordData.lemma,
      morph: wordData.morph,
      definition: def ? def.definition : null,
      notFound: false
    });
  };

  const handleClose = () => setPopup(null);

  // Render children, wrapping Greek words in <span>
  const renderText = (txt) => {
    // Regex for Greek unicode range
    const greekRegex = /([\u0370-\u03FF\u1F00-\u1FFF\u00B5\u2206]+[.,;:·'’"!?()\[\]—]?)/g;
    return txt.split(greekRegex).map((part, idx) => {
      if (greekRegex.test(part)) {
        return (
          <span
            key={idx}
            style={{ color: '#2a3', cursor: 'pointer', textDecoration: 'underline dotted' }}
            onClick={handleClick}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div>
        {renderText(text)}
      </div>
      {popup && (
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            background: 'var(--ifm-card-background-color)',
            border: '1px solid var(--ifm-color-primary-darkest)',
            borderRadius: 8,
            boxShadow: '0 2px 8px var(--ifm-color-primary-dark)',
            padding: '1em',
            zIndex: 100,
            minWidth: 250
          }}
        >
          <button
            style={{
              position: 'absolute',
              top: 6,
              right: 8,
              border: 'none',
              background: 'transparent',
              fontSize: '1.2em',
              cursor: 'pointer'
            }}
            onClick={handleClose}
            aria-label="Cerrar"
          >
            ×
          </button>
          {popup.notFound ? (
            <div>
              <strong>{popup.word}</strong>
              <div style={{ color: '#c00', marginTop: 8 }}>No se encontró información en el diccionario.</div>
            </div>
          ) : (
            <div>
              <strong>{popup.word}</strong>
              <div><b>Lemma:</b> {popup.lemma}</div>
              <div><b>Morfología:</b> {popup.morph}</div>
              <div><b>Definición:</b> {popup.definition || <span style={{ color: '#c00' }}>No disponible</span>}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}