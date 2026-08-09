import { useForm, ValidationError } from "@formspree/react";
import { contactFormData } from "../data/contactFormData";
import { X, Check } from "lucide-react";

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
        <div
          className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#00ff41]/30 max-w-md w-full">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-[#00ff41]" />
              </div>
              <h2 className="text-2xl font-bold text-white font-mono mb-2">
                {contactFormData.successTitle}
              </h2>
              <p className="text-gray-400 font-sans mb-6">
                {contactFormData.successMessage}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:bg-[#00ff41]/20 transition-colors cursor-pointer"
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
      <div
        className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#00ff41]/20 max-w-md w-full rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#1a1a1a]">
            <h2 className="text-lg font-bold text-white font-mono tracking-wide">
              {contactFormData.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#00ff41] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider"
              >
                {contactFormData.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 bg-black border border-[#1a1a1a] text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-colors rounded-lg"
                placeholder={contactFormData.namePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider"
              >
                {contactFormData.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-black border border-[#1a1a1a] text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-colors rounded-lg"
                placeholder={contactFormData.emailPlaceholder}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider"
              >
                {contactFormData.subjectLabel}
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                className="w-full px-4 py-2 bg-black border border-[#1a1a1a] text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-colors rounded-lg"
                placeholder={contactFormData.subjectPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider"
              >
                {contactFormData.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 bg-black border border-[#1a1a1a] text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20 transition-colors resize-none rounded-lg"
                placeholder={contactFormData.messagePlaceholder}
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full px-6 py-3 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm uppercase tracking-widest hover:bg-[#00ff41]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-lg"
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
