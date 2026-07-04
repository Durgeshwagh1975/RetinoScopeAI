import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PredictionResponse {
  success: boolean;
  prediction: string;
  probability: number;
  filename: string;
  image_url: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Upload image and get prediction from Flask backend
   * @param file - Image file to analyze
   * @returns Observable with prediction results
   */
  predictImage(file: File): Observable<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<PredictionResponse>(
      `${this.apiUrl}/api/predict`,
      formData
    );
  }

  /**
   * Check backend health status
   * @returns Observable with health status
   */
  checkHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>(`${this.apiUrl}/api/health`);
  }
}
