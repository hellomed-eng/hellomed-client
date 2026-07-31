import Image from "next/image";

export default function UrgentMainBackground() {
  return (
    <div className="relative max-h-[calc(100vh-152px)] overflow-hidden">
      <div className="-m-4">
        <Image
          className="brightness-75 blur-sm"
          src="/urgent-main-bg.jpg"
          alt="Ann Arbor urgent care clinic"
          height={4912}
          width={7360}
        />
      </div>

      {/* Container for logo and text */}
      <div className="absolute grid place-items-center inset-0">
        <div className="grid justify-items-center w-11/12 text-white">
          <h1 className="font-black text-center md:mb-8 mt-4 text-2xl md:text-2xl lg:text-5xl">
              Urgent Care in Ann Arbor You Can Trust
          </h1>
          <h2 className="hidden md:block text-center font-black md:text-xl lg:text-2xl">
            HELLOMED is an Ann Arbor urgent care clinic serving the community's urgent healthcare needs since 2014. Our team of experienced
            medical professionals is committed to providing comprehensive care
            to individuals and families. We understand how important it is to
            have access to quality medical care, which is why we make it our
            priority to provide the best possible services for our patients.
            Visit us today and let us be a part of your healthcare experience.
          </h2>

          {/* Button to scroll down to next section */}
          <a className="hidden lg:block mt-8" href="#hours">
            <Image
              src="/down-arrow.svg"
              alt="down-arrow icon"
              height={50}
              width={50}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
