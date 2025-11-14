import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import Navbar from '@/compo/Navbar';

const OCRPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [ocrText, setOcrText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [language, setLanguage] = useState('eng');
  const [fileError, setFileError] = useState('');

  const inputRef = useRef(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const onFileChange = (f) => {
    if (!f) return;

    // Reset states on new file
    setFileError("");
    setFile(f);
    setOcrText('');
    setAnalysisResult(null);
    setAnalysisError(null);

    // Only preview images (not PDFs)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(f);
    } else {
      setPreviewUrl(null);
    }

    uploadAndExtract(f, language);
  };

  const handleSelectClick = () => {
    inputRef.current?.click();
  };

  const uploadAndExtract = async (fileToUpload, lang) => {
    try {
      setStatus('uploading');
      setUploadProgress(0);

      const form = new FormData();
      form.append('file', fileToUpload);
      form.append('lang', lang || 'eng');

      // Determine route based on file type
      const isImage = fileToUpload.type.startsWith('image/');
      const route = isImage ? '/extract-image' : '/extract-pdf';

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/ocr${route}`,
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          }
        }
      );

      setStatus('extracting');

      const { pages, fileUrl: uploadedUrl } = res.data;
      // Extract text from pages array
      const extractedText = pages
        ?.map((page) => page.text)
        .join('\n---PAGE BREAK---\n') || '';
      setOcrText(extractedText);
      setFileUrl(uploadedUrl || '');
      setStatus('done');
      setUploadProgress(100);

    } catch (err) {
      console.error('Upload/Extract error', err);
      setStatus('error');
    }
  };
  console.log(ocrText);


  const handleAnalyze = async () => {
    if (!ocrText || !ocrText.trim()) return;
    setAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/ocr-analyzer/analyze-text`,
        { text: ocrText, language },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      setAnalysisResult(res.data);
    } catch (err) {
      console.error('Analyze error', err);
      setAnalysisError(err?.response?.data || { message: 'Failed to analyze text' });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ocrText || '');
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>ContentLab — OCR & Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">

                <Label>Language</Label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="eng">English</option>
                  <option value="hin">Hindi</option>
                  <option value="spa">Spanish</option>
                  <option value="fra">French</option>
                  <option value="por">Portuguese</option>
                </select>

                <Label className="mt-4">Upload Image or PDF</Label>
                <div
                  className="border-dashed border-2 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={handleSelectClick}
                  role="button"
                >
                  {!previewUrl && !file && (
                    <div className="text-center">
                      <p className="mb-2">Click to select or drop a file</p>
                      <p className="text-sm text-muted-foreground">Supported: .jpg, .jpeg, .png, .pdf</p>
                      {fileError && (
                        <p className="text-sm text-red-600 mt-2">{fileError}</p>
                      )}
                    </div>
                  )}

                  {previewUrl && (
                    <div className="w-full">
                      <img src={previewUrl} alt="preview" className="max-h-64 object-contain w-full" />
                    </div>
                  )}

                  {file && !previewUrl && (
                    <div className="text-center">
                      <p className="mb-2 font-semibold">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.type}</p>
                    </div>
                  )}

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (f) onFileChange(f);
                    }}
                  />
                </div>

                {fileError && (
                  <p className="text-red-600 text-sm">{fileError}</p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      Status: <strong>{status.toUpperCase()}</strong>
                    </p>
                    <p className="text-sm">{uploadProgress}%</p>
                  </div>
                  <Progress value={uploadProgress} />
                  {status === 'extracting' && (
                    <p className="text-sm text-muted-foreground">Analyzing image — please wait...</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-600">
                      Something went wrong. Check console & backend logs.
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="cursor-pointer" onClick={handleSelectClick}>Select File</Button>
                  <Button
                    className="cursor-pointer"
                    variant="secondary"
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl(null);
                      setOcrText('');
                      setFileUrl('');
                      setUploadProgress(0);
                      setStatus('idle');
                      setAnalysisResult(null);
                      setAnalysisError(null);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">OCR Result</h3>
                <div className="min-h-[160px] border rounded p-3 bg-white mb-3">
                  {status === 'idle' && (
                    <p className="text-sm text-muted-foreground">No upload yet.</p>
                  )}
                  {(status === 'uploading' || status === 'extracting') && (
                    <p className="text-sm">Processing... {uploadProgress}%</p>
                  )}

                  {status === 'done' && (
                    <>
                      <p className="text-sm mb-2">
                        <strong>File URL:</strong>{' '}
                        {fileUrl ? (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 underline"
                          >
                            Open
                          </a>
                        ) : (
                          '—'
                        )}
                      </p>

                      <div className="mb-2">
                        <div className="flex items-start justify-between mb-1">
                          <strong className="text-sm">Extracted Text</strong>
                          <Button onClick={handleCopy} size="sm">
                            Copy
                          </Button>
                        </div>

                        <textarea
                          value={ocrText}
                          onChange={(e) => setOcrText(e.target.value)}
                          rows={8}
                          className="w-full p-2 border rounded text-sm bg-slate-50"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button className="cursor-pointer" onClick={handleAnalyze} disabled={!ocrText || analyzing}>
                          {analyzing ? 'Analyzing...' : 'Analyze Text'}
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant="secondary"
                          onClick={() => {
                            setAnalysisResult(null);
                            setAnalysisError(null);
                          }}
                        >
                          Clear Analysis
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">Analysis</h3>
                <div className="min-h-[200px] border rounded p-3 bg-white">
                  {analyzing && <p className="text-sm">Analyzing text...</p>}

                  {analysisError && (
                    <div className="text-sm text-red-600">
                      <p>Error analyzing text:</p>
                      <pre className="whitespace-pre-wrap text-sm p-2 bg-slate-50 rounded">
                        {JSON.stringify(analysisError, null, 2)}
                      </pre>
                    </div>
                  )}

                  {analysisResult && (
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Summary</strong>
                        <p className="mt-1 whitespace-pre-wrap bg-slate-50 p-2 rounded">
                          {analysisResult.summary || '—'}
                        </p>
                      </div>
                      <div>
                        <strong>Sentiment</strong>
                        <p className="mt-1">{analysisResult.sentiment || '—'}</p>
                      </div>
                      <div>
                        <strong>Keywords</strong>
                        <p className="mt-1">
                          {(analysisResult.keywords || []).join(', ') || '—'}
                        </p>
                      </div>
                      <div>
                        <strong>Hashtags</strong>
                        <p className="mt-1">
                          {(analysisResult.hashtags || []).join(' ') || '—'}
                        </p>
                      </div>
                      <div>
                        <strong>Suggestions</strong>
                        <p className="mt-1 whitespace-pre-wrap bg-slate-50 p-2 rounded">
                          {analysisResult.suggestions || '—'}
                        </p>
                      </div>
                    </div>
                  )}

                  {!analyzing && !analysisResult && !analysisError && (
                    <p className="text-sm text-muted-foreground cursor-pointer">
                      No analysis yet. Click <em>Analyze Text</em> after OCR completes.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OCRPage;
