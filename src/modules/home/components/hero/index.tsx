import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading, Text } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-full border-b border-ui-border-base relative bg-gradient-to-b from-neutral-900 to-neutral-950 text-white overflow-hidden py-16 small:py-24">
      <div className="content-container flex flex-col items-center text-center gap-8 relative z-10">
        <div className="max-w-3xl flex flex-col gap-4">
          <Text className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Premier Automotive Collection
          </Text>
          <Heading
            level="h1"
            className="text-4xl small:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Precision Performance Engineered For Excellence
          </Heading>
          <Text className="text-base small:text-lg text-neutral-300 max-w-2xl mx-auto">
            Explore authentic manufacturer sports cars and executive sedans available for immediate delivery
          </Text>
        </div>

        <div className="relative w-full max-w-4xl h-64 small:h-96 my-4 flex items-center justify-center">
          <Image
            src="https://pngimg.com/d/porsche_PNG10613.png"
            alt="Porsche 911 Carrera S"
            width={900}
            height={480}
            className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex items-center gap-4">
          <LocalizedClientLink href="/store">
            <Button size="large" variant="primary" className="bg-white text-black hover:bg-neutral-200">
              Explore Showroom
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
