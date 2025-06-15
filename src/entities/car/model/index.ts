interface BrandRel {
  count: number;
  name: string;
  slug: string;
}

interface GenerationRel {
  count: number;
  name: string;
  slug: string;
}

interface ModelRel {
  count: number;
  name: string;
  slug: string;
}

interface Images {
  image: string[];
}

export interface Car {
  availability: string;
  body_type: string;
  body_type_eng: string;
  booking_allowed: boolean;
  brand_rel: BrandRel;
  color: string;
  color_eng: string;
  complectation_name: string;
  currency: string;
  custom: string;
  drive: string;
  engine_power: string;
  engine_power_num: number;
  engine_type: string;
  engine_type_eng: string;
  engine_volume: number;
  exchange: string;
  extras: string;
  folder_id: string;
  gearbox: string;
  gearbox_eng: string;
  generation_name: string;
  generation_rel: GenerationRel;
  images: Images;
  images_amount: number;
  mark_cyrillic_name: string;
  mark_id: string;
  metallic: string;
  model_cyrillic_name: string;
  model_name: string;
  model_rel: ModelRel;
  modification_id: string;
  offer_type: string;
  owners_number: string;
  owners_number_num: number;
  price: number;
  pts: string;
  registry_year: number;
  run: number;
  state: string;
  tech_param_id: number;
  unique_id: number;
  updated_at: string;
  video: string;
  vin: string;
  wheel: string;
  year: number;
}