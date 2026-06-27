import { ContactDetails } from "../../Data";
import { Link } from "react-router-dom";
import { Queries } from "../../Api";

const BranchSection = () => {
  const { data: contactUsData } = Queries.useGetContactUs();
  const contactUs = contactUsData?.data;

  const address = contactUs?.address || ContactDetails?.Address;
  const emails = contactUs?.email 
    ? contactUs.email.split(',').map((e: string) => e.trim()) 
    : [ContactDetails?.EmailSales, ContactDetails?.EmailInfo].filter(Boolean);
  const phoneNumbers = contactUs?.phoneNumbers?.length 
    ? contactUs.phoneNumbers.map((p) => p.number) 
    : [ContactDetails?.Number].filter(Boolean);
  const workingHours = contactUs?.workingHours || "Mon - Sat: 09:00 AM - 07:00 PM";

  const fb = contactUs?.socialMediaLinks?.facebook || "";
  const insta = contactUs?.socialMediaLinks?.instagram || "";
  const tw = contactUs?.socialMediaLinks?.twitter || "";
  const li = contactUs?.socialMediaLinks?.linkedin || "";

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: "#F8F7F4" }}>
      <div className="edublink-container max-w-7xl mx-auto px-6">
        {/* Centered Heading */}
        <div className="edublink-section-heading text-center mb-16 pt-[20px]!" data-aos="fade-up" data-aos-duration={1000}>
          <span className="pre-heading">Get In Touch</span>
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
          <div className="w-full space-y-6 flex flex-col justify-start mt-[30px]!" data-aos="fade-right" data-aos-duration={1200}>
            
            {/* Headquarters */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[20px]!" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Headquarters
              </h5>
              <p className="text-base text-[15px]! mb-[15px]!" style={{ color: "#7A7A7A", lineHeight: "1.6", margin: 0 }}>
                {address}
              </p>
            </div>

            {/* Email Support */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[20px]!" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Email Support
              </h5>
              <div className="space-y-0.5 flex flex-col" style={{ margin: 0 }}>
                {emails.map((email, index) => (
                  <Link key={index} to={`mailto:${email}`} className="block text-base hover:opacity-85 transition-opacity text-[15px]! mb-[15px]!" style={{ color: "#7A7A7A" }}>
                    {email}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Hotline */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[20px]!" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Contact Hotline
              </h5>
              {phoneNumbers.map((num, index) => (
                <Link key={index} to={`tel:${num}`} className="block text-base hover:opacity-85 transition-opacity text-[15px]! mb-[15px]!" style={{ color: "#7A7A7A", margin: 0 }}>
                  {num}
                </Link>
              ))}
            </div>

            {/* Timings */}
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[20px]!" style={{ color: "#4B3F38", fontFamily: "var(--edublink-font-secondary)", margin: 0 }}>
                Center Timings
              </h5>
              <p className="text-base text-[15px]! mb-[15px]!" style={{ color: "#7A7A7A", margin: 0 }}>
                {workingHours}
              </p>
            </div>

            {/* Actions & Social Links */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              {/* Social links with premium hover color transition */}
              <div className="flex gap-4 mt-[20px]!">
                {insta && (
                  <Link
                    to={insta}
                    target="_blank"
                    className="flex items-center justify-center rounded-full border border-gray-200 text-[#4B3F38] hover:text-white! transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="edublink icon-instagram" style={{ fontSize: "20px" }} />
                  </Link>
                )}
                {fb && (
                  <Link
                    to={fb}
                    target="_blank"
                    className="flex items-center justify-center rounded-full border border-gray-200 text-[#4B3F38] hover:text-white! transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="edublink icon-facebook" style={{ fontSize: "20px" }} />
                  </Link>
                )}
                {tw && (
                  <Link
                    to={tw}
                    target="_blank"
                    className="flex items-center justify-center rounded-full border border-gray-200 text-[#4B3F38] hover:text-white! transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="edublink icon-twitter" style={{ fontSize: "20px" }} />
                  </Link>
                )}
                {li && (
                  <Link
                    to={li}
                    target="_blank"
                    className="flex items-center justify-center rounded-full border border-gray-200 text-[#4B3F38] hover:text-white! transition-all bg-white hover:bg-[#5C3D24] shadow-sm"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="edublink icon-linkedin2" style={{ fontSize: "20px" }} />
                  </Link>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Minimal Square Google Map */}
          <div className="w-full flex items-center justify-center lg:justify-end" data-aos="fade-left" data-aos-duration={1200}>
            <div className="w-full aspect-square max-w-[460px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                title="Shining Sparrow Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
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
