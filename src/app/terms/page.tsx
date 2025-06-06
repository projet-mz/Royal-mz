import { MainLayout } from '@/components/layout/MainLayout';

export default function Terms() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Please read these terms carefully before using our services.
          </p>
        </section>

        {/* Terms Content */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Acceptance of Terms</h3>
          <div className="space-y-4 text-secondary">
            <p>
              By accessing and using the Amarck Royal International School website and services, 
              you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Use License</h3>
          <div className="space-y-4 text-secondary">
            <p>
              Permission is granted to temporarily access the materials on Amarck Royal International School&apos;s 
              website for personal, non-commercial transitory viewing only.
            </p>
            <p>This license shall automatically terminate if you violate any of these restrictions.</p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Disclaimer</h3>
          <div className="space-y-4 text-secondary">
            <p>
              The materials on Amarck Royal International School&apos;s website are provided on an &apos;as is&apos; basis. 
              Amarck Royal International School makes no warranties, expressed or implied, and hereby disclaims 
              and negates all other warranties including without limitation, implied warranties or conditions 
              of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
              or other violation of rights.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Limitations</h3>
          <div className="space-y-4 text-secondary">
            <p>
              In no event shall Amarck Royal International School or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on Amarck Royal International School&apos;s 
              website, even if Amarck Royal International School or an authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Accuracy of Materials</h3>
          <div className="space-y-4 text-secondary">
            <p>
              The materials appearing on Amarck Royal International School&apos;s website could include technical, 
              typographical, or photographic errors. Amarck Royal International School does not warrant that 
              any of the materials on its website are accurate, complete, or current.
            </p>
          </div>
        </section>

        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>
          <div className="text-secondary">
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-2">
              <li>Email: legal@amarckroyal.edu.gh</li>
              <li>Phone: +233 20 123 4567</li>
              <li>Address: 123 Education Avenue, Accra, Ghana</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
