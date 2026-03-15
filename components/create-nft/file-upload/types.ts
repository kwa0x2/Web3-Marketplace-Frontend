export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  preview: string;
  onClear: () => void;
}
