export function getPanelOptions(shutterWidth: number) {
  const MIN_WIDTH = 300;
  const MAX_WIDTH = 2400;
  if (shutterWidth < MIN_WIDTH || shutterWidth > MAX_WIDTH) return [];

  const widthRanges = [
    { min: 300, max: 800, count: 1 },
    { min: 600, max: 1100, count: 2 },
    { min: 1450, max: 1500, count: 2 },
    { min: 850, max: 1400, count: 3 },
    { min: 1900, max: 2400, count: 3 },
    { min: 1050, max: 2400, count: 4 },
    { min: 1900, max: 2400, count: 6 },
  ];

  const options = [];
  for (const { min: rangeMin, max: rangeMax, count } of widthRanges) {
    if (shutterWidth >= rangeMin && shutterWidth <= rangeMax) {
      options.push(count);
    }
  }

  return options;
}

export function getSlateCount(shutterHeight: number) {
  const MIN_HEIGHT_FOR_DIVIDER = 1400;
  const MIN_HEIGHT = 400;
  const MAX_HEIGHT = 2100;

  if (shutterHeight < MIN_HEIGHT || shutterHeight > MAX_HEIGHT) return 0;

  //? A partir de 1400 passa a ter divisória
  if (shutterHeight < MIN_HEIGHT_FOR_DIVIDER) {
    const RANGE_SIZE = 50;
    const CORRECTION_FACTOR = 4;
    // ? A divisão sempre resulta na contagem correta +4, portanto
    // ? subtraímos 4 do resultado
    return Math.floor(shutterHeight / RANGE_SIZE) - CORRECTION_FACTOR;
  } else {
    const MIN_SLATE_COUNT = 22;
    const RANGE_SIZE = 100;
    const INCREMENT_RATE = 2;

    const incrementCount = Math.ceil((shutterHeight - MIN_HEIGHT_FOR_DIVIDER) / RANGE_SIZE);

    return MIN_SLATE_COUNT + incrementCount * INCREMENT_RATE;
  }
}
