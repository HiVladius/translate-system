import { ReactNode } from "react";

export interface SectionConfig {
  title: string;
  content: ReactNode;
}

export interface SectionsProps {
  topLeft: SectionConfig;
  topRight: SectionConfig;
  bottomLeft: SectionConfig;
  bottomRight: SectionConfig;
}

export interface ResizableGridProps {
  initialLayout?: { columns: number[]; rows: number[] };
  sections: SectionsProps;
}

export interface GridSectionProps {
  gridPosition: { column: number | string; row: number | string };
  title?: React.ReactNode;
  content?: React.ReactNode;
}

export interface ResizerProps {
  direction?: "horizontal" | "vertical";
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  gridPosition?: { column: number | string; row: number | string };
}

export interface RowData {
  id: number;
  tc: string;
  character: string;
  dialog: string;
}

export interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
  dir: string;
  fontName?: string;
}

export interface VideoPlayerProps {
  src: string;
  width?: string;
  height?: string;
}
