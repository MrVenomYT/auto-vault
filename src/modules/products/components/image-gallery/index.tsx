import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-8 gap-y-6">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[16/10] w-full overflow-hidden bg-ui-bg-subtle p-8 flex items-center justify-center rounded-large shadow-sm"
              id={image.id}
            >
              <Image
                src={image.url}
                priority={index <= 2 ? true : false}
                className="object-contain object-center drop-shadow-xl p-4"
                alt={`Vehicle image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 480px, (max-width: 992px) 720px, 1200px"
                referrerPolicy="no-referrer"
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
