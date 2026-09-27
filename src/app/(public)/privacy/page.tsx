import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | OceanWay Tours',
  description: 'Privacy policy for OceanWay Tours. Learn how we handle your personal data.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="We respect your privacy and are committed to protecting your personal data."
        image="https://cdn.magicpatterns.com/patterns/generated-images/710acca0-7433-4231-b9f4-1e43fc9a89e0.jpg"
      />
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="prose prose-lg prose-forest mx-auto bg-white p-8 md:p-12 shadow-sm border border-line rounded-xl">
          <h2 className="text-2xl font-display text-forest mb-4">1. Information We Collect</h2>
          <p className="text-charcoal/80 mb-6">
            We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website, or otherwise contacting us. The personal information we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include names; phone numbers; email addresses; mailing addresses; contact preferences; and other similar information.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">2. How We Use Your Information</h2>
          <p className="text-charcoal/80 mb-6">
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below:
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To fulfill and manage your orders and bookings.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">3. Will Your Information Be Shared With Anyone?</h2>
          <p className="text-charcoal/80 mb-6">
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.
          </p>

          <h2 className="text-2xl font-display text-forest mb-4">4. Do We Use Cookies and Other Tracking Technologies?</h2>
          <p className="text-charcoal/80 mb-6">
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
          </p>
          
          <h2 className="text-2xl font-display text-forest mb-4">5. Contact Us</h2>
          <p className="text-charcoal/80 mb-8">
            If you have questions or comments about this notice, you may email us at:
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
