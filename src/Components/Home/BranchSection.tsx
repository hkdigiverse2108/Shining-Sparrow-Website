import { ContactDetails } from "../../Data";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Store/Hook";

const BranchSection = () => {
  const AllSettings = useAppSelector((state) => state.settings.settings);
  const { facebook = "", instagram = "", linkedin = "", twitter = "" } = AllSettings?.socialMediaLinks || {};

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: "#F8F7F4" }}>
      <div className="edublink-container max-w-7xl mx-auto px-6">
        {/* Centered Heading */}
        <div className="edublink-section-heading text-center mb-16" data-aos="fade-up" data-aos-duration={1000}>
          <span className="pre-heading">OUR BRANCH</span>
          <h3 className="heading">
            Visit Our <mark className="bg-transparent" style={{ color: "var(--edublink-color-primary)" }}>Learning Center</mark>
          </h3>
          <div className="title-shape" style={{ color: "var(--edublink-color-primary)" }}>
            <i className="icon-19" />
          </div>
        </div>

        {/* Two Columns Grid */}
        <div className="grid! grid-cols-1 lg:grid-cols-2 gap-12! lg:gap-16! items-start">
          
          {/* LEFT COLUMN: Clean details matching reference image exactly */}
          <div className="w-full space-y-6 flex flex-col justify-start" data-aos="fade-right" data-aos-duration={1200}>
            
            {/* Headquarters */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold font-secondary" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Headquarters
              </h5>
              <p className="text-base" style={{ color: "#7A7A7A", lineHeight: "1.6", margin: 0 }}>
                {ContactDetails?.Address}
              </p>
            </div>

            {/* Email Support */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold font-secondary" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Email Support
              </h5>
              <div className="space-y-0.5 flex flex-col" style={{ margin: 0 }}>
                <Link to={`mailto:${ContactDetails?.EmailSales}`} className="block text-base hover:opacity-85 transition-opacity" style={{ color: "#7A7A7A" }}>
                  {ContactDetails?.EmailSales}
                </Link>
                <Link to={`mailto:${ContactDetails?.EmailInfo}`} className="block text-base hover:opacity-85 transition-opacity" style={{ color: "#7A7A7A" }}>
                  {ContactDetails?.EmailInfo}
                </Link>
              </div>
            </div>

            {/* Contact Hotline */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold font-secondary" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Contact Hotline
              </h5>
              <Link to={`tel:${ContactDetails?.Number}`} className="block text-base hover:opacity-85 transition-opacity" style={{ color: "#7A7A7A", margin: 0 }}>
                {ContactDetails?.Number}
              </Link>
            </div>

            {/* Timings */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold font-secondary" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Center Timings
              </h5>
              <p className="text-base" style={{ color: "#7A7A7A", margin: 0 }}>
                Mon - Sat: 09:00 AM - 07:00 PM
              </p>
            </div>

            {/* Actions & Social Links */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              {/* Navigation button */}
              <Link
                to="https://maps.app.goo.gl/94kF8Q7M9Ff7PspA7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold transition-all duration-300 tracking-wide text-sm hover:opacity-95 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--edublink-color-primary)" }}
              >
                <i className="fas fa-directions"></i> Get Directions
              </Link>

              {/* Social links with premium hover color transition */}
              <div className="flex gap-3">
                <Link
                  to={instagram}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-700 hover:text-white transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                >
                  <i className="edublink icon-instagram text-lg" />
                </Link>
                <Link
                  to={facebook}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-700 hover:text-white transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                >
                  <i className="edublink icon-facebook text-lg" />
                </Link>
                <Link
                  to={twitter}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-700 hover:text-white transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                >
                  <i className="edublink icon-twitter text-lg" />
                </Link>
                <Link
                  to={linkedin}
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-700 hover:text-white transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                >
                  <i className="edublink icon-linkedin2 text-lg" />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Minimal Square Google Map */}
          <div className="w-full flex items-center justify-center lg:justify-end" data-aos="fade-left" data-aos-duration={1200}>
            <div className="w-full aspect-square max-w-[460px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                title="Shining Sparrow HK DigiVerse Location Map"
                src="https://maps.google.com/maps?q=HK%20DigiVerse%20LLP%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BranchSection;
