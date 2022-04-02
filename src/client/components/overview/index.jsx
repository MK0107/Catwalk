import React, { useContext } from 'react';

import Carousel from './carousel';
import Selection from './selection';
import Description from './description';
import SplitScreen from '../layout/SplitScreen';
import { AppContext } from '../../contexts';

export default function Overview () {
  const { fullCarousel } = useContext(AppContext);

  return (
    <div>
      <SplitScreen widths={[fullCarousel ? 100 : 50, fullCarousel ? 0 : 50]}>
        <Carousel />
        <Selection />
      </SplitScreen>

      <Description />
    </div >
  );
}
