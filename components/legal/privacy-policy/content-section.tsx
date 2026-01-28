"use client";

export function PrivacyPolicyContentSection() {
  return (
    <div className="flex flex-col items-start px-4 md:px-6 lg:px-14 pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20 xl:pb-[104px] xl:pt-[80px]">
      <div className="relative w-full max-w-360 mx-auto">
        {/* Introduction */}
        <div className="mb-12 space-y-4 text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
          <p>
            This Privacy Policy explains how we collect, use, and safeguard
            information when you access or
          </p>
          <p>
            use the CreatorCharts platform. By using CreatorCharts, you agree to
            the practices described in
          </p>
          <p>this policy.</p>
        </div>

        {/* Section 1: Information We Collect */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            1. Information We Collect
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts collects limited information necessary to operate as a
            creator performance index.
          </p>

          {/* Subsection a */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-[28.8px] text-black lg:text-xl xl:text-2xl lg:leading-[32px] xl:leading-[36px]">
              a. Public Creator Data
            </h3>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              We collect and process publicly available information from
              supported social platforms, including
            </p>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              but not limited to:
            </p>
            <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
              <li>Creator usernames</li>
              <li>Public profile information</li>
              <li>Public engagement and performance signals</li>
              <li>Public follower or content metrics</li>
            </ul>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              We do not collect private account data, passwords, or non-public
              analytics.
            </p>
          </div>

          {/* Subsection b */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-[28.8px] text-black lg:text-xl xl:text-2xl lg:leading-[32px] xl:leading-[36px]">
              b. Account Information
            </h3>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              When users create an account on CreatorCharts, we may collect:
            </p>
            <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
              <li>Name</li>
              <li>Email address</li>
              <li>Country</li>
              <li>
                Account credentials, which are securely hashed and encrypted
              </li>
            </ul>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              CreatorCharts does{" "}
              <span className="font-bold">
                not store or have access to users&apos; passwords in plain text
              </span>
              .
            </p>
          </div>

          {/* Subsection c */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-[28.8px] text-black lg:text-xl xl:text-2xl lg:leading-[32px] xl:leading-[36px]">
              c. Usage &amp; Technical Information
            </h3>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              We may automatically collect limited technical data, such as:
            </p>
            <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
              <li>Device type and browser</li>
              <li>IP address (anonymized where possible)</li>
              <li>Pages visited and interactions</li>
              <li>Date and time of access</li>
            </ul>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              This information helps us improve performance, security, and user
              experience.
            </p>
          </div>

          {/* Subsection d */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-[28.8px] text-black lg:text-xl xl:text-2xl lg:leading-[32px] xl:leading-[36px]">
              d. Payment Information
            </h3>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              When users purchase paid features such as verification badges,
              CreatorCharts may collect
            </p>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              limited payment-related information.
            </p>
            <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
              <li>
                Payments are processed through trusted third-party payment
                providers
              </li>
              <li>
                CreatorCharts does not store full credit or debit card details
              </li>
              <li>
                We may retain transaction records for billing, compliance, and
                support purposes
              </li>
            </ul>
            <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
              Payment information is used solely to process purchases and
              maintain account services.
            </p>
          </div>
        </div>

        {/* Section 2: How We Use Information */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            2. How We Use Information
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We use collected information to:
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Operate and maintain CreatorCharts</li>
            <li>Generate creator rankings and insights</li>
            <li>Improve platform functionality and user experience</li>
            <li>Respond to inquiries and feedback</li>
            <li>Monitor platform integrity and prevent misuse</li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts does not sell personal data.
          </p>
        </div>

        {/* Section 3: How Rankings Work */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            3. How Rankings Work
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts rankings are generated using automated systems based
            on publicly available
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            performance signals.
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Creators cannot pay to influence rankings</li>
            <li>Data cannot be manually altered</li>
            <li>Rankings are independent and algorithmic</li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Inclusion on CreatorCharts does not imply endorsement.
          </p>
        </div>

        {/* Section 4: Cookies & Tracking */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            4. Cookies &amp; Tracking
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts may use cookies or similar technologies to:
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Keep the site functioning properly</li>
            <li>Understand usage patterns</li>
            <li>Improve performance and analytics</li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            You can control or disable cookies through your browser settings.
          </p>
        </div>

        {/* Section 5: Data Sharing */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            5. Data Sharing
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We do not sell or rent personal information.
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We may share limited data only when:
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Required by law or legal process</li>
            <li>Necessary to protect platform security or rights</li>
            <li>
              Using trusted service providers (analytics, hosting), under strict
              confidentiality obligations
            </li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            All partners are required to meet appropriate data protection
            standards.
          </p>
        </div>

        {/* Section 6: Data Retention */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            6. Data Retention
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We retain information only as long as necessary to:
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Fulfill the purposes outlined in this policy</li>
            <li>Comply with legal obligations</li>
            <li>Maintain platform integrity and historical chart data</li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Public creator performance data may be retained for historical
            indexing purposes.
          </p>
        </div>

        {/* Section 7: Your Rights */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            7. Your Rights
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Depending on your location, you may have the right to:
          </p>
          <ul className="ml-5 space-y-2 text-base lg:text-lg xl:text-xl leading-[25.6px] lg:leading-[30px] xl:leading-[34px] text-[#333]">
            <li>Request access to personal information we hold</li>
            <li>Request correction or deletion of personal data</li>
            <li>Object to certain processing activities</li>
            <li>Request data portability (where applicable)</li>
          </ul>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Requests can be made by contacting us directly.
          </p>
        </div>

        {/* Section 8: Creator Data Requests */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            8. Creator Data Requests
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            If you are a creator listed on CreatorCharts and believe information
            is inaccurate or outdated, you
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            may contact us to request a review.
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts reserves the right to maintain historical data where
            relevant to chart integrity.
          </p>
        </div>

        {/* Section 9: Security */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            9. Security
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We take reasonable measures to protect information from unauthorized
            access, loss, or misuse.
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            However, no system is completely secure, and we cannot guarantee
            absolute security.
          </p>
        </div>

        {/* Section 10: Children's Privacy */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            10. Children&apos;s Privacy
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            CreatorCharts is not intended for use by individuals under the age
            of 13. We do not knowingly
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            collect personal data from children.
          </p>
        </div>

        {/* Section 11: Changes to This Policy */}
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            11. Changes to This Policy
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            We may update this Privacy Policy from time to time.
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Changes will be reflected on this page with an updated revision
            date.
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Continued use of CreatorCharts after changes indicates acceptance of
            the updated policy.
          </p>
        </div>

        {/* Section 12: Contact Us */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold leading-[38.4px] tracking-[-0.5px] text-black lg:text-3xl xl:text-4xl lg:leading-[44px] xl:leading-[52px]">
            12. Contact Us
          </h2>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            If you have questions about this Privacy Policy or how we handle
            data, please contact us at:
          </p>
          <p className="text-base lg:text-lg xl:text-xl leading-[27.2px] lg:leading-[32px] xl:leading-[36px] text-[#333]">
            Email:{" "}
            <a
              href="mailto:support@creatorcharts.org"
              className="font-medium text-black underline decoration-solid"
            >
              support@creatorcharts.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
