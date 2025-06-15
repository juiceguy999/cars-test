export interface PaginationMeta {
  count: number;
  first_page_link: string;
  from: number;
  last_page: number;
  last_page_link: string;
  limit: number;
  page: number;
  prev_page_link?: string;
  next_page_link?: string;
  to: number;
  total: number;
  total_no_filters: number;
}

export interface ApiResponse {
  data: any[];
  meta: PaginationMeta;
}

