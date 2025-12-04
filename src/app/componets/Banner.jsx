import Image from "next/image";

function Banner() {
  return (
    <section className="w-full lg:h-[60vh] h-[40vh] relative">

      <Image
        src="/images/banner.jpg"
        alt="Christmas Dinner"
        fill
        className="lg:object-fill object-cover  lg:scale-x-101 w-full h-full"
      />

    </section>
  )
}

export default Banner