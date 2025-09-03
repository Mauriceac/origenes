---
title: Proemio
sidebar_position: 2
---

import Content from '@site/docs/san-maximo-confesor/mystagogia/chapter_0.json';
import Display, {generateTOC} from '@site/src/components/ChapterDisplay.js';

<Display data={Content} />

export const toc = [
  ...generateTOC(Content)
]
