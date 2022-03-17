export interface Category {
  id?: string;
  nanoid?: string;
  name?: string;
}

export interface Article {
  id?: string;
  nanoid: string;
  category_id?: string;
  source: string;
  image: string;
  name: string;
  url: string;
}
