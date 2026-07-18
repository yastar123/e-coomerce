import { useState } from 'react';
import { Plus } from 'lucide-react';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0]?.id ?? null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  const filteredFAQs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div>
      {/* Category pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedId(null);
              }}
              className={
                'px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ' +
                (active
                  ? 'bg-foreground text-primary-foreground border border-foreground'
                  : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30')
              }
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          );
        })}
      </div>

      {/* FAQ list */}
      <div className="space-y-3">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const open = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={
                  'bg-card border rounded-2xl overflow-hidden transition-all ' +
                  (open
                    ? 'border-primary/40 shadow-[0_20px_40px_-20px_rgba(59,130,246,0.15)]'
                    : 'border-border')
                }
              >
                <button
                  onClick={() => setExpandedId(open ? null : faq.id)}
                  className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {faq.question}
                  </span>
                  <span
                    className={
                      'shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full border transition-all ' +
                      (open
                        ? 'bg-primary border-primary text-primary-foreground rotate-45'
                        : 'border-border text-muted-foreground')
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {open && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1">
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <p className="text-sm text-muted-foreground">Tidak ada FAQ untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
