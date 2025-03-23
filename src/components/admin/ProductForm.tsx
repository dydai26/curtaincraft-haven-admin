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
import { X, Plus, Upload, Image } from 'lucide-react';
import { fileToBase64 } from '@/lib/adminUtils';
import { useToast } from '@/components/ui/use-toast';

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
  onSave: (product: any) => void;
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
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageUrl, setImageUrl] = useState("");
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
    
    const newProduct = {
      ...values,
      sizeVariants: filteredSizeVariants,
      features,
      id: product?.id || Date.now(),
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

  const addFeature = (feature: string) => {
    if (feature.trim() !== "") {
      setFeatures([...features, feature]);
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const filePromises = Array.from(files).map(file => fileToBase64(file));
      const base64Images = await Promise.all(filePromises);
      
      const newImages = [...images, ...base64Images];
      setImages(newImages);
      form.setValue('images', newImages);
      
      toast({
        title: "Зображення завантажено",
        description: `${files.length} ${files.length === 1 ? 'зображення було' : 'зображень було'} успішно завантажено.`,
      });
    } catch (error) {
      toast({
        title: "Помилка завантаження",
        description: "Не вдалося завантажити зображення. Спробуйте ще раз.",
        variant: "destructive",
      });
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addImage = () => {
    if (imageUrl.trim() !== "") {
      const newImages = [...images, imageUrl];
      setImages(newImages);
      form.setValue('images', newImages);
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    form.setValue('images', newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
            
            <div className="grid grid-cols-1 gap-4">
              <FormItem>
                <FormLabel>Зображення</FormLabel>
                <div className="space-y-2">
                  {images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="relative w-12 h-12 overflow-hidden rounded border mr-2">
                        <img src={image} alt={`Товар ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <Input value={image} disabled className="flex-grow" />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="URL зображення"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addImage}
                      >
                        Додати URL
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Завантаження...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Завантажити з комп'ютера
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                {form.formState.errors.images && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.images.message}
                  </p>
                )}
              </FormItem>
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
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={feature} disabled className="flex-grow" />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFeature(index)}
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
                          addFeature(e.currentTarget.value);
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
                          addFeature(input.value);
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
