import { Request } from 'express';

export type RequestType = {
  [prop: string]: any;
  headers: {
    access_token?: string;
    access_id?: string;
  };
} & Request;
export interface Category {
  id?: string;
  nanoid?: string;
  name?: string;
}

export interface ScrappedArticle {
  articleTitle?: string;
  articleUrl?: string;
  articleImage?: string;
}

export interface ReqObject {
  source: string;
  category: string;
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

export type Element = TextElement | TagElement | CommentElement;
interface TextElement {
  type: 'text';
  next: Element | null;
  prev: Element | null;
  parent: Element;
  data?: string | undefined;
  startIndex?: number | undefined;
  endIndex?: number | undefined;
}

interface TagElement {
  tagName: string;
  type: 'tag' | 'script' | 'style';
  name: string;
  attribs: { [attr: string]: string };
  'x-attribsNamespace': { [attr: string]: string };
  'x-prefixNamespace': { [attr: string]: string };
  children: Element[];
  childNodes: Element[] | null;
  lastChild: Element | null;
  firstChild: Element | null;
  next: Element | null;
  nextSibling: Element;
  prev: Element | null;
  previousSibling: Element;
  parent: Element;
  parentNode: Element;
  nodeValue: string;
  data?: string | undefined;
  startIndex?: number | undefined;
  endIndex?: number | undefined;
}

interface CommentElement {
  type: 'comment';
  next: Element | null;
  prev: Element | null;
  parent: Element;
  data?: string | undefined;
  startIndex?: number | undefined;
  endIndex?: number | undefined;
}
