
import { getCategories, getProductPageData } from "@/app/actions/database-get";
import { getPhotos } from "@/app/actions/s3-bucket";
import { toFormParams } from "@/app/domain";
import Form from "@/app/ui-client/form";
import { _Object } from "@aws-sdk/client-s3";

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
    const photos = await getPhotos() as _Object[];

    const formParams = toFormParams(product);

    return <Form formParams={formParams} categories={categories} photos={photos} edit={edit} />

  }

  