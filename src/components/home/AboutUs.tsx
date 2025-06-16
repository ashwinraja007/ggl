import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const AboutUs = () => {
  return <section className="mx-0 px-0 py-[75px] bg-inherit">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <AspectRatio ratio={16 / 9} className="bg-gray-200">
              <img alt="About Us" className="w-full h-full object-cover" loading="lazy" src="/lovable-uploads/6d67d7a8-444c-4b65-bb7f-392a419d541c.jpg" />
            </AspectRatio>
          </div>

          {/* Text Section */}
          <div className="px-[34px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">About Us</h2>
            <p className="text-gray-600 mb-5 text-sm md:text-base text-justify">
              GGL is a proud subsidiary of 1 Global Enterprises, a dynamic investment company with a diverse portfolio in freight forwarding, supply chain management, and logistics technology. As part of this global network, GGL benefits from strategic investments across multiple brands specializing in transportation, warehousing, and supply chain solutions.
            </p>
            <Link to="/about">
              <Button variant="outline" size="sm" className="text-sm mb-6">
                Learn More
              </Button>
            </Link>

            {/* FTA Logo Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <p className="text-gray-600 font-medium text-xl">Proud member of</p>
                <img src="/lovable-uploads/58aa8fa6-b206-4aaa-a5af-edbe74e67df1.png" alt="Freight & Trade Alliance" className="h-10 md:h-14 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutUs;
