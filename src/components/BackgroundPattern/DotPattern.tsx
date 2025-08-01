import * as React from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

const DotPattern = ({
  width = 20,
  height = 20,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) => {
  return (
    <svg
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
      width="100%"
      height="100%"
      {...props}
    >
      <defs>
        <pattern
          id="dotPattern"
          x="0"
          y="0"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  );
};

export default DotPattern;
