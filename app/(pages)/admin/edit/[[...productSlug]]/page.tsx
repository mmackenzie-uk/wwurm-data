
import { getFormParams } from "@/app/actions/form-actions";
import { getCategories, getProduct } from "@/app/actions/get-actions";
import { getPhotos } from "@/app/actions/s3-bucket";
import Form from "@/app/ui-client/form";
import { _Object } from "@aws-sdk/client-s3";

export default async function Page({ params, }: {params: Promise<{ productSlug: string }>}) {
    const { productSlug } = await params;
    const formParams = await getFormParams(productSlug)
    let edit = false;
    if (productSlug) {
        edit = true;
    }
    const categoriesResponse = await getCategories();
    const photos = await getPhotos() as _Object[];

    return <Form formParams={formParams} categoriesResponse={categoriesResponse} photos={photos} edit={edit} />

  }

  