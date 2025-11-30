import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AboutUs = () => {
  return <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 mb-4 text-base text-justify">GGL is a trusted global leader in LCL (Less-than-Container Load) consolidation. With a robust presence across North America, the UK, the Middle East, the Indian Subcontinent, Southeast Asia, and the Far East, we offer streamlined groupage services backed by strong customer support and competitive pricing.</p>
            <p className="text-gray-600 mb-6 text-base text-justify">We are Strategically positioned in major transshipment hubs like Singapore, Malaysia, Sri Lanka, and Dubai, GGL operates direct weekly sailings to key global ports. Our expansive network ensures fast, reliable, and cost-effective consolidation options for freight forwarders and logistics providers.</p>
            <Link to="/bangladesh/about">
              <Button variant="outline" size="sm" className="text-sm bg-brand-gold my-0 mx-0 rounded-md font-semibold">
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg shadow-lg">
              <img alt="About Us" loading="lazy" className="w-full h-full object-cover rounded-lg" src="/lovable-uploads/14c89acc-9c64-4484-b520-f5142136ccc6.png" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default AboutUs;
