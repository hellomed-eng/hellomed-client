import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-hmblack text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">HELLOMED</h2>
            <p className="text-gray-400">Medical attention you can rely on.</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <Link href="/make-appointment" className="hover:text-white">
                  Make an appointment
                </Link>
              </li>
              <li>
                <Link href="/urgent-care" className="hover:text-white">
                  Urgent care
                </Link>
              </li>
              <li>
                <Link href="/primary-care" className="hover:text-white">
                  Primary care
                </Link>
              </li>
              <li>
                <Link
                  href="/immigration-medical-exam"
                  className="hover:text-white"
                >
                  Immigration medical exam
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance-information"
                  className="hover:text-white"
                >
                  Insurance information
                </Link>
              </li>
              <li>
                <Link href="/future-employee" className="hover:text-white">
                  Careers
                </Link>
              </li>
              
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sms-terms" className="hover:text-white">
                  SMS Terms
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>(734) 210-1122</li>
              <li>JWHS@hello-med.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Media</h3>
            <div className="flex mt-2 space-x-4">
              <a
               href="https://www.instagram.com/hellomedclinic/"
                className="text-gray-400 hover:text-white"
                aria-label="HELLOMED on Instagram"
              >
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.055 2.037.24 2.515.513.508.29.88.677 1.279 1.279.273.478.458 1.309.513 2.515.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.206-.24 2.037-.513 2.515a3.89 3.89 0 0 1-1.279 1.279c-.478.273-1.309.458-2.515.513-1.266.059-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.055-2.037-.24-2.515-.513a3.89 3.89 0 0 1-1.279-1.279c-.273-.478-.458-1.309-.513-2.515-.059-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.206.24-2.037.513-2.515a3.89 3.89 0 0 1 1.279-1.279c.478-.273 1.309-.458 2.515-.513 1.266-.059 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.015 7.053.072c-1.206.056-2.718.247-3.69.597a6.839 6.839 0 0 0-2.453 1.58A6.839 6.839 0 0 0 .669 4.103c-.35.972-.54 2.484-.597 3.69C0 8.332.015 8.741.072 10.02c.056 1.279.072 1.688.072 4.938s-.015 3.659-.072 4.938c-.056 1.206-.247 2.718-.597 3.69a6.839 6.839 0 0 0-1.58 2.453A6.839 6.839 0 0 0 .669 23.897c.35.972.54 2.484.597 3.69C8.332 24 8.741 24 12 24s3.659-.015 4.938-.072c1.279-.056 1.688-.072 4.938-.072s3.659.015 4.938.072c1.206.056 2.718.247 3.69.597a6.839 6.839 0 0 0 2.453-1.58A6.839 6.839 0 0 0 23.897 19.331c.35-.972.54-2.484.597-3.69.057-1.279.072-1.688.072-4.938s-.015-3.659-.072-4.938c-.056-1.206-.247-2.718-.597-3.69a6.839 6.839 0 0 0-1.58-2.453A6.839 6.839 0 0 0 19.331.669c-.972-.35-2.484-.54-3.69-.597C15.841.015 15.452 0 12 0z" />
                  <path d="M12 5.838a6.163 6.163 0 1 0 0 12.326A6.163 6.163 0 1 0 12 5.838zm0 10.163a4 4 0 1 1 0-8 4 4 0 1 1 0 8zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 1 0 2.88 0z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/hellomedclinic/"
                className="text-gray-400 hover:text-white"
                aria-label="HELLOMED on Facebook"
               >
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .78 0 1.77v20.46C0 23.22.79 24 1.77 24h11.03v-8.62H9.69V10.5h3.12V7.89c0-3.1 1.9-4.79 4.67-4.79 1.33 0 2.46.1 2.79.14v3.24h-1.91c-1.5 0-1.8.71-1.8 1.76v2.3h3.59l-.47 3.88h-3.12V24h6.12c.98 0 1.77-.78 1.77-1.77V1.77C24 .78 23.22 0 22.23 0z" />
                </svg>
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56v14.88A4.56 4.56 0 0 1 19.44 24H4.56A4.56 4.56 0 0 1 0 19.44V4.56A4.56 4.56 0 0 1 4.56 0h14.88A4.56 4.56 0 0 1 24 4.56zM9.54 18.6V9.54H6.6v9.06h2.94zM8.07 8.29a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48zm10.53 10.31h-2.93v-4.5c0-1.08-.02-2.46-1.49-2.46-1.49 0-1.72 1.16-1.72 2.36v4.6H9.54V9.54h2.81v1.23h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.5 1.94 3.5 4.46v5.89z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.16c-5.45 0-9.84 4.39-9.84 9.84s4.39 9.84 9.84 9.84 9.84-4.39 9.84-9.84-4.39-9.84-9.84-9.84zm5.33 13.04h-2.24v-3.97c0-.95-.02-2.16-1.33-2.16s-1.54 1.04-1.54 2.1v4.03h-2.24V9.54h2.16v1.29h.03c.3-.57 1.06-1.17 2.18-1.17 2.34 0 2.77 1.54 2.77 3.53v4.02z" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            &copy; HELLOMED {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
