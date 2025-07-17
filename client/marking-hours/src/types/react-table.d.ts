
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    filterVariant?: 'select';
    style?: {
      textAlign?: 'left' | 'center' | 'right';
    };
  }
}
