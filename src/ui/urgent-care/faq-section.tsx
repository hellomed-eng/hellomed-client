import { urgentCareFaq } from "@/lib/content/urgent-care-faq";
import PlusSign from "@/ui/urgent-care/plus-sign";

export default function FaqSection() {
  return (
    <div className="grid justify-center justify-items-center pt-16 md:pt-32 gap-y-5 md:gap-y-10">
      <PlusSign />
      <strong className="uppercase text-center text-5xl md:text-7xl">
        Frequently Asked Questions
      </strong>
      <div className="w-full max-w-3xl px-4 space-y-3">
        {urgentCareFaq.map(({ question, answer }) => (
          <details
            key={question}
            className="border rounded-lg px-4 py-3 group"
          >
            <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
              {question}
              <span className="ml-2 text-gray-400 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-2 text-gray-600">{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
