import IndexClient from "@/components/index/IndexClient";
//double check max width
export default function SpeciesIndexPage() {
  return (
    <main className="bg-white px-4 py-4 text-black">
      <div className="mx-auto w-full max-w-7xl">
        <IndexClient />
      </div>
    </main>
  );
}
