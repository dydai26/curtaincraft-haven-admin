export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: string
          subcategory: string | null
          price: number
          description: string
          material: string | null
          dimensions: string | null
          care: string | null
          inStock: boolean
          isNew: boolean
          isFeatured: boolean
          discount: number | null
          images: Json
          characteristics: Json
          sizeVariants: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          subcategory?: string | null
          price: number
          description: string
          material?: string | null
          dimensions?: string | null
          care?: string | null
          inStock?: boolean
          isNew?: boolean
          isFeatured?: boolean
          discount?: number | null
          images?: Json
          characteristics?: Json
          sizeVariants?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          subcategory?: string | null
          price?: number
          description?: string
          material?: string | null
          dimensions?: string | null
          care?: string | null
          inStock?: boolean
          isNew?: boolean
          isFeatured?: boolean
          discount?: number | null
          images?: Json
          characteristics?: Json
          sizeVariants?: Json
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          rating: number
          text: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          rating: number
          text: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          rating?: number
          text?: string
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 