---
title: Capítulo 2
---

import Content from '@site/docs/san-maximo-confesor/mystagogia/chapter_2.json';
import Display, {generateTOC} from '@site/src/components/ChapterDisplay.js';

<Display data={Content} />

export const toc = [
  ...generateTOC(Content)
]
