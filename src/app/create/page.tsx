import ProductForm from "@/components/ProductForm/ProductForm";

const CreatePage = () => {
  return (
    <div className="container flex flex-col justify-center items-center gap-2 min-h-screen">
      <p className="text-2xl font-bold">Add a product:</p>
      <ProductForm />
    </div>
  );
};

export default CreatePage;
