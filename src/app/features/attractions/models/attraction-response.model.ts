export interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
  latitude: number;
  longitude: number;
}

export interface GetAttractionsResponse {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data: Attraction[];
}

export interface GetAttractionByIdResponse {
  status: string;
  attraction: Attraction;
}

export interface DeleteAttractionResponse {
  status: string;
  message: string;
}

export interface CreateUpdateAttractionResponse {
  status: string;
  message: string;
  attraction: Attraction;
}
