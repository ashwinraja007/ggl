import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  User,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface EnquiryForm {
  fullName: string;
  phone: string;
  email: string;
  purpose: string;
  comment: string;
  optin: boolean;
}

export const QuickEnquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryForm>();

  const onSubmit = async (data: EnquiryForm) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("subject", data.purpose);
      formData.append("message", data.comment);

      formData.append("_subject", "New Quick Enquiry Submission");
      formData.append("_template", "box");
      formData.append("_captcha", "false");
      formData.append("_next", "https://www.gglindia.com/contact?success=true");

      const response = await fetch("https://formsubmit.co/ajax/info.bd@ggl.sg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Form submission failed");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Quick Enquiry</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-gray-600">
            Have a question? Fill out the form below and we'll get back to you shortly.
          </p>
        </motion.div>

        {submitStatus === "success" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your enquiry has been submitted successfully. We'll contact you soon.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-8 rounded-xl shadow-lg bg-gradient-to-br from-white to-slate-100 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 flex gap-2">
                  <User className="h-4 w-4 text-brand-gold" />
                  Full Name*
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 flex gap-2">
                  <Phone className="h-4 w-4 text-brand-gold" />
                  Phone Number*
                </Label>
                <Input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-() ]+$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex gap-2">
                  <Mail className="h-4 w-4 text-brand-gold" />
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-gray-700 flex gap-2">
                  <FileText className="h-4 w-4 text-brand-gold" />
                  Purpose*
                </Label>
                <Input
                  id="purpose"
                  {...register("purpose", {
                    required: "Purpose is required",
                    minLength: { value: 3, message: "Purpose must be at least 3 characters" },
                  })}
                />
                {errors.purpose && (
                  <p className="text-red-500 text-sm">{errors.purpose.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-gray-700 flex gap-2">
                <MessageSquare className="h-4 w-4 text-brand-gold" />
                Comment*
              </Label>
              <Textarea
                id="comment"
                {...register("comment", {
                  required: "Comment is required",
                  minLength: { value: 10, message: "Comment must be at least 10 characters" },
                })}
                className="min-h-[120px]"
              />
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-2 text-sm text-gray-800 font-medium">
                <input
                  type="checkbox"
                  {...register("optin", { required: "You must agree to proceed" })}
                  className="mt-1"
                />
                <span>
                  I confirm that my new import adheres to these conditions:
                  <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
                    <li>
                      My contacts explicitly gave me permission to send Email, SMS, or WhatsApp campaigns.
                    </li>
                    <li>These contacts were not borrowed from a third party.</li>
                    <li>These contacts were not purchased or rented.</li>
                  </ul>
                </span>
              </label>
              {errors.optin && (
                <p className="text-red-500 text-sm">{errors.optin.message}</p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-gradient-to-r from-[#D4AF37] to-[#f6b100]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickEnquiry;
