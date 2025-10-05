

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">{title}</h2>
    {children}
  </section>
);

const PrivacyPolicy = () => {
  return (
    <>
    
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Privacy Policy for ADHD Insights
        </h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <Section title="Introduction">
            <p>
              Welcome to ADHD Insights. We are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy outlines how we collect, 
              use, and safeguard your data.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Personal information (e.g., name, email address)</li>
              <li>Usage data (e.g., pages visited, time spent on site)</li>
              <li>ADHD-related information you choose to share</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and improve our ADHD support services</li>
              <li>Personalize your experience on our website</li>
              <li>Communicate with you about our services and updates</li>
            </ul>
          </Section>

          <Section title="Data Protection">
            <p>
              We implement various security measures to protect your personal information. 
              These include encryption, secure servers, and regular security audits.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data collection practices</li>
            </ul>
          </Section>

          <Section title="ADHD-Specific Considerations">
            <p>
              We understand the unique needs of individuals with ADHD. Our privacy practices 
              take into account:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Clear, concise language in our policies</li>
              <li>Easy-to-navigate privacy settings</li>
              <li>Regular reminders about privacy options</li>
              <li>Support for managing data and settings</li>
            </ul>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions about our Privacy Policy or how we handle your data, 
              please contact us at privacy@adhdinsights.com.
            </p>
          </Section>
        </div>
      </div>
    </div>

    </>

   
  );
};

export default PrivacyPolicy;