import React from 'react';

/**
 * Safely downloads the resume ensuring it always saves as a valid .pdf file with proper MIME type.
 * Works seamlessly with cross-origin Cloudinary / Render storage and guarantees
 * the file is named 'Esakki_Ponraj_Resume.pdf'.
 */
export async function handleResumeDownload(
  e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  resumeUrl?: string,
  filename = 'Esakki_Ponraj_Resume.pdf'
) {
  if (e) {
    e.preventDefault();
  }

  const url = resumeUrl || '/resume.pdf';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const blob = await res.blob();

    // Force application/pdf MIME type so OS and PDF viewers open it automatically
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
      
    }, 3000);
  } catch (err) {
    console.warn('Direct blob download failed, opening in new tab fallback:', err);
    window.open(url, '_blank');
  }
}
