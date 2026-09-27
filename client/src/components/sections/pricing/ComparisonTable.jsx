import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { pricingData } from '../../../content/pricing.js';
import { Check, Minus } from 'lucide-react';

export default function ComparisonTable() {
  const renderValue = (val) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="flex justify-center text-accent">
          <div className="p-1 rounded-full bg-accent/15">
            <Check className="w-4 h-4" />
          </div>
          <span className="sr-only">Included</span>
        </div>
      ) : (
        <div className="flex justify-center text-fg-3">
          <Minus className="w-4 h-4" />
          <span className="sr-only">Not included</span>
        </div>
      );
    }
    return <span className="text-sm font-medium text-fg-2">{val}</span>;
  };

  return (
    <Section tone="elevated">
      <SectionHeader
        eyebrow="FEATURE BREAKDOWN"
        title="Compare plan capabilities"
        subtitle="Detailed side-by-side comparison of deliverables, revisions, and post-launch support."
        align="center"
      />

      <Reveal className="mt-12 sm:mt-16">
        <Card className="overflow-hidden p-0 border border-border-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-hover/50">
                  <th className="p-5 sm:p-6 text-sm font-semibold text-fg w-2/5 sticky left-0 bg-surface sm:bg-transparent z-10">
                    Features & Deliverables
                  </th>
                  <th className="p-5 sm:p-6 text-sm font-bold text-fg text-center w-1/5">
                    Starter
                  </th>
                  <th className="p-5 sm:p-6 text-sm font-bold text-accent text-center w-1/5 bg-accent/5">
                    Business
                  </th>
                  <th className="p-5 sm:p-6 text-sm font-bold text-fg text-center w-1/5">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {pricingData.comparison.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-surface-hover/30 transition-colors"
                  >
                    <td className="p-5 sm:p-6 text-sm font-medium text-fg sticky left-0 bg-surface sm:bg-transparent z-10">
                      {row.feature}
                    </td>
                    <td className="p-5 sm:p-6 text-center">
                      {renderValue(row.starter)}
                    </td>
                    <td className="p-5 sm:p-6 text-center bg-accent/5">
                      {renderValue(row.business)}
                    </td>
                    <td className="p-5 sm:p-6 text-center">
                      {renderValue(row.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
