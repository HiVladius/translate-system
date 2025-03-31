import { ReactNode } from 'react';

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
    initialLayout?: { columns: number[], rows: number[] };
    sections: SectionsProps;
  }