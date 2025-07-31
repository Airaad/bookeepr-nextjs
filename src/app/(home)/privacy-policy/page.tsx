import { Shield, Lock, Eye, Database, Mail, Phone, MapPin } from "lucide-react";

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
    <div className="flex items-center mb-4">
      <div className="bg-green-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-green-700" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 ml-4">{title}</h2>
    </div>
    <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#faf7f0" }}>
      {/* Header */}
      <div className="bg-green-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full">
              <Shield className="w-12 h-12 text-green-700" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
          <p className="text-green-200 mt-4">
            Last updated: July 31,2025
            {/* {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} */}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <SectionCard icon={Eye} title="Introduction">
          <p>
            Welcome to BooKeeper. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website and use our services. Please read this privacy policy
            carefully. If you do not agree with the terms of this privacy
            policy, please do not access the site.
          </p>
          <p>
            We reserve the right to make changes to this Privacy Policy at any
            time and for any reason. We will alert you about any changes by
            updating the "Last updated" date of this Privacy Policy.
          </p>
        </SectionCard>

        {/* Information We Collect */}
        <SectionCard icon={Database} title="Information We Collect">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>
            <p className="mb-4">
              We collect information you provide directly to us through Google
              Authentication, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name (from your Google account)</li>
              <li>Email address (from your Google account)</li>
              <li>Profile picture (from your Google account)</li>
              <li>Google account ID for authentication purposes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Book and Reading Data
            </h3>
            <p className="mb-4">
              When you use our service, we collect and store:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Book titles, authors, and publication information you add</li>
              <li>Your personal ratings and reviews</li>
              <li>Reading notes and comments you create</li>
              <li>Dates when books are added to your library</li>
              <li>Book cover images and metadata</li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP address and browser information</li>
              <li>Device information and operating system</li>
              <li>Usage patterns and interaction data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div> */}
        </SectionCard>

        {/* How We Use Information */}
        <SectionCard icon={Lock} title="How We Use Your Information">
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide, operate, and maintain our reading library service</li>
            <li>Authenticate your identity through Google OAuth</li>
            <li>Store and organize your personal book collection</li>
            <li>Enable you to create, edit, and manage your reading notes</li>
            <li>Improve our website functionality and user experience</li>
            <li>Communicate with you about service updates or issues</li>
            {/* <li>
              Respond to your comments, questions, and customer service requests
            </li>
            <li>Monitor and analyze usage patterns to improve our services</li> */}
          </ul>
        </SectionCard>

        {/* Data Storage and Security */}
        <SectionCard icon={Shield} title="Data Storage and Security">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Database Storage
            </h3>
            <p className="mb-4">
              Your data is securely stored in a PostgreSQL database hosted by
              NeonDB, a trusted third-party database service provider. We have
              implemented appropriate technical and organizational measures to
              protect your personal information. No passwords are stored on our
              servers (handled by Google)
            </p>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Security Measures
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                All data transmissions are encrypted using SSL/TLS protocols
              </li>
              <li>Database connections are secured and encrypted</li>
              <li>Access to your data is restricted to your account only</li>
              <li>
                We use industry-standard authentication through Google OAuth
              </li>
              <li>Regular security updates and monitoring</li>
              <li>
                No passwords are stored on our servers (handled by Google)
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Data Access
            </h3>
            <p>
              Your personal reading data is accessible only to you when you're
              logged into your account. We do not share, sell, or provide access
              to your personal book collection, ratings, or notes to any third
              parties without your explicit consent.
            </p>
          </div>
        </SectionCard>

        {/* Third-Party Services */}
        <SectionCard icon={Database} title="Third-Party Services">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Google Authentication
            </h3>
            <p className="mb-4">
              We use Google OAuth for secure authentication. When you sign in
              with Google, we receive limited information from your Google
              account as permitted by Google's privacy policies. Please review
              Google's Privacy Policy for information about how Google collects
              and uses your data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              NeonDB Database Service
            </h3>
            <p className="mb-4">
              Our database is hosted by NeonDB, which provides secure PostgreSQL
              database hosting. NeonDB has their own privacy and security
              measures in place to protect stored data. We have selected NeonDB
              based on their commitment to data security and privacy.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Book Cover Images
            </h3>
            <p>
              Book cover images may be sourced from public APIs such as Open
              Library. These services have their own privacy policies and terms
              of service.
            </p>
          </div>
        </SectionCard>

        {/* Your Rights */}
        {/* <SectionCard icon={Eye} title="Your Privacy Rights">
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Access:</strong> Request a copy of the personal data we
              hold about you
            </li>
            <li>
              <strong>Rectification:</strong> Request correction of inaccurate
              or incomplete data
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your data in a
              machine-readable format
            </li>
            <li>
              <strong>Withdrawal:</strong> Withdraw consent for data processing
              at any time
            </li>
            <li>
              <strong>Objection:</strong> Object to certain types of data
              processing
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us using the
            information provided below.
          </p>
        </SectionCard> */}

        {/* Data Retention */}
        {/* <SectionCard icon={Database} title="Data Retention">
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide you services. If you wish to cancel
            your account or request that we no longer use your information,
            please contact us. We will retain and use your information as
            necessary to comply with our legal obligations, resolve disputes,
            and enforce our agreements.
          </p>
          <p>
            When you delete your account, we will permanently delete your
            personal reading data, including your book collection, ratings, and
            notes, within 30 days of account deletion.
          </p>
        </SectionCard> */}

        {/* Cookies */}
        {/* <SectionCard icon={Eye} title="Cookies and Tracking">
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your
            experience on our website:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Essential Cookies:</strong> Required for authentication
              and basic site functionality
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how you use
              our site
            </li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings, but disabling
            certain cookies may affect the functionality of our service.
          </p>
        </SectionCard> */}

        {/* Children's Privacy */}
        <SectionCard icon={Shield} title="Children's Privacy">
          <p>
            Our service is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us immediately, and we
            will take steps to remove such information from our systems.
          </p>
        </SectionCard>

        {/* Contact Information */}
        <div className="bg-green-700 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-green-100 text-lg">
              If you have any questions about this Privacy Policy or our data
              practices, please don't hesitate to contact us.
            </p>
          </div>

          <div className="flex justify-center text-center">
            <div className="bg-green-600 rounded-lg p-6">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-green-100">[sheikhairaad@gmail.com]</p>
              <p className="text-sm text-green-200 mt-2">
                We'll respond within 24 hours
              </p>
            </div>

            {/* <div className="bg-green-600 rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-green-100">[Your Phone Number]</p>
              <p className="text-sm text-green-200 mt-2">
                Business hours: 9 AM - 5 PM
              </p>
            </div>

            <div className="bg-green-600 rounded-lg p-6">
              <MapPin className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-green-100">
                [Your Name]
                <br />
                [Your Address]
              </p>
              <p className="text-sm text-green-200 mt-2">
                For formal inquiries
              </p>
            </div> */}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-green-600">
            <p className="text-green-100">
              For privacy-related concerns, please include "Privacy Policy" in
              your subject line.
            </p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Policy Updates
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. You are advised to review this
            Privacy Policy periodically for any changes. Changes to this Privacy
            Policy are effective when they are posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
