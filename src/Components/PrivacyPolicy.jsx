// File: PrivacyPolicy.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
  >
    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </motion.div>
);

const PrivacyPolicy = () => {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <section className=" py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#5C0000] mb-4">
            Privacy Policy
          </h1>
         
          <p className="text-gray-600 mt-4">
            This Privacy Policy explains how <span className="font-semibold">Donor Sync</span> (“we”, “our”, “us”) collects, uses, discloses, and protects your
            information when you use our platform to connect donors and recipients.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8">
          <Section title="1) Information We Collect">
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Account & Profile:</span> name, email, phone, address (city/area), date of birth, gender, profile photo.</li>
              <li><span className="font-medium">Donation Details (Sensitive):</span> blood group, last donation date, eligibility responses (e.g., health screening questions you choose to provide).</li>
              <li><span className="font-medium">Usage Data:</span> device info, log data, pages viewed, referring/exit pages, timestamps.</li>
              <li><span className="font-medium">Location (optional):</span> approximate location to match nearby requests (with your device permission).</li>
              <li><span className="font-medium">Communications:</span> messages you send via the platform, support inquiries, feedback, and call/SMS metadata if routed through our service.</li>
            </ul>
            <p className="text-sm text-gray-500">
              Sensitive health-related information is processed with heightened care and only for life-saving matching and safety.
            </p>
          </Section>

          <Section title="2) How We Use Your Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your account and donor profile.</li>
              <li>Match donors and recipients by blood group, location, and availability.</li>
              <li>Notify you about compatible requests, confirmations, reminders, and updates.</li>
              <li>Improve safety, verify accounts, prevent fraud and misuse.</li>
              <li>Operate, maintain, and enhance our services and user experience.</li>
              <li>Respond to support requests and communicate important changes.</li>
              <li>Comply with applicable laws and respond to lawful requests.</li>
            </ul>
          </Section>

          <Section title="3) Legal Bases for Processing">
            <p>
              We process personal data based on one or more of the following: your <span className="font-medium">consent</span>, our <span className="font-medium">legitimate interests</span> in providing a safe and effective donor platform, and, where applicable, <span className="font-medium">legal obligations</span>. You may withdraw consent at any time where consent is the basis.
            </p>
          </Section>

          <Section title="4) Sharing & Disclosure">
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Recipients/Hospitals:</span> we share only the minimum necessary details (e.g., first name, blood group, contact method) to coordinate a donation when you accept or opt in.</li>
              <li><span className="font-medium">Service Providers:</span> vetted vendors that help us host, analyze, send notifications, and verify users—bound by confidentiality.</li>
              <li><span className="font-medium">Legal & Safety:</span> to comply with law, enforce terms, or protect rights, safety, and security.</li>
              <li><span className="font-medium">With Your Direction:</span> we share data when you ask us to (e.g., forwarding details to a specific recipient or blood bank).</li>
            </ul>
            <p className="text-sm text-gray-500">We do not sell personal data.</p>
          </Section>

          <Section title="5) Cookies & Tracking">
            <p>
              We use cookies and similar technologies to keep you signed in, remember preferences, measure performance, and improve features. You can control cookies in your browser settings; some features may not work without them.
            </p>
          </Section>

          <Section title="6) Data Retention">
            <p>
              We keep information for as long as your account is active or as needed to provide the service, resolve disputes, and comply with legal requirements. You may request deletion; we will also retain limited data as necessary for fraud prevention, safety, and legal compliance.
            </p>
          </Section>

          <Section title="7) Security">
            <p>
              We implement technical and organizational safeguards (encryption in transit, access controls, monitoring). No method of transmission or storage is 100% secure; we continually improve our protections.
            </p>
          </Section>

          <Section title="8) Your Rights & Choices">
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or update your profile information.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Request deletion of your account and associated personal data.</li>
              <li>Opt out of non-essential notifications and promotional messages.</li>
              <li>Object to or restrict certain processing, subject to applicable laws.</li>
            </ul>
            <p className="text-sm text-gray-500">
              Rights may vary by jurisdiction. We respond to requests within a reasonable time.
            </p>
          </Section>

          <Section title="9) Children’s Privacy">
            <p>
              Our services are not directed to children under the age where consent is legally valid without guardian approval. If we learn that we collected data from a child without appropriate consent, we will delete it.
            </p>
          </Section>

          <Section title="10) International Transfers">
            <p>
              Your information may be processed in locations outside your country. We take steps to ensure appropriate protections consistent with this Policy and applicable law.
            </p>
          </Section>

          <Section title="11) Third-Party Links & Integrations">
            <p>
              Our platform may link to third-party sites or integrate services (e.g., maps, messaging). Their privacy practices are governed by their own policies. Review them before providing personal data.
            </p>
          </Section>

          <Section title="12) Changes to This Policy">
            <p>
              We may update this Policy to reflect changes in our practices or for legal, technical, or operational reasons. We will post the updated version with a new “Last Updated” date and, where appropriate, notify you.
            </p>
          </Section>

          <Section title="13) Contact Us">
            <p>
              For questions, requests, or complaints about privacy, contact us:
            </p>
            <ul className="pl-6 list-disc">
              <li>Email: <a className="text-[#5C0000] underline" href="mailto:privacydonorsync@gmail.com">privacydonorsync@gmail.com</a></li>
              
            </ul>
          </Section>

          <p className="text-xs text-gray-500">
            This Privacy Policy is a general template and not legal advice. Consider consulting counsel to tailor it to your local laws and operations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
