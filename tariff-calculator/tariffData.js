document.addEventListener("DOMContentLoaded", () => {

const tariffData = {
  electronics: {
    avgTariff: "Moderate – 10% baseline, 20% on China",
    tariffRange: "0% (chips) → 20% (Chinese electronics)",
    priceImpact: "~10–25% increase. $1,200 phone → $1,500",
    retaliation: "China: restricted rare earth exports",
    retaliationImpactOnUSExports: "High-tech components, chip inputs",
    notes: "Phones & chips often exempt. India/Taiwan largely spared.",
    usmcaExempt: false,
    preTariffRate: {
      china: 0.10,
      vietnam: 0.00,
      other: 0.00
    },
    consumerExample: "Smartphone could rise from $1,200 to ~$1,500",
    sourceCountriesMostAffected: ["China"],
    importShareUSMarket: {
      china: 0.35,
      vietnam: 0.10,
      mexico: 0.08,
      canada: 0.06,
      eu: 0.12
    },
    categoryType: "consumer_goods",
    ratesByCountry: {
      china: 0.20,
      vietnam: 0.10,
      mexico: 0.10,
      canada: 0.10,
      eu: 0.10,
      other: 0.10
    }
  },
  apparel: {
    avgTariff: "Very High – Up to 145% on China",
    tariffRange: "15% (pre-2025) → 40–145% (2025)",
    priceImpact: "Sneakers +47%, Chinese shoes +58%",
    retaliation: "China’s 125% retaliation hurt U.S. cotton exports",
    retaliationImpactOnUSExports: "U.S. cotton farmers, textile materials",
    notes: "USMCA-compliant goods from Canada/Mexico = 0%",
    usmcaExempt: true,
    preTariffRate: {
      china: 0.15,
      vietnam: 0.15,
      other: 0.15
    },
    consumerExample: "Vietnam-made sneakers ($150) → $220; Chinese shoes ($26) → ~$41",
    sourceCountriesMostAffected: ["China", "Vietnam", "Bangladesh", "Cambodia"],
    importShareUSMarket: {
      china: 0.36,
      vietnam: 0.19,
      bangladesh: 0.07,
      cambodia: 0.05
    },
    categoryType: "consumer_goods",
    ratesByCountry: {
      china: 1.45,
      vietnam: 0.46,
      bangladesh: 0.37,
      cambodia: 0.49,
      mexico: 0.25,
      canada: 0.25,
      eu: 0.25,
      other: 0.50
    }
},

food: {
  avgTariff: "High – 10–25%, 145% on China",
  tariffRange: "0–10% (pre-2025) → 10–145% (2025)",
  priceImpact: "Fresh produce +25%, grocery inflation 5–15%",
  retaliation: "China: 125% on U.S. agriculture, Canada/Mexico: 25%",
  retaliationImpactOnUSExports: "U.S. soy, pork, seafood, citrus",
  notes: "USMCA goods temporarily exempt; dairy, sugar had prior tariffs.",
  usmcaExempt: true,
  preTariffRate: {
    china: 0.10,
    mexico: 0.00,
    canada: 0.00,
    eu: 0.10,
    other: 0.10
  },
  consumerExample: "Imported avocados +25%; overall grocery bill +5–10%",
  sourceCountriesMostAffected: ["Mexico", "Canada", "China", "EU"],
  importShareUSMarket: {
    mexico: 0.38,
    canada: 0.16,
    china: 0.05,
    eu: 0.12
  },
  categoryType: "essential_goods",
  ratesByCountry: {
    china: 1.45,
    mexico: 0.25,
    canada: 0.25,
    eu: 0.15,
    other: 0.10
  }
},
      automobiles: {
        avgTariff: "Very High – 25% uniformly",
        tariffRange: "2.5% (pre-2025) → 25% (2025)",
        priceImpact: "$4,700 average new car increase",
        retaliation: "EU, China, Canada retaliated with car duties",
        retaliationImpactOnUSExports: "U.S. auto exports, components",
        notes: "USMCA exemptions ended April 2025. All countries now 25%",
        usmcaExempt: false,
        preTariffRate: {
            china: 0.025,
            mexico: 0.00,
            canada: 0.00,
            eu: 0.025,
            other: 0.025
        },
        consumerExample: "Imported vehicles +$8,000–$10,000",
        sourceCountriesMostAffected: ["Germany", "Japan", "Mexico"],
        importShareUSMarket: {
            mexico: 0.26,
            japan: 0.24,
            canada: 0.15,
            germany: 0.11,
            korea: 0.07
        },
        categoryType: "durable_goods",
        ratesByCountry: {
            china: 0.25,
            mexico: 0.25,
            canada: 0.25,
            eu: 0.25,
            other: 0.25
        }
    },
    furniture: {
        avgTariff: "High – 30–50%, 145% on China",
        tariffRange: "5% (pre-2025) → 30–145%",
        priceImpact: "~8–18% increase; $2,000 mattress → $2,190",
        retaliation: "Minimal direct retaliation. Higher input costs.",
        retaliationImpactOnUSExports: "None direct; affected global trade flow",
        notes: "Asia hit hardest. USMCA conditional.",
        usmcaExempt: true,
        preTariffRate: {
            china: 0.25,
            vietnam: 0.05,
            other: 0.05
        },
        consumerExample: "$1,500 sofa → up to $1,640",
        sourceCountriesMostAffected: ["China", "Vietnam", "Indonesia", "Thailand"],
        importShareUSMarket: {
            china: 0.36,
            vietnam: 0.18,
            canada: 0.11,
            mexico: 0.08
        },
        categoryType: "consumer_goods",
        ratesByCountry: {
            china: 1.45,
            vietnam: 0.46,
            indonesia: 0.32,
            thailand: 0.36,
            mexico: 0.25,
            canada: 0.25,
            eu: 0.25,
            other: 0.40
        }
    },
    plastics: {
        avgTariff: "Moderate–High – 10% base + country add-ons",
        tariffRange: "0–10% (pre-2025) → 10–145%",
        priceImpact: "Household plastic goods +8–18%",
        retaliation: "China: 125% counter-tariffs. Canada: 25% on packaging.",
        retaliationImpactOnUSExports: "U.S. plastic resins, chemical goods",
        notes: "Raw plastic resin mostly exempt.",
        usmcaExempt: true,
        preTariffRate: {
            china: 0.10,
            other: 0.10
        },
        consumerExample: "$10 plastic container → ~$12",
        sourceCountriesMostAffected: ["China", "Indonesia", "Thailand"],
        importShareUSMarket: {
            china: 0.29,
            canada: 0.18,
            mexico: 0.14,
            eu: 0.12
        },
        categoryType: "intermediate_goods",
        ratesByCountry: {
            china: 1.45,
            indonesia: 0.32,
            thailand: 0.36,
            vietnam: 0.36,
            mexico: 0.25,
            canada: 0.25,
            eu: 0.10,
            other: 0.25
        }
    },
    pharma: {
        avgTariff: "Low – Mostly Exempt",
        tariffRange: "0–2% (pre-2025) → 0% (2025)",
        priceImpact: "Minimal tariff-driven price change",
        retaliation: "No foreign retaliation on pharma",
        retaliationImpactOnUSExports: "None reported",
        notes: "Only ~16% of codes under review. No broad tariffs.",
        usmcaExempt: true,
        preTariffRate: {
            china: 0.00,
            india: 0.00,
            eu: 0.00
        },
        consumerExample: "No significant price increase",
        sourceCountriesMostAffected: ["None – broadly exempt"],
        importShareUSMarket: {
            india: 0.24,
            china: 0.18,
            eu: 0.40
        },
        categoryType: "medical",
        ratesByCountry: {
            china: 0.00,
            india: 0.00,
            mexico: 0.00,
            canada: 0.00,
            eu: 0.00,
            other: 0.00
        }
    },
    steel: {
        avgTariff: "High – 25% on all origins",
        tariffRange: "0–10% (pre-2025) → 25%",
        priceImpact: "Cars, cans, infrastructure cost more; +10–20%",
        retaliation: "EU, Canada, Mexico retaliated against U.S. metals",
        retaliationImpactOnUSExports: "Steel, agriculture, whiskey, motorcycles",
        notes: "Global application; no exemptions remain",
        usmcaExempt: false,
        preTariffRate: {
            other: 0.10
        },
        consumerExample: "New car price ↑ few hundred dollars",
        sourceCountriesMostAffected: ["Canada", "Brazil", "EU"],
        importShareUSMarket: {
            canada: 0.23,
            brazil: 0.13,
            eu: 0.15
        },
        categoryType: "industrial_goods",
        ratesByCountry: {
            china: 0.25,
            mexico: 0.25,
            canada: 0.25,
            eu: 0.25,
            other: 0.25
        }
    },
    toys: {
        avgTariff: "Very High – 145% on China",
        tariffRange: "0–7% (pre-2025) → 10–145%",
        priceImpact: "Board games +36–56%",
        retaliation: "No direct retaliation. U.S. exports few toys.",
        retaliationImpactOnUSExports: "Negligible – U.S. toy exports minimal",
        notes: "Chinese supply devastated. Duty-free now 10%+",
        usmcaExempt: true,
        preTariffRate: {
            china: 0.07,
            vietnam: 0.00,
            other: 0.00
        },
        consumerExample: "$25 board game → $39",
        sourceCountriesMostAffected: ["China", "Vietnam", "Indonesia"],
        importShareUSMarket: {
            china: 0.71,
            vietnam: 0.11,
            mexico: 0.06
        },
        categoryType: "consumer_goods",
        ratesByCountry: {
            china: 1.45,
            vietnam: 0.46,
            indonesia: 0.30,
            malaysia: 0.30,
            mexico: 0.25,
            canada: 0.10,
            eu: 0.10,
            other: 0.50
        }
    },
    semiconductors: {
        avgTariff: "Nil/Exempt – No new tariffs",
        tariffRange: "0% pre- and post-2025",
        priceImpact: "No increase. Chips tariff-free.",
        retaliation: "China restricted rare earths; no direct tariffs on chips",
        retaliationImpactOnUSExports: "Chip inputs, rare earth processing",
        notes: "Exempt to avoid tech disruption. ITA rules upheld.",
        usmcaExempt: true,
        preTariffRate: {
            china: 0.00,
            taiwan: 0.00,
            korea: 0.00
        },
        consumerExample: "No change in chip price; electronics may rise",
        sourceCountriesMostAffected: ["None – all exempt"],
        importShareUSMarket: {
            taiwan: 0.30,
            china: 0.11,
            japan: 0.15,
            korea: 0.17
        },
        categoryType: "tech_components",
        ratesByCountry: {
            china: 0.00,
            taiwan: 0.00,
            korea: 0.00,
            japan: 0.00,
            eu: 0.00,
            other: 0.00
    }
  }
};

document.getElementById("tariffForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const category = document.getElementById("productCategory").value;
  const country = document.getElementById("origin").value;
  const price = parseFloat(document.getElementById("price").value);

  const data = tariffData[category];
  let rate = 0;

  if (data && data.ratesByCountry) {
    rate =
      data.ratesByCountry[country] ??
      data.ratesByCountry["other"] ??
      0;
  }

  const extra = +(price * rate).toFixed(2);
  const total = +(price + extra).toFixed(2);
  const percent = +(rate * 100).toFixed(1);

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("d-none");
	resultDiv.setAttribute("tabindex", "-1");
resultDiv.focus();

  resultDiv.innerHTML = `
    <h4>Estimated Tariff Cost</h4>
    <p>Tariff Rate: <strong>${percent}%</strong></p>
    <p>Tariff Amount: <strong>$${extra}</strong></p>
    <p>Total Price w/ Tariff: <strong>$${total}</strong></p>
    <hr />
    <h5>Category: ${category[0].toUpperCase() + category.slice(1)}</h5>
    <p><strong>Average Tariff:</strong> ${data.avgTariff}</p>
    <p><strong>Tariff Range:</strong> ${data.tariffRange}</p>
    <p><strong>Price Impact:</strong> ${data.priceImpact}</p>
    <p><strong>Consumer Example:</strong> ${data.consumerExample}</p>
    <p><strong>Foreign Retaliation:</strong> ${data.retaliation}</p>
    <p><strong>Impact on U.S. Exports:</strong> ${data.retaliationImpactOnUSExports}</p>
    <p><strong>USMCA Exempt:</strong> ${data.usmcaExempt ? "Yes" : "No"}</p>
    <p><strong>Notes:</strong> ${data.notes}</p>
  `;


// Show the download button
document.getElementById("downloadResult").classList.remove("d-none");



const plainText = `
Trump 2025 Tariff Impact Calculation
====================================
Tariff Rate: ${percent}%
Tariff Amount: $${extra}
Total Price with Tariff: $${total}

Category: ${category[0].toUpperCase() + category.slice(1)}
Average Tariff: ${data.avgTariff}
Tariff Range: ${data.tariffRange}
Price Impact: ${data.priceImpact}
Consumer Example: ${data.consumerExample}
Foreign Retaliation: ${data.retaliation}
Impact on U.S. Exports: ${data.retaliationImpactOnUSExports}
USMCA Exempt: ${data.usmcaExempt ? "Yes" : "No"}
Notes: ${data.notes}
`.trim();

// Bind the download functionality
document.getElementById("downloadResult").addEventListener("click", () => {
  const BOM = "\uFEFF"; // UTF-8 Byte Order Mark

// Use UTF-8 BOM for correct encoding in Windows
const blob = new Blob([BOM + plainText], { type: 'text/plain;charset=utf-8' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = `tariff-impact-${category}.txt`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

});


});
});