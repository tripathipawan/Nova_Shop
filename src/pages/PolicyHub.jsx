import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Truck,
  RefreshCcw,
  HelpCircle,
  Mail,
  Phone,
} from "lucide-react";

const tabs = [
  {
    key: "terms",
    label: "Terms & Conditions",
    icon: FileText,
    content: `
Welcome to NovaShop. By accessing or using our website, you agree to comply
with and be bound by these Terms & Conditions. These terms govern your use of
our services, products, and content.

• All product prices, descriptions, and availability are subject to change
  without prior notice.
• Unauthorized use, duplication, or resale of our content is strictly prohibited.
• We reserve the right to suspend or terminate accounts found violating policies.

Using this website signifies your acceptance of these terms.
    `,
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    icon: ShieldCheck,
    content: `
Your privacy matters to us. We are committed to protecting your personal data
and ensuring transparency in how it is used.

• We collect basic information such as name, email, phone number, and address
  solely for order processing and customer support.
• Your data is never sold, rented, or shared with third parties without consent.
• Secure encryption and industry-standard protection methods are used.

You can request data removal or modification at any time.
    `,
  },
  {
    key: "shipping",
    label: "Shipping Policy",
    icon: Truck,
    content: `
We aim to deliver your orders quickly and safely.

• Orders are processed within 24–48 working hours.
• Standard delivery time ranges from 3–7 business days.
• Tracking details are shared via email and SMS once shipped.
• Delays may occur due to unforeseen circumstances or remote locations.

Free shipping is available on selected orders.
    `,
  },
  {
    key: "returns",
    label: "Return & Refund Policy",
    icon: RefreshCcw,
    content: `
Customer satisfaction is our priority.

• Returns are accepted within 7 days of product delivery.
• Items must be unused, undamaged, and in original packaging.
• Refunds are processed within 5–7 business days after inspection.
• Certain products may not be eligible for return due to hygiene or usage reasons.

Please contact support before initiating a return.
    `,
  },
  {
    key: "faq",
    label: "FAQs",
    icon: HelpCircle,
    content: `
Q: Do you offer Cash on Delivery?
A: Yes, COD is available on selected products.

Q: How can I track my order?
A: Tracking information is sent via email after shipping.

Q: How do I contact customer support?
A: Reach us through email or phone mentioned below.
    `,
  },
];

const PolicyHub = () => {
  const [active, setActive] = useState("terms");
  const activeTab = tabs.find((t) => t.key === active);

  return (
    <section className="bg-[#efeeea] dark:bg-[#080d10] py-20">
      <div className="max-w-5xl px-4 mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-center text-black lg:text-5xl md:text-4xl dark:text-white"
        >
          Legal & Policy {" "}
          <span className="text-[#155dfc]">
            Information
          </span>
        </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Transparency, trust & customer-first commitment
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-5 bg-white dark:bg-[#11161c] p-5 rounded-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;

            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full
                  text-sm font-semibold transition-all
                  ${
                    isActive
                      ? "bg-[#155dfc] text-white"
                      : "bg-[#dce4f167] dark:bg-[#000] text-[#155dfc] hover:bg-[#155dfc]/20"
                  }
                `}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white dark:bg-[#11161c] rounded-2xl p-8 md:p-10 shadow-md">
          <h2 className="mb-6 text-2xl font-extrabold text-center text-black dark:text-white">
            {activeTab.label}
          </h2>

          <div className="max-w-3xl mx-auto text-sm leading-relaxed text-left text-gray-700 whitespace-pre-line dark:text-gray-300">
            {activeTab.content}
          </div>

          {/* Contact */}
          <div className="pt-6 mt-12 text-center border-t border-black/10 dark:border-white/10">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Need more help? Contact our support team
            </p>

            <div className="flex flex-col justify-center gap-6 text-sm font-medium sm:flex-row">
              <span className="flex items-center justify-center gap-2 text-black dark:text-white">
                <Mail size={14} className="text-[#155dfc]" />
                support@neoelectronix.com
              </span>
              <span className="flex items-center justify-center gap-2 text-black dark:text-white">
                <Phone size={14} className="text-[#155dfc]" />
                +91 98765 43210
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyHub;