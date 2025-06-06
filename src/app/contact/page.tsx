import { MainLayout } from '@/components/layout/MainLayout';

export default function Contact() {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Get in touch with us. We&apos;re here to help and answer any questions you may have.
          </p>
        </section>

        {/* Contact Information */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Visit Us</h3>
            <p className="text-secondary">
              Amarck Royal International School<br />
              123 Education Avenue<br />
              Accra, Ghana
            </p>
          </div>
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Call Us</h3>
            <p className="text-secondary">
              Main Office: +233 20 123 4567<br />
              Admissions: +233 20 123 4568<br />
              Emergency: +233 20 123 4569
            </p>
          </div>
          <div className="dashboard-card text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">Email Us</h3>
            <p className="text-secondary">
              General: info@amarckroyal.edu.gh<br />
              Admissions: admissions@amarckroyal.edu.gh<br />
              Principal: principal@amarckroyal.edu.gh
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="dashboard-card max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-primary text-center">Send us a Message</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="general">General Information</option>
                  <option value="academics">Academic Programs</option>
                  <option value="facilities">Facilities Tour</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Please share your message or questions..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="button-3d bg-primary text-white px-8 py-3 rounded-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        {/* Office Hours */}
        <section className="dashboard-card">
          <h3 className="text-2xl font-semibold mb-6 text-primary text-center">Office Hours</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">School Office</h4>
              <p className="text-secondary">
                Monday - Friday: 7:00 AM - 5:00 PM<br />
                Saturday: 8:00 AM - 2:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Admissions Office</h4>
              <p className="text-secondary">
                Monday - Friday: 8:00 AM - 4:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday: By appointment only
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
