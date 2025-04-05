
import { getCategories, getProductPageData } from "@/app/actions/database";
import { getPhotos } from "@/app/actions/s3-bucket";
import Form from "@/app/ui-client/form";

export default async function Product({ params, }: {params: Promise<{ categorySlug: string }>}) {
    const { categorySlug } = await params;
    let product;
    let edit = false;
    if (categorySlug) {
        edit = true;
        const response = await getProductPageData(categorySlug);
        product = response.product;
    }
    const categories = await getCategories();
    const photos = await getPhotos();

    return <Form product={product} categories={categories} photos={photos} edit={edit} />

  }

  