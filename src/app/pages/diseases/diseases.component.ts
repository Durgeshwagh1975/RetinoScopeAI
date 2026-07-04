import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionService, PredictionResponse } from '../../services/prediction.service';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diseases.component.html',
  styleUrl: './diseases.component.css'
})
export class DiseasesComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  predictionResult: PredictionResponse | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private predictionService: PredictionService) {}

  /**
   * Handle file selection
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.handleFile(file);
  }

  /**
   * Handle drag over
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Handle file drop
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  /**
   * Process the selected file
   */
  private handleFile(file: File): void {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Please select a valid image file (PNG, JPG, JPEG)';
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.errorMessage = 'File size must be less than 10MB';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
    this.predictionResult = null;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Upload image and get prediction
   */
  analyzImage(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image first';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.predictionResult = null;

    this.predictionService.predictImage(this.selectedFile).subscribe({
      next: (response: PredictionResponse) => {
        this.predictionResult = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Prediction error:', error);
        this.errorMessage = error.error?.error || 'Failed to analyze image. Please ensure the backend server is running.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Get badge class based on diagnosis
   */
  getDiagnosisBadgeClass(): string {
    if (!this.predictionResult) return 'badge-glow';
    
    switch (this.predictionResult.prediction) {
      case 'NORMAL':
        return 'badge-success-glow';
      case 'CNV':
        return 'badge-warning-glow';
      case 'DME':
        return 'badge-warning-glow';
      case 'DRUSEN':
        return 'badge-glow';
      default:
        return 'badge-glow';
    }
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.predictionResult = null;
    this.errorMessage = null;
    this.isLoading = false;
  }
}
