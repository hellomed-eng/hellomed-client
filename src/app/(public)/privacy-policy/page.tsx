"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/ui/external/button";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white py-8 px-6 sm:px-10 shadow rounded-lg">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            HelloMed Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Effective Date: July 28, 2026
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
              <p>
                This Privacy Policy explains how HelloMed (&ldquo;HelloMed,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;our&rdquo;) collects, uses, and protects information collected through hello-med.com,
                our check-in process, and our post-visit SMS text messaging program (&ldquo;Program&rdquo;). It
                does not apply to your protected health information (PHI), which is instead governed by our
                HIPAA Notice of Privacy Practices, available in-office and on request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contact information you provide at check-in, such as your name and mobile phone number.</li>
                <li>Feedback and star ratings you submit through our post-visit review page.</li>
                <li>Comments you voluntarily submit through our private feedback form.</li>
                <li>Standard technical information collected automatically when you visit hello-med.com.</li>
              </ul>
              <p className="mt-3">
                We intentionally do not collect or transmit clinical information (such as visit reason,
                medications, or allergies) through the Program — only your name and phone number are used to
                schedule and send the post-visit text message.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To send you a one-time post-visit text message inviting feedback or a review.</li>
                <li>To route your feedback to HelloMed staff so we can follow up on concerns about your visit.</li>
                <li>To improve our services and patient experience.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. How We Share Your Information</h2>
              <p>
                We do not sell your personal information. We may share limited information with service
                providers who help us operate the Program and our website, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Twilio, our SMS messaging provider, which transmits text messages on our behalf.</li>
                <li>Vercel, our website/application hosting provider.</li>
                <li>Google, if you choose to leave a public review through a Google review link.</li>
              </ul>
              <p className="mt-3">
                These providers are only permitted to use your information to provide services to HelloMed
                and are not authorized to use it for their own marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Text Messaging Program</h2>
              <p>
                If you provide your phone number at check-in, you will receive one text message per visit
                inviting you to rate your experience. You may opt out at any time by replying STOP. See our{" "}
                <a href="/sms-terms" className="text-blue-600 hover:underline">
                  SMS Terms &amp; Conditions
                </a>{" "}
                for full details on message frequency, opt-out, and support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Data Retention</h2>
              <p>
                We retain the information described in this policy for as long as reasonably necessary to
                fulfill the purposes described above, or as required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Your Choices</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Opt out of text messages at any time by replying STOP.</li>
                <li>
                  Request access to, correction of, or deletion of your personal information by contacting
                  us using the details below, subject to applicable law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Children&rsquo;s Privacy</h2>
              <p>
                The Program and our website are not directed to children under 13, and we do not knowingly
                collect personal information from children under 13 through these channels.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Effective Date&rdquo; above
                reflects the most recent revision. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, contact us at:</p>
              <p className="mt-2">
                HelloMed
                <br />
                <a href="mailto:JWHS@hello-med.com" className="text-blue-600 hover:underline">
                  JWHS@hello-med.com
                </a>
                <br />
                <a href="tel:+17342101122" className="text-blue-600 hover:underline">
                  (734) 210-1122
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
