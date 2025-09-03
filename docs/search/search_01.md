# Buscador por lemmas

import MultiGreekSearch from '@site/src/components/GreekSearchMultiple.js';
import Dict1 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-01_completed_dictionary.json';
import Dict2 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-02_completed_dictionary.json';
import Dict3 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-03_completed_dictionary.json';
import Text1 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-01.json';
import Text2 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-02.json';
import Text3 from '@site/docs/san-juan-crisostomo/sobre-el-ayuno/iohannes-chrysostomus_de-jejunio-03.json';


Buscador de lemmas a través de tres textos de [San Juan Crisóstomo sobre el ayuno](/docs/category/sobre-el-ayuno).

<MultiGreekSearch
  dictionaries= {[
    { dict: Dict1, text: Text1 },
    { dict: Dict2, text: Text2 },
    { dict: Dict3, text: Text3 } 
  ]}
/>