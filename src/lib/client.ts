
import { createClient } from '@sanity/client'
import  imageUrlBuilder  from '@sanity/image-url'
export const client = createClient({
    projectId:'u8lf0ibx',
    dataset:'production',
    apiVersion:'2023-04-27',
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_KEY,
    ignoreBrowserTokenWarning:true
})
const builder = imageUrlBuilder(client)
export const urlfor = (s : any)  => builder.image(s)