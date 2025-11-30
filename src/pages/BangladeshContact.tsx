import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const bangladeshNavPaths = {
  home: "/bangladesh",
  about: "/bangladesh/about",
  services: "/bangladesh/services",
  careers: "/bangladesh/careers",
  contact: "/bangladesh/contact",
};

const BangladeshContact = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/info.bd@ggl.sg", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header navPaths={bangladeshNavPaths} />

      <main className="flex-grow">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[40vh] flex items-center justify-center bg-blue-600 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/90" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center px-4 relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Get in Touch</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
              We're here to help and answer any questions you might have.
            </p>
          </motion.div>
        </motion.section>

        {/* Bangladesh Address & Map */}
        <section className="py-12 bg-white relative">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm uppercase tracking-wide text-brand-gold font-semibold">
                Bangladesh Office
              </p>
              <h2 className="text-3xl font-bold text-brand-navy">Dhaka Headquarters</h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  ID #9-N (New), 9-M(Old-N), 9th floor, Tower 1,
                  Police Plaza Concord No.2, Road # 144,
                  Gulshan Model Town, Dhaka 1215, Bangladesh
                </p>
                <p className="font-semibold">Phone: +880 1716 620989</p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full h-full"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1n4WqX2KvVrDhYom0GMJ0FxbmZsRY8aQ&ehbc=2E312F&noprof=1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-16 bg-gray-50 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-xl shadow-lg max-w-2xl mx-auto bg-slate-100"
            >
              <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill in the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="firstName" placeholder="First Name" required />
                  <Input name="lastName" placeholder="Last Name" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="email" name="email" placeholder="Email" required />
                  <Input name="phone" placeholder="Phone" />
                </div>

                <Input name="organization" placeholder="Organization/Company" />

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="min-h-[120px]"
                />

                {/* FormSubmit Hidden Fields */}
                <input type="hidden" name="_subject" value="New Bangladesh Office Inquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://ggl.sg/bangladesh/thank-you" />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full text-white py-6 flex items-center justify-center gap-2 bg-brand-navy"
                  >
                    Send Message
                    <Send size={18} />
                  </Button>
                </motion.div>
              </form>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle className="text-green-600" />
                    Your message has been sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BangladeshContact;
