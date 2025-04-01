// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Type definitions
export interface UploadResponse {
  jobId: string;
  message: string;
}

export interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  currentRecord?: string;
  processedRecords?: number;
  totalRecords?: number;
}

export interface CleanedData {
  original: any;
  updated: any;
  changes: string[];
}

// API functions
export const api = {
  // Upload file for processing
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  // Check processing status
  async checkStatus(jobId: string): Promise<ProcessingStatus> {
    const response = await fetch(`${API_BASE_URL}/api/status/${jobId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get status');
    }

    return response.json();
  },

  // Get cleaned data results
  async getResults(jobId: string): Promise<CleanedData[]> {
    const response = await fetch(`${API_BASE_URL}/api/results/${jobId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get results');
    }

    return response.json();
  },

  // Pause processing
  async pauseProcessing(jobId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/pause/${jobId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to pause processing');
    }

    return response.json();
  },

  // Resume processing
  async resumeProcessing(jobId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/resume/${jobId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to resume processing');
    }

    return response.json();
  }
}; 