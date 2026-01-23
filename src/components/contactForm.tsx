import { useForm, ValidationError } from "@formspree/react";
import { contactFormData } from "../data/contactFormData";
interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [state, handleSubmit] = useForm("mnjjqlaw");

  if (!isOpen) return null;

  if (state.succeeded) {
    return (
      <>
        {/* Modal backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>

        {/* Success Message */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-lg shadow-2xl max-w-md w-full border border-green-500 border-opacity-50">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {contactFormData.successTitle}
              </h2>
              <p className="text-gray-300 mb-6">
                {contactFormData.successMessage}
              </p>
              <button
                onClick={() => {
                  onClose();
                }}
                className="px-6 py-2 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
              >
                {contactFormData.closeButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-lg shadow-2xl max-w-md w-full border border-cyan-400 border-opacity-30">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-cyan-400 border-opacity-30">
            <h2 className="text-2xl font-bold text-white">
              {contactFormData.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {contactFormData.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder={`${contactFormData.namePlaceholder}`}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {contactFormData.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder={`${contactFormData.emailPlaceholder}`}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {contactFormData.subjectLabel}
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder={`${contactFormData.subjectPlaceholder}`}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {contactFormData.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                placeholder={`${contactFormData.messagePlaceholder}`}
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full px-6 py-3 bg-cyan-400 text-slate-950 font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 cursor-pointer"
            >
              {state.submitting
                ? contactFormData.submitButtonSendingLabel
                : contactFormData.submitButtonLabel}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
