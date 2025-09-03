---
title: Sobre el Ayuno (01)
---

import Content from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-01.json';
import BookDisplay, {generateTOC} from '@site/src/components/bookDisplay.js';
import GreekWordDictionary from '@site/src/components/GreekWordDictionary.js';
import DictionaryJSON01 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-01_completed_dictionary.json';
import DictionaryJSON02 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-00_lemma_definitions.json';
import GreekSearch from '@site/src/components/GreekSearch.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

_Iohannes Chrysostomus - De jejunio [1]_  
- **Fuente**: https://www.documentacatholicaomnia.eu/02g/0345-0407,_Iohannes_Chrysostomus,_De_jejunio_[1],_MGR.pdf

## Introducción

En esta homilía, San Juan Crisóstomo introduce el ayuno como una disciplina ascética fundamental, contrastando el "deleite del placer" con la "ganancia celestial" que ofrece la abstinencia. El Crisóstomo enfatiza los múltiples beneficios espirituales y físicos del ayuno, presentándolo como una herramienta que enseña la templanza, fomenta la piedad, espiritualiza el cuerpo y eleva la mente hacia lo inmortal. A través de ejemplos bíblicos de Moisés, Elías, Daniel y los Ninivitas, se ilustra cómo el ayuno (y la abstinencia dietética) confiere poder espiritual, permite la comunión divina y puede incluso desviar el juicio de Dios. 

La homilía concluye con una poderosa exhortación a practicar el "verdadero ayuno", que va más allá de la mera abstinencia de alimentos para incluir la abstención de pecados y la práctica de la justicia y la caridad, en línea con las enseñanzas del profeta Isaías. Se subraya que el ayuno, cuando se realiza con oración y buenas obras, es un camino hacia la salvación y la recepción de dones espirituales.

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
