export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-[#032014]">
          Contact
        </h1>
        <p className="font-body text-gray-600 mt-2">
          Have a question about Oregon&apos;s rare species, this field guide, or
          ORBIC&apos;s work? Here&apos;s how to reach the Institute for Natural
          Resources.
        </p>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Office
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              Phone: 503-725-9950
              <br />
              Hours: Monday–Friday, 8:30am–4:30pm
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Address
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              Street Address:
              <br />
              VSC Suite 316
              <br />
              1025 SW Mill St.
              <br />
              Portland, OR 97201
            </p>
            <p>
              Mailing Address:
              <br />
              Portland State University
              <br />
              Institute for Natural Resources / INR
              <br />
              PO Box 751
              <br />
              Portland, OR 97207-0751
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Staff Directory
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              For specific staff contacts, visit the{" "}
              <a
                href="https://inr.oregonstate.edu/directory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                INR Staff Directory
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Follow Us
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              <a
                href="https://www.facebook.com/oregon.inr.iww"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Facebook
              </a>
              <br />
              <a
                href="https://www.instagram.com/oregon.inr.iww"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                Instagram
              </a>
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#032014]">
            Submit an Inquiry
          </h2>
          <div className="font-body text-gray-600 mt-4 space-y-4 text-base leading-relaxed">
            <p>
              Use the{" "}
              <a
                href="https://www.pdx.edu/institute-natural-resources/contact/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16873d] hover:underline"
              >
                official PSU contact form
              </a>{" "}
              to send a message directly to INR.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
