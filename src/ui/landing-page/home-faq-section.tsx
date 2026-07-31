import { homeFaq } from "@/lib/content/home-faq";

export default function HomeFaqSection() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 space-y-3">
      {homeFaq.map(({ question, answer }) => (
        <details key={question} className="border rounded-lg px-4 py-3 group">
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
  );
}
