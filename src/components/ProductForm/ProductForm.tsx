"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import { TextareaWithLabel } from "../TextareaWithLabel/TextareaWithLabel";
import { Button } from "../ui/button";

const productFormSchema = z.object({
  title: z.string(),
  brand: z.string(),
  description: z.string(),
  thumbnail: z.instanceof(File),
  price: z.coerce.number().gte(1000, "Price must be 1000 minimum"),
  category: z.string(),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = async (formData: z.infer<typeof productFormSchema>) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg space-y-3 block"
    >
      <InputWithLabel
        label="Title"
        id="product-title"
        isInvalid={errors.title}
        invalidMessage={errors.title?.message}
        {...register("title")}
        disabled={isSubmitting}
        required
        type="text"
      />
      <InputWithLabel
        label="Brand"
        id="product-brand"
        isInvalid={errors.brand}
        invalidMessage={errors.brand?.message}
        {...register("brand")}
        disabled={isSubmitting}
        required
        type="text"
      />
      <InputWithLabel
        label="Price"
        id="product-price"
        isInvalid={errors.price}
        invalidMessage={errors.price?.message}
        {...register("price")}
        disabled={isSubmitting}
        required
        type="number"
        min={0}
      />
      <TextareaWithLabel
        label="Description"
        id="product-description"
        isInvalid={errors.description}
        invalidMessage={errors.description?.message}
        {...register("description")}
        disabled={isSubmitting}
        required
      />
      <Button
        size={"lg"}
        className="w-full text-base"
        type="submit"
        disabled={isSubmitting}
      >
        Add product
      </Button>
    </form>
  );
};

export default ProductForm;
