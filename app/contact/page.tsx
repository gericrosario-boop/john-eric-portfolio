import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a design or motion project with John Eric.'
};

export default function ContactPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-xl space-y-8">
        <SectionHeading title="Contact" subtitle="Let’s create high-converting visuals, motion content, and brand experiences." />
        <ContactForm />
      </div>
    </div>
  );
}
