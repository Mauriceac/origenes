---
title: Sobre el Ayuno (02)
---

import Content from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-02.json';
import BookDisplay, {generateTOC} from '@site/src/components/bookDisplay.js';
import GreekWordDictionary from '@site/src/components/GreekWordDictionary.js';
import DictionaryJSON01 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-02_completed_dictionary.json';
import DictionaryJSON02 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-00_lemma_definitions.json';
import GreekSearch from '@site/src/components/GreekSearch.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

_Iohannes Chrysostomus - De jejunio [1]_

## Introducción

San Juan Crisóstomo, uno de los más grandes padres de la Iglesia, aborda en esta obra la importancia espiritual y moral del ayuno. A través de sus enseñanzas, destaca el valor del ayuno no solo como práctica ascética, sino como medio para fortalecer la voluntad, purificar el corazón y acercarse a Dios. Sus reflexiones invitan a comprender el ayuno como un acto de humildad y caridad, orientado al crecimiento interior y al servicio de los demás.

<Tabs>
<TabItem value="text" label="Texto" default>

<BookDisplay data={Content} />

</TabItem>
<TabItem value="search" label="Buscador">

<GreekSearch
  completedDictionary={DictionaryJSON01}
  lemmaDefinitions={DictionaryJSON02}
  content={Content}
/>

</TabItem>
</Tabs>

export const toc = [
  {
    value: "Introducción",
    id: "introducción",
    level: 2
  },
  ...generateTOC(Content)
]
