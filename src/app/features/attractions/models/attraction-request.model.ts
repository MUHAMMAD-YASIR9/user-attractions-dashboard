export interface CreateAttractionRequest {
  name: string;
  detail: string;
  coverimage: string;
  latitude: number;
  longitude: number;
}

export interface UpdateAttractionRequest {
  id: number;
  name?: string;
  detail?: string;
  coverimage?: string;
  latitude?: number;
  longitude?: number;
}

export interface DeleteAttractionRequest {
  id: number;
}
