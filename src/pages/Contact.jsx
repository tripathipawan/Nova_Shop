import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success("Message sent successfully! We'll get back to you soon. 🚀");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "Khatima, Uttarakhand, India",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "NovaShop@support.com",
      href: "mailto:NovaShop@support.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 6396 096 431",
      href: "tel:+916396096431",
    },
  ];

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-white/5 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#155dfc]/30 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 dark:border-white/10 focus:border-[#155dfc]"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8edf8] dark:from-[#0a0f1a] dark:to-[#111827] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
            Get in{" "}
            <span className="text-[#155dfc]">Touch</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#155dfc] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">NovaShop</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                We're here to help you with any questions about our products and services.
              </p>
            </div>

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-[#111827] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#155dfc]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#155dfc] text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-gray-800 dark:text-white hover:text-[#155dfc] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Response time badge */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800/50 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Typically replies within
                </p>
                <p className="text-xs text-green-600 dark:text-green-500">
                  2–4 business hours
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Pawan Tripathi"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass("subject")}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass("message")} resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-[#155dfc] hover:bg-[#1249d4] transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#155dfc]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message 🚀"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
