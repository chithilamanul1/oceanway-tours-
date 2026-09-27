import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Terms & Conditions | OceanWay Tours',
  description: 'Terms and conditions for booking holidays and tour packages with OceanWay Tours.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms and conditions carefully before booking a tour with us."
        image="https://cdn.magicpatterns.com/patterns/generated-images/710acca0-7433-4231-b9f4-1e43fc9a89e0.jpg"
      />
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="prose prose-lg prose-forest mx-auto bg-white p-8 md:p-12 shadow-sm border border-line rounded-xl">
          <h2 className="text-2xl font-display text-forest mb-4">1. Booking and Payments</h2>
          <p className="text-charcoal/80 mb-6">
            A deposit is required to secure your booking. The remaining balance must be paid in full prior to your departure date as specified in your booking confirmation. We accept major credit cards and bank transfers. All prices are quoted in USD unless otherwise stated.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">2. Cancellations & Refunds</h2>
          <p className="text-charcoal/80 mb-6">
            If you need to cancel your trip, you must notify us in writing. Cancellation fees are calculated based on the date we receive your written notification. Deposits are generally non-refundable. We strongly recommend purchasing comprehensive travel insurance that includes cancellation coverage.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">3. Travel Insurance</h2>
          <p className="text-charcoal/80 mb-6">
            Adequate and valid travel insurance is mandatory for all clients booking a tour with OceanWay Tours. Your insurance must cover accidents, injury, illness and death medical expenses, including any related to pre-existing medical conditions, emergency repatriation, and personal liability.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">4. Passports and Visas</h2>
          <p className="text-charcoal/80 mb-6">
            It is your responsibility to ensure that you have valid passports, visas, and re-entry permits which meet the requirements of immigration and other government authorities. Any fines, penalties, payments or expenditures incurred as a result of such documents not meeting the requirements of those authorities will be your sole responsibility.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">5. Itinerary Changes</h2>
          <p className="text-charcoal/80 mb-6">
            While we strive to operate all tours as described, we reserve the right to change the tour itinerary due to unforeseen circumstances, including but not limited to weather conditions, political unrest, or operational requirements. We will make reasonable efforts to provide suitable alternatives of a similar standard.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">6. Liability</h2>
          <p className="text-charcoal/80 mb-6">
            OceanWay Tours (Pvt) Ltd acts only as an agent for the operating companies, airlines, hotels, and other suppliers providing services. We are not liable for any injury, damage, loss, delay, or irregularity that may occur due to the actions or omissions of these third-party suppliers.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">7. Privacy Policy</h2>
          <p className="text-charcoal/80 mb-6">
            We are committed to protecting your privacy. Any personal information you provide to us will be used solely for the purpose of processing your booking and will not be shared with third parties without your consent, except as necessary to fulfill your travel arrangements.
          </p>
          
          <h2 className="text-2xl font-display text-forest mb-4">8. Contact Us</h2>
          <p className="text-charcoal/80 mb-8">
            If you have any questions about these Terms & Conditions, please contact us at:
            <br /><br />
            <strong>OceanWay Tours (Pvt) Ltd</strong><br />
            Negombo, Sri Lanka<br />
            Email: hello@oceanwaytours.com<br />
            Phone: +94 76 363 4022
          </p>
          
          <p className="text-sm text-charcoal/50 border-t border-line pt-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </>
  );
}
