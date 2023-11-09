import { ReactP5Wrapper } from '@p5-wrapper/react';
import { useState } from 'react';
import { sketch } from './sketch';
import { getPanelOptions, getSlateCount } from './formulas';

function App() {
  const [dimensions, setDimensions] = useState({
    width: 1100,
    height: 2100
  });

  const [shutter, setShutter] = useState({
    panelCount: 1,
    slateCount: 8
  });

  const panelOptions = getPanelOptions(dimensions.width);

  return (
    <main>
      <nav>
        <div>
          <label htmlFor='width'>Largura: {dimensions.width}mm</label>
          <input
            type='range'
            id='width'
            name='width'
            min='300'
            max='2400'
            step='50'
            value={dimensions.width}
            onChange={e => {
              setDimensions(prev => ({ ...prev, width: +e.target.value }));
              setShutter(prev => ({ ...prev, panelCount: getPanelOptions(+e.target.value)[0] }));
            }}
          />
        </div>
        <div>
          <label htmlFor='height'>Altura: {dimensions.height}mm</label>
          <input
            type='range'
            id='height'
            name='height'
            min='400'
            max='2100'
            step='50'
            value={dimensions.height}
            onChange={e => {
              setDimensions(prev => ({ ...prev, height: +e.target.value }));
              setShutter(prev => ({ ...prev, slateCount: getSlateCount(+e.target.value) }));
            }}
          />
        </div>
        <div className='radio'>
          {panelOptions.map(opt => (
            <div>
              <label htmlFor={'panel' + opt}>{opt}</label>
              <input
                type='radio'
                name='panel'
                id={'panel' + opt}
                value={opt}
                onChange={e => setShutter(prev => ({ ...prev, panelCount: +e.target.value }))}
              />
            </div>
          ))}
        </div>
      </nav>
      <ReactP5Wrapper sketch={sketch} shutterConfig={shutter} />
    </main>
  );
}

export default App;
