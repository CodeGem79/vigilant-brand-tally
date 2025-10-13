import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PetitionCard } from "@/components/PetitionCard";
import { mockPetitions } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Active Investigations</h2>
          <p className="text-muted-foreground">
            Brands currently under observation for consumer protection violations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPetitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
