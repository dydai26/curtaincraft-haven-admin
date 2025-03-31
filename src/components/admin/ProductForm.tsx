import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product, SizeVariant } from '@/lib/data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Plus, Upload, Image, Loader2 } from 'lucide-react';
import { storageUtils } from '@/lib/storageUtils';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';

const sizeVariantSchema = z.object({
  size: z.string().min(1, { message: 'Розмір не може бути порожнім' }),
  price: z.number().min(0, { message: 'Ціна має бути більше або дорівнювати 0' }),
  inStock: z.boolean(),
});

const formSchema = z.object({
  name: z.string().min(3, { message: 'Назва товару має бути не менше 3 символів' }),
  price: z.coerce.number().min(1, { message: 'Ціна має бути більше 0' }),
  category: z.enum(['curtains', 'tulle', 'accessories'], { 
    message: 'Виберіть категорію товару' 
  }),
  subcategory: z.string().optional(),
  description: z.string().min(10, { message: 'Опис має бути не менше 10 символів' }),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  care: z.string().optional(),
  characteristics: z.array(z.string()).optional(),
  inStock: z.boolean(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  discount: z.coerce.number().min(0).max(100).optional(),
  images: z.array(z.string()).min(1, { message: 'Додайте хоча б одне зображення' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const [sizeVariants, setSizeVariants] = useState<SizeVariant[]>(
    product?.sizeVariants || [
      { size: "", price: 0, inStock: true },
      { size: "", price: 0, inStock: true },
      { size: "", price: 0, inStock: true },
    ]
  );
  const [characteristics, setCharacteristics] = useState<string[]>(product?.characteristics || []);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      category: product?.category || 'curtains',
      subcategory: product?.subcategory || '',
      description: product?.description || '',
      material: product?.material || '',
      dimensions: product?.dimensions || '',
      care: product?.care || '',
      characteristics: product?.characteristics || [],
      inStock: product?.inStock ?? true,
      isNew: product?.isNew || false,
      isFeatured: product?.isFeatured || false,
      discount: product?.discount || 0,
      images: product?.images || [],
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Filter out empty size variants
    const filteredSizeVariants = sizeVariants.filter(
      variant => variant.size !== "" && variant.price > 0
    );
    
    // Видаляємо префікс /public/ з шляхів до зображень
    const processedImages = values.images.map(img => 
      img.replace('/public/', '')
    );
    
    const newProduct: Product = {
      id: product?.id || uuidv4(),
      name: values.name,
      price: values.price,
      category: values.category,
      subcategory: values.subcategory,
      description: values.description,
      material: values.material,
      dimensions: values.dimensions,
      care: values.care,
      characteristics: characteristics,
      inStock: values.inStock,
      isNew: values.isNew,
      isFeatured: values.isFeatured,
      discount: values.discount,
      images: processedImages,
      sizeVariants: filteredSizeVariants,
    };
    
    onSave(newProduct);
    onOpenChange(false);
  };

  const addSizeVariant = () => {
    setSizeVariants([...sizeVariants, { size: "", price: 0, inStock: true }]);
  };

  const removeSizeVariant = (index: number) => {
    setSizeVariants(sizeVariants.filter((_, i) => i !== index));
  };

  const updateSizeVariant = (index: number, key: keyof SizeVariant, value: any) => {
    const updatedVariants = [...sizeVariants];
    updatedVariants[index] = { ...updatedVariants[index], [key]: value };
    setSizeVariants(updatedVariants);
  };

  const addCharacteristic = (characteristic: string) => {
    if (characteristic.trim() !== "") {
      setCharacteristics([...characteristics, characteristic]);
    }
  };

  const removeCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      console.log('Starting file upload...');
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Uploading file:', file.name);
        try {
          const url = await storageUtils.uploadImage(file);
          console.log('File uploaded successfully:', url);
          return url;
        } catch (error) {
          console.error('Error uploading file:', file.name, error);
          throw error;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('All files uploaded:', uploadedUrls);
      
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      form.setValue('images', newImages);
      
      toast({
        title: "Зображення завантажено",
        description: `${files.length} ${files.length === 1 ? 'зображення було' : 'зображень було'} успішно завантажено.`,
      });
    } catch (error) {
      console.error("Detailed upload error:", error);
      toast({
        title: "Помилка завантаження",
        description: "Не вдалося завантажити зображення. Перевірте консоль для деталей.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (index: number) => {
    try {
      const imageUrl = images[index];
      // Отримуємо шлях до файлу з URL
      const path = imageUrl.split('/').pop();
      if (path) {
        await storageUtils.deleteImage(`products/${path}`);
      }
      
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      form.setValue('images', newImages);
      
      toast({
        title: "Зображення видалено",
        description: "Зображення було успішно видалено.",
      });
    } catch (error) {
      toast({
        title: "Помилка видалення",
        description: "Не вдалося видалити зображення. Спробуйте ще раз.",
        variant: "destructive",
      });
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Редагувати товар' : 'Додати новий товар'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва товару</FormLabel>
                  <FormControl>
                    <Input placeholder="Назва товару" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Базова ціна (₴)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Знижка (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категорія</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Виберіть категорію" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="curtains">Штори</SelectItem>
                        <SelectItem value="tulle">Тюль</SelectItem>
                        <SelectItem value="accessories">Аксесуари</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Підкатегорія</FormLabel>
                    <FormControl>
                      <Input placeholder="Підкатегорія" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис товару</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Детальний опис товару"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <FormItem>
                <FormLabel>Варіанти розмірів</FormLabel>
                <div className="space-y-2">
                  {sizeVariants.map((variant, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Розмір (напр. 150x250 см)"
                        value={variant.size}
                        onChange={(e) => updateSizeVariant(index, 'size', e.target.value)}
                        className="flex-grow"
                      />
                      <Input
                        type="number"
                        placeholder="Ціна"
                        value={variant.price}
                        onChange={(e) => updateSizeVariant(index, 'price', Number(e.target.value))}
                        className="w-24"
                      />
                      <Select 
                        value={variant.inStock ? "true" : "false"}
                        onValueChange={(value) => updateSizeVariant(index, 'inStock', value === "true")}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Наявність" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">В наявності</SelectItem>
                          <SelectItem value="false">Немає</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeSizeVariant(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSizeVariant}
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Додати розмір
                  </Button>
                </div>
              </FormItem>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Зображення</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Завантаження...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Завантажити
                      </>
                    )}
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Матеріал</FormLabel>
                    <FormControl>
                      <Input placeholder="Матеріал" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Розміри</FormLabel>
                    <FormControl>
                      <Input placeholder="Розміри" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="care"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Догляд</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Інструкції з догляду"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <FormItem>
                <FormLabel>Особливості</FormLabel>
                <div className="space-y-2">
                  {characteristics.map((characteristic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={characteristic} disabled className="flex-grow" />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeCharacteristic(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Нова особливість"
                      onChange={(e) => {}}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCharacteristic(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Нова особливість"]') as HTMLInputElement;
                        if (input) {
                          addCharacteristic(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Додати
                    </Button>
                  </div>
                </div>
              </FormItem>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">В наявності</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Новинка</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Рекомендований</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Скасувати
              </Button>
              <Button type="submit">Зберегти</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
