import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';

const ImageUpload: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Access token from URL params
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error messages

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError(null); // Clear error if the file is valid
      } else {
        setSelectedFile(null);
        setError('Please upload a valid image file.'); // Set error message for invalid file
      }
    }
  };

  const uploadImage = async (file: File, token: string) => {  
    // Get the pre-signed URL, sending content type as a query parameter
    const response = await fetch(`http://localhost:5000/presign-url/${token}?type=${encodeURIComponent(file.type)}`);
    const { url } = await response.json();

    // Upload the file to S3 using the pre-signed URL
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
          'Content-Type': file.type,
      },
    }).then(response => {
      if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
    }).catch(err => {
      console.error('Error uploading to S3:', err);
    });
    
    console.log('File uploaded successfully to S3');
  };

  const handleUpload = () => {
    if (selectedFile && token) {
      // Call the uploadImage function to upload the selected file
      uploadImage(selectedFile, token)
        .then(() => {
          console.log(`Uploaded ${selectedFile.name} with token ${token}`);
          // Optionally reset the file input
          setSelectedFile(null);
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
          setError('Failed to upload file. Please try again.');
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Upload Image
      </Typography>
      
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ backgroundColor: '#1976d2', color: '#fff', padding: '10px 20px' }}
      >
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {selectedFile && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}

      {error && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ marginTop: 2, padding: '10px 20px' }}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUpload;
