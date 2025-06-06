import { MainLayout } from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Welcome to Amarck Royal International School
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            A premier educational institution serving students from Creche to JHS 3, 
            committed to excellence in education and character development.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/admissions" className="button-3d bg-primary text-white px-8 py-3 rounded-lg">
              Apply Now
            </a>
            <a href="/about" className="button-3d bg-secondary text-white px-8 py-3 rounded-lg">
              Learn More
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Academic Excellence</h3>
            <p className="text-secondary">Comprehensive curriculum from Creche to JHS 3 designed to nurture young minds.</p>
          </div>
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Modern Facilities</h3>
            <p className="text-secondary">State-of-the-art classrooms, laboratories, and recreational facilities.</p>
          </div>
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Character Development</h3>
            <p className="text-secondary">Holistic education focusing on academic and moral development.</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}   