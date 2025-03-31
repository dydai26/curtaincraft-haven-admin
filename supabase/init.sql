-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  price DECIMAL(10, 2) NOT NULL,
  basePrice DECIMAL(10, 2),
  sizePrices JSONB DEFAULT '[]'::JSONB,
  description TEXT NOT NULL,
  characteristics JSONB DEFAULT '[]'::JSONB,
  images JSONB NOT NULL DEFAULT '[]'::JSONB,
  mainImage TEXT,
  additionalImages JSONB DEFAULT '[]'::JSONB,
  material TEXT,
  dimensions TEXT,
  care TEXT,
  inStock BOOLEAN DEFAULT true,
  isNew BOOLEAN DEFAULT false,
  isFeatured BOOLEAN DEFAULT false,
  discount INTEGER CHECK (discount >= 0 AND discount <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for products
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);
CREATE INDEX IF NOT EXISTS products_subcategory_idx ON public.products(subcategory);
CREATE INDEX IF NOT EXISTS products_isNew_idx ON public.products(isNew);
CREATE INDEX IF NOT EXISTS products_isFeatured_idx ON public.products(isFeatured);

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
DROP POLICY IF EXISTS "Enable read access for all users" ON public.products;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.products;
DROP POLICY IF EXISTS "Enable update for all users" ON public.products;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.products;

CREATE POLICY "Enable read access for all users" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.products
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON public.products
  FOR DELETE USING (true);

-- Create indexes
CREATE INDEX reviews_rating_idx ON public.reviews(rating);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Enable read access for all users" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.reviews
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON public.reviews
  FOR DELETE USING (true);

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow deletes" ON storage.objects;

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Дозволяємо публічний доступ до бакету
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Дозволяємо завантаження файлів
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );

-- Дозволяємо видалення файлів
CREATE POLICY "Allow deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );

-- Update products table
ALTER TABLE public.products 
DROP COLUMN IF EXISTS basePrice,
ADD COLUMN basePrice DECIMAL(10, 2);

-- Додаємо колонку inStock, якщо вона відсутня
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS inStock BOOLEAN DEFAULT true;

-- Додаємо інші можливі відсутні колонки
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS isNew BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS isFeatured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS discount INTEGER CHECK (discount >= 0 AND discount <= 100),
ADD COLUMN IF NOT EXISTS sizePrices JSONB DEFAULT '[]'::JSONB,
ADD COLUMN IF NOT EXISTS characteristics JSONB DEFAULT '[]'::JSONB,
ADD COLUMN IF NOT EXISTS additionalImages JSONB DEFAULT '[]'::JSONB;

-- Перевірка структури таблиці products
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'products';

-- Перевірка обмежень
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'products'::regclass;

-- Перевірка політик доступу
SELECT * FROM pg_policies WHERE tablename = 'products';

-- Оновлюємо структуру таблиці products
ALTER TABLE public.products 
ALTER COLUMN id TYPE UUID USING id::text::uuid,
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- Оновлюємо кеш схеми
NOTIFY pgrst, 'reload schema';
