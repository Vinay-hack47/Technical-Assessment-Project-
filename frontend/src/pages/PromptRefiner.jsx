import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import Navbar from '@/compo/Navbar';
import { toast } from 'sonner';
import { Download, Copy, FileText, Image, File, FileType } from 'lucide-react';

const PromptRefiner = () => {
  const [plainText, setPlainText] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, processing, done, error
  const [refinedPrompt, setRefinedPrompt] = useState(null);
  const [language, setLanguage] = useState('eng');
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate file types
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    const validFiles = selectedFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setFiles(prev => [...prev, ...validFiles]);
    
    // Create previews for images
    validFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews(prev => [...prev, {
            file: file,
            preview: reader.result,
            type: 'image'
          }]);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews(prev => [...prev, {
          file: file,
          preview: null,
          type: file.type.includes('pdf') ? 'pdf' : 'docx'
        }]);
      }
    });
  };

  // Remove file
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Refine prompt
  const handleRefine = async () => {
    // Validate inputs
    if (!plainText.trim() && files.length === 0) {
      toast.error('Please provide text input or upload files');
      return;
    }

    setStatus('processing');
    setUploadProgress(0);
    setError('');
    setRefinedPrompt(null);

    try {
      const formData = new FormData();
      
      // Add plain text
      if (plainText.trim()) {
        formData.append('text', plainText.trim());
      }

      // Add files
      files.forEach(file => {
        formData.append('files', file);
      });

      // Add language
      formData.append('lang', language);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/prompt-refiner/refine`,
        formData,
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

      if (res.data.success) {
        setRefinedPrompt(res.data.refinedPrompt);
        setStatus('done');
        setUploadProgress(100);
        toast.success('Prompt refined successfully!');
      } else {
        throw new Error(res.data.message || 'Refinement failed');
      }
    } catch (err) {
      console.error('Refinement error:', err);
      setStatus('error');
      setError(err.response?.data?.message || err.message || 'Failed to refine prompt');
      toast.error(err.response?.data?.message || 'Failed to refine prompt');
    }
  };

  // Copy refined prompt to clipboard
  const handleCopy = async () => {
    if (!refinedPrompt) return;

    const promptText = formatPromptForCopy(refinedPrompt);
    try {
      await navigator.clipboard.writeText(promptText);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Download refined prompt as JSON
  const handleDownload = () => {
    if (!refinedPrompt) return;

    const dataStr = JSON.stringify(refinedPrompt, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `refined-prompt-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  // Format prompt for text copy
  const formatPromptForCopy = (prompt) => {
    return `INTENT:
${prompt.intent}

REQUIREMENTS:
${prompt.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

CONSTRAINTS:
${prompt.constraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}

DELIVERABLES:
${prompt.deliverables.map((d, i) => `${i + 1}. ${d}`).join('\n')}

METADATA:
Source Types: ${prompt.metadata.sourceTypes.join(', ')}
Confidence: ${(prompt.metadata.confidence * 100).toFixed(1)}%
Timestamp: ${new Date(prompt.metadata.timestamp).toLocaleString()}`;
  };

  // Reset form
  const handleReset = () => {
    setPlainText('');
    setFiles([]);
    setFilePreviews([]);
    setRefinedPrompt(null);
    setStatus('idle');
    setUploadProgress(0);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFileIcon = (type) => {
    if (type === 'image') return <Image className="w-5 h-5" />;
    if (type === 'pdf') return <File className="w-5 h-5" />;
    return <FileType className="w-5 h-5" />;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Prompt Refiner</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Transform multi-modal inputs (text, images, PDFs, Word docs) into structured, refined prompts
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Input Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Input */}
                <div className="space-y-4">
                  <div>
                    <Label>Language</Label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full border rounded px-3 py-2 mt-1"
                    >
                      <option value="eng">English</option>
                      <option value="hin">Hindi</option>
                      <option value="spa">Spanish</option>
                      <option value="fra">French</option>
                      <option value="por">Portuguese</option>
                    </select>
                  </div>

                  <div>
                    <Label>Plain Text Input</Label>
                    <textarea
                      ref={textAreaRef}
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                      placeholder="Enter your prompt, requirements, or description here..."
                      rows={6}
                      className="w-full border rounded p-3 mt-1 resize-none"
                    />
                  </div>

                  <div>
                    <Label>Upload Files (Images, PDFs, Word Docs)</Label>
                    <div
                      className="border-dashed border-2 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 mt-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to select or drop files
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supported: JPG, PNG, PDF, DOCX (up to 5 files)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* File Previews */}
                    {filePreviews.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {filePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 border rounded bg-gray-50"
                          >
                            {preview.preview ? (
                              <img
                                src={preview.preview}
                                alt="preview"
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded">
                                {getFileIcon(preview.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {preview.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(preview.file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  {status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Processing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRefine}
                      disabled={status === 'processing' || (!plainText.trim() && files.length === 0)}
                      className="flex-1"
                    >
                      {status === 'processing' ? 'Refining...' : 'Refine Prompt'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleReset}
                      disabled={status === 'processing'}
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Right: Output */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Refined Prompt</Label>
                    {refinedPrompt && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>

                  {!refinedPrompt && status === 'idle' && (
                    <div className="border rounded p-6 bg-gray-50 text-center text-sm text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Refined prompt will appear here</p>
                    </div>
                  )}

                  {status === 'processing' && (
                    <div className="border rounded p-6 bg-gray-50 text-center text-sm text-muted-foreground">
                      <p>Processing your inputs...</p>
                    </div>
                  )}

                  {refinedPrompt && (
                    <div className="space-y-4 border rounded p-4 bg-white">
                      {/* Intent */}
                      <div>
                        <Label className="text-sm font-semibold text-primary">Intent</Label>
                        <p className="mt-1 p-2 bg-blue-50 rounded text-sm">
                          {refinedPrompt.intent}
                        </p>
                      </div>

                      {/* Requirements */}
                      <div>
                        <Label className="text-sm font-semibold text-primary">Requirements</Label>
                        <ul className="mt-1 space-y-1">
                          {refinedPrompt.requirements.map((req, i) => (
                            <li key={i} className="p-2 bg-green-50 rounded text-sm flex items-start gap-2">
                              <span className="font-medium text-green-700">{i + 1}.</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Constraints */}
                      <div>
                        <Label className="text-sm font-semibold text-primary">Constraints</Label>
                        <ul className="mt-1 space-y-1">
                          {refinedPrompt.constraints.map((constraint, i) => (
                            <li key={i} className="p-2 bg-yellow-50 rounded text-sm flex items-start gap-2">
                              <span className="font-medium text-yellow-700">{i + 1}.</span>
                              <span>{constraint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <Label className="text-sm font-semibold text-primary">Deliverables</Label>
                        <ul className="mt-1 space-y-1">
                          {refinedPrompt.deliverables.map((deliverable, i) => (
                            <li key={i} className="p-2 bg-purple-50 rounded text-sm flex items-start gap-2">
                              <span className="font-medium text-purple-700">{i + 1}.</span>
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metadata */}
                      <div className="pt-2 border-t">
                        <Label className="text-xs font-semibold text-muted-foreground">Metadata</Label>
                        <div className="mt-1 text-xs text-muted-foreground space-y-1">
                          <p>
                            <strong>Sources:</strong> {refinedPrompt.metadata.sourceTypes.join(', ')}
                          </p>
                          <p>
                            <strong>Confidence:</strong> {(refinedPrompt.metadata.confidence * 100).toFixed(1)}%
                          </p>
                          <p>
                            <strong>Files:</strong> {refinedPrompt.metadata.fileCount}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default PromptRefiner;
