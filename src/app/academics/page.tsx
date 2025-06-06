import { MainLayout } from '@/components/layout/MainLayout';

export default function Academics() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Academic Programs
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Our comprehensive curriculum is designed to challenge and inspire students at every level, from Creche to JHS 3.
          </p>
        </section>

        {/* Curriculum Overview */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Curriculum Overview</h3>
          <p className="text-secondary mb-6">
            Our curriculum follows the Ghana Education Service standards while incorporating international best practices. 
            We focus on developing critical thinking, creativity, and character alongside academic excellence.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Core Subjects</h4>
              <p className="text-sm text-secondary">Mathematics, English, Science, Social Studies</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Languages</h4>
              <p className="text-sm text-secondary">English, French, Local Languages</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-2">Enrichment</h4>
              <p className="text-sm text-secondary">Arts, Music, Physical Education, ICT</p>
            </div>
          </div>
        </section>

        {/* Academic Levels */}
        <section className="space-y-8">
          <h3 className="text-2xl font-semibold text-primary text-center">Academic Levels</h3>
          
          {/* Early Years */}
          <div className="dashboard-card">
            <h4 className="text-xl font-semibold mb-4 text-primary">Early Years (Creche - KG 2)</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-primary mb-2">Learning Approach</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• Play-based learning</li>
                  <li>• Sensory exploration</li>
                  <li>• Social skill development</li>
                  <li>• Basic literacy and numeracy</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-primary mb-2">Key Areas</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• Language development</li>
                  <li>• Motor skills</li>
                  <li>• Creative expression</li>
                  <li>• Character formation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Primary */}
          <div className="dashboard-card">
            <h4 className="text-xl font-semibold mb-4 text-primary">Primary School (Primary 1 - 6)</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-primary mb-2">Core Subjects</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• English Language</li>
                  <li>• Mathematics</li>
                  <li>• Integrated Science</li>
                  <li>• Social Studies</li>
                  <li>• Religious & Moral Education</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-primary mb-2">Additional Subjects</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• French</li>
                  <li>• Information Technology</li>
                  <li>• Creative Arts</li>
                  <li>• Physical Education</li>
                  <li>• Music & Dance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Junior High */}
          <div className="dashboard-card">
            <h4 className="text-xl font-semibold mb-4 text-primary">Junior High School (JHS 1 - 3)</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-primary mb-2">Core Subjects</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• English Language</li>
                  <li>• Mathematics</li>
                  <li>• Integrated Science</li>
                  <li>• Social Studies</li>
                  <li>• Religious & Moral Education</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-primary mb-2">Elective Subjects</h5>
                <ul className="space-y-1 text-secondary text-sm">
                  <li>• French</li>
                  <li>• Information Technology</li>
                  <li>• Visual Arts</li>
                  <li>• Technical Skills</li>
                  <li>• Ghanaian Language</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Special Programs */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Special Programs</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-3">STEM Education</h4>
              <p className="text-secondary text-sm mb-4">
                Our Science, Technology, Engineering, and Mathematics program encourages hands-on learning and problem-solving skills.
              </p>
              <ul className="space-y-1 text-secondary text-sm">
                <li>• Robotics Club</li>
                <li>• Science Fair</li>
                <li>• Coding Classes</li>
                <li>• Mathematics Olympiad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Arts & Culture</h4>
              <p className="text-secondary text-sm mb-4">
                We celebrate creativity and cultural heritage through various artistic expressions and cultural activities.
              </p>
              <ul className="space-y-1 text-secondary text-sm">
                <li>• Drama Club</li>
                <li>• Traditional Dance</li>
                <li>• Art Exhibitions</li>
                <li>• Cultural Festival</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Assessment & Evaluation</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Continuous Assessment</h4>
              <p className="text-secondary text-sm">Regular evaluation through class work, homework, and projects</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Termly Examinations</h4>
              <p className="text-secondary text-sm">Comprehensive tests at the end of each academic term</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Progress Reports</h4>
              <p className="text-secondary text-sm">Detailed feedback to parents on student development</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
