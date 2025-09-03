---
title: Sobre el Ayuno (03)
---

import Content from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-03.json';
import BookDisplay, {generateTOC} from '@site/src/components/bookDisplay.js';
import GreekWordDictionary from '@site/src/components/GreekWordDictionary.js';
import DictionaryJSON01 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-03_completed_dictionary.json';
import DictionaryJSON02 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-00_lemma_definitions.json';
import GreekSearch from '@site/src/components/GreekSearch.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

_Iohannes Chrysostomus - De jejunio [3]_
- **Fuente**: https://www.documentacatholicaomnia.eu/02g/0345-0407,_Iohannes_Chrysostomus,_De_jejunio_[3],_MGR.pdf


## Introducción

En esta homilía, San Juan Crisóstomo ofrece una crítica incisiva al ayuno puramente exterior, enfatizando que la piedad auténtica se manifiesta en la coherencia moral y en las obras de misericordia. El Crisóstomo proclama que la verdadera riqueza en Cristo se encuentra en la tríada de oración, ayuno y limosna. A través de una serie de preguntas retóricas, denuncia vigorosamente la hipocresía de quienes se abstienen de alimentos pero se entregan a pecados graves como la calumnia (descrita como "devorar las carnes del hermano"), la fornicación, la avaricia, la ira y la glotonería.

El orador exhorta a una transformación integral, instando a huir de todo vicio y a cultivar una amplia gama de virtudes, incluyendo la compasión, la mansedumbre, la paciencia y la veracidad. Se subraya la importancia de "ayunar como Cristo mandó", evitando la vanagloria y priorizando la ayuda a los necesitados –alimentar al hambriento, vestir al desnudo, visitar a los enfermos y presos–, ya que el ayuno debe ser un acto de caridad que genera un "bien doble". La homilía también resalta el valor del arrepentimiento como "heraldo del reino de los cielos" y aboga por una constante meditación sobre la muerte y el juicio eterno como antídoto contra la pereza espiritual. Finalmente, Crisóstomo enfatiza la humildad en la oración y la dependencia de la gracia divina, al tiempo que advierte que la fe inquebrantable y el amor a Dios son esenciales para liberarse de las preocupaciones y las pasiones.

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
