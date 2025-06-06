import { MainLayout } from '@/components/layout/MainLayout';

export default function About() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            About Amarck Royal International School
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Established with a vision to provide world-class education, we are committed to nurturing young minds and building future leaders.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="dashboard-card">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
            <p className="text-secondary">
              To provide quality education that develops the intellectual, social, emotional, and physical potential of every student, preparing them for success in a rapidly changing world.
            </p>
          </div>
          <div className="dashboard-card">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h3>
            <p className="text-secondary">
              To be the leading educational institution in Ghana, recognized for academic excellence, character development, and innovative teaching methods.
            </p>
          </div>
        </section>

        {/* School Values */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Excellence</h4>
              <p className="text-sm text-secondary">Striving for the highest standards in all we do</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Integrity</h4>
              <p className="text-sm text-secondary">Building character through honesty and moral principles</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Innovation</h4>
              <p className="text-sm text-secondary">Embracing creative and modern teaching methods</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Community</h4>
              <p className="text-sm text-secondary">Fostering a supportive and inclusive environment</p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Our History</h3>
          <p className="text-secondary mb-4">
            Founded in 2020, Amarck Royal International School has quickly established itself as a premier educational institution in Ghana. 
            Starting with just a handful of students, we have grown to serve hundreds of families across the region.
          </p>
          <p className="text-secondary">
            Our commitment to academic excellence and character development has earned us recognition as one of the top schools in the area, 
            with graduates consistently performing well in national examinations and gaining admission to prestigious secondary schools.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
