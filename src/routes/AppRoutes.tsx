import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUploadPage from '../pages/ImageUploadPage';
import ImageViewerPage from '../pages/ImageViewerPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/image-upload/:token" element={<ImageUploadPage />} />
        <Route path="/image-viewer" element={<ImageViewerPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
