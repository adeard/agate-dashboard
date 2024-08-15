import { useLayoutEffect, useRef, useState } from 'react';

import { joinClassnames } from '@/utils/common';
import CardHeader from './CardHeader';

const SectionCard = ({
  classes = '',
  header,
  children,
  noOverflow,
  loading = false,
}) => {
  const [contentHeight, setContentHeight] = useState('auto');
  const [containerWidth, setContainerWidth] = useState('auto');
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const cardHeight = cardRef.current.clientHeight;
      const cardWidth = cardRef.current.clientWidth;

      const cardPaddingGap = 12 * 2 + 4; // 12 = padding y from card
      const spaceY = 12;
      const contentHeight =
        cardHeight - 28 - cardPaddingGap - spaceY - (header ? 28 : 0); // 28 = height card-header

      setContentHeight(contentHeight);
      setContainerWidth(cardWidth);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={joinClassnames([
        'h-full space-y-1 overflow-hidden rounded bg-white px-4 py-3',
        classes,
      ])}
    >
      {header && null}
      {children && (
        <section
          className={joinClassnames([!noOverflow && 'overflow-auto'])}
          style={{ maxHeight: !noOverflow && `${contentHeight}px` }}
        >
          {typeof children === 'function'
            ? children(contentHeight, containerWidth)
            : children}
        </section>
      )}
    </div>
  );
};

export default SectionCard;
