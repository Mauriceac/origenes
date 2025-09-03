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
- **Fuente**: https://www.documentacatholicaomnia.eu/02g/0345-0407,_Iohannes_Chrysostomus,_De_jejunio_[2],_MGR.pdf

## Introducción

Esta extensa homilía de San Juan Crisóstomo profundiza en el significado teológico y práctico del ayuno, presentándolo como un "tiempo de expiaciones" y "revocación de pecados". El orador argumenta que el ayuno es un "freno hermoso" y un "remedio" que cura el alma de la maldad, comparable a la incisión de un médico para sanar. A lo largo de la disertación, se exploran ejemplos bíblicos cruciales: desde el pecado de Adán como acto de intemperancia hasta la redención posible a través del ayuno, pasando por la venta de la primogenitura de Esaú, el ayuno de Moisés para recibir la Ley (y la subsecuente intercesión para el perdón de Israel), y el ayuno de Cristo en el desierto como fundamento de la Nueva Alianza.

Crisóstomo también examina el poder del ayuno a través de las historias de Daniel en el foso de los leones y el profeta de Judá desobediente, para quien la transgresión del mandato de abstinencia tuvo consecuencias fatales. Particularmente notable es la consideración del ayuno de Nínive, que revocó una sentencia divina de destrucción, y la discusión sobre la presciencia divina y el libre albedrío, utilizando los casos de Adán y Judas para defender la justicia y el amor de Dios. La homilía detalla los múltiples beneficios del ayuno –que van desde la serenidad y el control de las pasiones hasta la purificación física y moral– y lo eleva a una "imitación de los ángeles" y un "deleite espiritual". Finalmente, el Crisóstomo vincula el ayuno con la pasión de Cristo, presentándolo como una "pequeña muerte" que permite participar en los sufrimientos del Señor y alcanzar la gloria.

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
