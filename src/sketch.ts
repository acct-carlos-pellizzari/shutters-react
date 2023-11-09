import { P5CanvasInstance, SketchProps } from '@p5-wrapper/react';

type BoundingBox = [x: number, y: number, w: number, h: number];

interface Props extends SketchProps {
  shutterConfig: {
    panelCount: number;
    slateCount: number;
  };
}

export function sketch(p: P5CanvasInstance<Props>) {
  let panelCount: number, slateCount: number;

  p.updateWithProps = props => {
    panelCount = props.shutterConfig.panelCount;
    slateCount = props.shutterConfig.slateCount;
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    p.background(255);
  };

  p.draw = () => {
    p.background(255);

    const panels = subdivide([0, 0, p.width, p.height], panelCount);

    for (const panel of panels) {
      p.fill(120);
      p.rect(...panel);
      const slates = subdivide(panel, slateCount, 5, 10, true);
      p.fill(200);
      slates.map(slate => p.rect(...slate));
    }
  };
}

function subdivide(
  boundingBox: BoundingBox,
  tesselation: number,
  gap: number = 10,
  margin: number = 10,
  isVertical: boolean = false
) {
  if (tesselation === 0) return [];

  const [x, y, totalWidth, totalHeight] = boundingBox;
  const availableWidth = totalWidth - 2 * margin;
  const availableHeight = totalHeight - 2 * margin;

  const gapCount = tesselation - 1;
  const boxLength =
    (isVertical ? availableHeight : availableWidth) / tesselation - (gap * gapCount) / tesselation;

  const boxes: BoundingBox[] = [];
  for (let boxIndex = 0; boxIndex < tesselation; boxIndex++) {
    const offsetPosition = margin + boxLength * boxIndex + gap * boxIndex;
    boxes.push([
      x + (isVertical ? margin : offsetPosition),
      y + (isVertical ? offsetPosition : margin),
      isVertical ? availableWidth : boxLength,
      isVertical ? boxLength : availableHeight
    ]);
  }

  return boxes;
}
