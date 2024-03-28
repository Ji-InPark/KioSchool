import * as React from 'react';

interface ArrowRightSvgProps extends React.SVGProps<SVGSVGElement> {}

const ArrowRight = (props: ArrowRightSvgProps) => (
  <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path id="Vector" d="M5.3125 17H28.6875" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path id="Vector_2" d="M19.125 7.4375L28.6875 17L19.125 26.5625" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default ArrowRight;
