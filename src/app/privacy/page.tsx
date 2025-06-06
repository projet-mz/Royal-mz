import { MainLayout } from '@/components/layout/MainLayout';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </section>

        {/* Privacy Content */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Information We Collect</h3>
          <div className="space-y-4 text-secondary">
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              fill out a form, or contact us for support.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Student information (academic records, attendance data)</li>
              <li>Communication preferences</li>
              <li>Usage data and analytics</li>
            </ul>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">How We Use Your Information</h3>
          <div className="space-y-4 text-secondary">
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide and maintain our educational services</li>
              <li>Process admissions applications</li>
              <li>Communicate with students, parents, and staff</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Information Sharing</h3>
          <div className="space-y-4 text-secondary">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
            <p>
              We may share information with trusted service providers who assist us in operating our 
              website and conducting our business, provided they agree to keep this information confidential.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Data Security</h3>
          <div className="space-y-4 text-secondary">
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure, 
              so we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Us</h3>
          <div className="text-secondary">
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2">
              <li>Email: privacy@amarckroyal.edu.gh</li>
              <li>Phone: +233 20 123 4567</li>
              <li>Address: 123 Education Avenue, Accra, Ghana</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
