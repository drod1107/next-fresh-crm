//  src > components > Dashboard > Files > FileUpload > page.tsx

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

interface FileUploadProps {
  contactId: string;
  onFileUploaded: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ contactId, onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<string>('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file || !label) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('contactId', contactId);
    formData.append('label', label);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setSnackbar({ open: true, message: 'File uploaded successfully', severity: 'success' });
      setFile(null);
      setLabel('');
      onFileUploaded();
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbar({ open: true, message: 'Error uploading file', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="mt-4">
      <div {...getRootProps()} className={`border-2 border-dashed p-4 mb-4 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag and drop a file here, or click to select a file</p>
        )}
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <FormControl fullWidth className="mb-4">
        <InputLabel>File Label</InputLabel>
        <Select
          value={label}
          onChange={(e) => setLabel(e.target.value as string)}
        >
          <MenuItem value="tax">Tax</MenuItem>
          <MenuItem value="estate">Estate</MenuItem>
          <MenuItem value="estate planning">Estate Planning</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleUpload} disabled={!file || !label} variant="contained" color="primary">
        Upload File
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUpload;