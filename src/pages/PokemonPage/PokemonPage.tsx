import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails, firstTypeColor } from "../../api/pokeapi";
import { TypeBadge } from "../ui/TypeBadge";
import { PokemonTypeName } from "../../types/pokemon";
import { PokedexCard } from "../../components/feature/PokedexCard";

export function PokemonPage() {
  const { idOrName = "" } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonDetails(idOrName!),
  });

  if (isLoading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (isError || !data)
    return <div style={{ padding: 24 }}>Pokemon not found</div>;

  const bg = firstTypeColor(data?.types[0] as PokemonTypeName);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Pokemon Icon Component
  const PokemonIcon = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={data.name}
          style={{ 
            width: "200px", 
            height: "200px", 
            objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))"
          }}
        />
      ) : (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {data.name}
        </div>
      )}
    </div>
  );

  // Pokemon Content Component
  const PokemonContent = () => (
    <div style={{ padding: "20px" }}>
      {/* Pokemon Name */}
      <h1 style={{ 
        fontSize: "32px", 
        fontWeight: "bold", 
        marginBottom: "16px", 
        textAlign: "center",
        color: "#374151",
        textTransform: "capitalize"
      }}>
        {data.name} #{data.id}
      </h1>
      
      {/* Type Badges */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        justifyContent: "center", 
        marginBottom: "16px" 
      }}>
        {data.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
      
      {/* Description */}
      {data.description && (
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5", 
          textAlign: "center", 
          marginBottom: "24px",
          color: "#6B7280"
        }}>
          {data.description}
        </p>
      )}
      
      {/* Navigation Tabs */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "16px", 
        marginBottom: "24px" 
      }}>
        <span style={{ color: bg, fontSize: "16px", fontWeight: "500" }}>
          Stats
        </span>
        <span style={{
          backgroundColor: bg,
          color: "white",
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "500",
        }}>
          Evolutions
        </span>
        <span style={{ color: bg, fontSize: "16px", fontWeight: "500" }}>
          MOVES
        </span>
      </div>

      {/* Stats Section */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ 
          fontSize: "20px", 
          fontWeight: "bold", 
          marginBottom: "12px",
          color: "#374151",
          textAlign: "center"
        }}>
          Stats
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
          gap: "8px" 
        }}>
          {data.stats.map((stat) => (
            <div key={stat.name} style={{
              backgroundColor: "#F3F4F6",
              padding: "8px 12px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#6B7280", textTransform: "uppercase" }}>
                {stat.name}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#374151" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolutions Section */}
      {data.evolutions && data.evolutions.length > 1 && (
        <div>
          <h3 style={{ 
            fontSize: "20px", 
            fontWeight: "bold", 
            marginBottom: "12px",
            color: "#374151",
            textAlign: "center"
          }}>
            Evolution Chain
          </h3>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "16px",
            flexWrap: "wrap"
          }}>
            {data.evolutions.map((name, idx) => (
              <div key={name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: bg,
                    borderRadius: "50%",
                    margin: "0 auto 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "bold", color: "#374151", textTransform: "capitalize" }}>
                  {name}
                </div>
                {idx < (data.evolutions?.length ?? 0) - 1 && (
                  <div style={{ 
                    color: bg, 
                    fontSize: "20px", 
                    margin: "0 8px",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <PokedexCard
      icon={<PokemonIcon />}
      backgroundColor={bg}
      onBackClick={handleBackClick}
    >
      <PokemonContent />
    </PokedexCard>
  );
}
