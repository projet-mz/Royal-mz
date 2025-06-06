import { MainLayout } from '@/components/layout/MainLayout';

export default function Admissions() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Admissions
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Join our community of learners and discover your potential at Amarck Royal International School.
          </p>
        </section>

        {/* Admission Process */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Admission Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h4 className="font-semibold text-primary mb-2">Application</h4>
              <p className="text-sm text-secondary">Submit completed application form with required documents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h4 className="font-semibold text-primary mb-2">Assessment</h4>
              <p className="text-sm text-secondary">Student assessment and parent interview</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h4 className="font-semibold text-primary mb-2">Enrollment</h4>
              <p className="text-sm text-secondary">Complete enrollment and begin your journey with us</p>
            </div>
          </div>
        </section>

        {/* Grade Levels */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Grade Levels Offered</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Early Years</h4>
              <ul className="space-y-2 text-secondary">
                <li>• Creche (6 months - 2 years)</li>
                <li>• Nursery 1 (2 - 3 years)</li>
                <li>• Nursery 2 (3 - 4 years)</li>
                <li>• Kindergarten 1 (4 - 5 years)</li>
                <li>• Kindergarten 2 (5 - 6 years)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Primary & Junior High</h4>
              <ul className="space-y-2 text-secondary">
                <li>• Primary 1 - 6 (6 - 12 years)</li>
                <li>• JHS 1 (12 - 13 years)</li>
                <li>• JHS 2 (13 - 14 years)</li>
                <li>• JHS 3 (14 - 15 years)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Admission Requirements</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Required Documents</h4>
              <ul className="space-y-1 text-secondary ml-4">
                <li>• Completed application form</li>
                <li>• Birth certificate</li>
                <li>• Previous school reports (if applicable)</li>
                <li>• Passport-sized photographs</li>
                <li>• Medical records and immunization certificate</li>
                <li>• Parent/Guardian identification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Application Deadlines</h4>
              <p className="text-secondary">
                Applications are accepted year-round, but we recommend applying early to secure your preferred start date. 
                Priority consideration is given to applications received before the start of each academic term.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-8">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Ready to Apply?</h3>
          <p className="text-secondary mb-6">Contact our admissions office to begin your application process.</p>
          <a href="/contact" className="button-3d bg-primary text-white px-8 py-3 rounded-lg">
            Contact Admissions
          </a>
        </section>
      </div>
    </MainLayout>
  );
}
