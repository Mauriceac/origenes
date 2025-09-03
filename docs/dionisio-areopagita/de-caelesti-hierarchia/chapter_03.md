---
title: Capítulo 3
---

import Content from '@site/docs/dionisio-areopagita/de-caelesti-hierarchia/chapter_3.json';
import Display, {generateTOC} from '@site/src/components/ChapterDisplay.js';

<Display data={Content} />

export const toc = [
  ...generateTOC(Content)
]
